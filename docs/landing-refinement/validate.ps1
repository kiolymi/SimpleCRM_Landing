param(
    [string]$PackageRoot = $PSScriptRoot
)

$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest
$planRoot = [System.IO.Path]::GetFullPath($PackageRoot).TrimEnd([char[]]'\/')
$planPrefix = $planRoot + [System.IO.Path]::DirectorySeparatorChar
$problems = [System.Collections.Generic.List[string]]::new()

function Get-PlanPath([string]$RelativePath) {
    if ([System.IO.Path]::IsPathRooted($RelativePath)) {
        throw "Expected a relative package path: $RelativePath"
    }
    $resolvedPlanPath = [System.IO.Path]::GetFullPath((Join-Path $planRoot $RelativePath))
    if (-not $resolvedPlanPath.StartsWith($planPrefix, [System.StringComparison]::OrdinalIgnoreCase)) {
        throw "Path escapes package directory: $RelativePath"
    }
    return $resolvedPlanPath
}

function Assert-Plan([bool]$Condition, [string]$Message) {
    if (-not $Condition) { $problems.Add($Message) }
}

$manifest = Get-Content -LiteralPath (Get-PlanPath 'manifest.json') -Raw -Encoding UTF8 | ConvertFrom-Json
$state = Get-Content -LiteralPath (Get-PlanPath 'STATE.json') -Raw -Encoding UTF8 | ConvertFrom-Json
$requiredFiles = @('README.md', 'GOAL.md', 'COMMON.md', 'CONTEXT.md', 'ACCEPTANCE.md', 'DECISIONS.md', 'ISSUES.md', 'RUN_LOG.md', 'templates/stage-report.md')
foreach ($relativePlanFile in $requiredFiles) {
    Assert-Plan (Test-Path -LiteralPath (Get-PlanPath $relativePlanFile) -PathType Leaf) "Missing control file: $relativePlanFile"
}
Assert-Plan ($manifest.schema_version -eq 1 -and $state.schema_version -eq 1) 'Unsupported schema version.'
Assert-Plan ($manifest.mode -eq 'sequential') 'Only sequential execution is supported.'
Assert-Plan ($manifest.target_branch -eq $state.target_branch) 'Branch mismatch between manifest and state.'
Assert-Plan ($manifest.base_commit -eq $state.base_commit) 'Base commit mismatch.'
Assert-Plan (-not $manifest.publication_allowed -and -not $state.publication_allowed) 'Publication must remain separately authorized.'
Assert-Plan (@($manifest.stages).Count -eq 15) 'Expected exactly 15 stages.'
Assert-Plan (@($state.stages).Count -eq @($manifest.stages).Count) 'State stage count mismatch.'
Assert-Plan (@($state.stages | Where-Object status -eq 'active').Count -le 1) 'More than one active stage.'
Assert-Plan (@($state.stages.id | Sort-Object -Unique).Count -eq @($state.stages).Count) 'Duplicate state stage ID.'

$knownOutputs = @{}
$knownIds = @{}
$allowedStatuses = @('pending', 'active', 'passed', 'failed', 'needs_input')
for ($stageIndex = 0; $stageIndex -lt @($manifest.stages).Count; $stageIndex++) {
    $stage = $manifest.stages[$stageIndex]
    $expectedId = '{0:D2}' -f ($stageIndex + 1)
    Assert-Plan ($stage.id -eq $expectedId) "Non-sequential stage ID: $($stage.id)"
    Assert-Plan (-not $knownIds.ContainsKey($stage.id)) "Duplicate manifest ID: $($stage.id)"
    $knownIds[$stage.id] = $true
    $promptPath = Get-PlanPath $stage.prompt
    Assert-Plan (Test-Path -LiteralPath $promptPath -PathType Leaf) "Missing prompt: $($stage.prompt)"
    $promptText = if (Test-Path -LiteralPath $promptPath) { Get-Content -LiteralPath $promptPath -Raw -Encoding UTF8 } else { '' }
    if ($stageIndex -eq 0) {
        Assert-Plan (@($stage.depends_on).Count -eq 0) 'First stage must not have a dependency.'
    } else {
        Assert-Plan (@($stage.depends_on).Count -eq 1 -and $stage.depends_on[0] -eq $manifest.stages[$stageIndex - 1].id) "Invalid predecessor: $($stage.id)"
    }
    foreach ($stageInput in $stage.inputs) {
        $inputPath = Get-PlanPath $stageInput
        if ($stageInput.StartsWith('outputs/')) {
            Assert-Plan ($knownOutputs.ContainsKey($stageInput)) "Input has no earlier producer: $stageInput"
        } else {
            Assert-Plan (Test-Path -LiteralPath $inputPath -PathType Leaf) "Missing input: $stageInput"
        }
    }
    foreach ($stageOutput in $stage.outputs) {
        $null = Get-PlanPath $stageOutput
        Assert-Plan (-not $knownOutputs.ContainsKey($stageOutput)) "Duplicate output: $stageOutput"
        Assert-Plan ($promptText.Contains($stageOutput)) "Prompt omits expected output: $stageOutput"
        $knownOutputs[$stageOutput] = $stage.id
    }
    $matchingState = @($state.stages | Where-Object id -eq $stage.id)
    Assert-Plan ($matchingState.Count -eq 1) "Missing or duplicate state: $($stage.id)"
    if ($matchingState.Count -ne 1) { continue }
    $currentState = $matchingState[0]
    Assert-Plan ($allowedStatuses -contains $currentState.status) "Invalid status for $($stage.id)"
    Assert-Plan ($currentState.iterations -ge 0) "Negative iteration count: $($stage.id)"
    if ($currentState.status -eq 'active') {
        Assert-Plan ($state.current_stage -eq $stage.id) 'current_stage does not match active stage.'
    }
    if ($currentState.status -in @('active', 'passed')) {
        foreach ($dependency in $stage.depends_on) {
            $priorState = @($state.stages | Where-Object id -eq $dependency)
            Assert-Plan ($priorState.Count -eq 1 -and $priorState[0].status -eq 'passed') "Dependency not passed: $($stage.id) <- $dependency"
        }
    }
    if ($currentState.status -eq 'passed') {
        foreach ($stageOutput in $stage.outputs) {
            Assert-Plan (Test-Path -LiteralPath (Get-PlanPath $stageOutput) -PathType Leaf) "Passed stage is missing output: $stageOutput"
        }
        Assert-Plan (@($currentState.reports).Count -gt 0) "Passed stage has no report: $($stage.id)"
        Assert-Plan (@($currentState.evidence).Count -gt 0) "Passed stage has no evidence reference: $($stage.id)"
    }
    foreach ($reference in @($currentState.reports) + @($currentState.evidence)) {
        Assert-Plan (Test-Path -LiteralPath (Get-PlanPath $reference) -PathType Leaf) "Missing state evidence/report: $reference"
    }
}
Assert-Plan ($knownIds.ContainsKey($state.current_stage)) 'current_stage is unknown.'
if ($state.package_status -eq 'complete') {
    Assert-Plan (@($state.stages | Where-Object status -ne 'passed').Count -eq 0) 'Complete package contains unfinished stages.'
}

foreach ($markdownFile in Get-ChildItem -LiteralPath $planRoot -Recurse -Filter '*.md' -File) {
    $markdownText = Get-Content -LiteralPath $markdownFile.FullName -Raw -Encoding UTF8
    foreach ($linkMatch in [regex]::Matches($markdownText, '\]\(([^)]+)\)')) {
        $linkPath = $linkMatch.Groups[1].Value
        if ($linkPath -match '^(https?://|#)') { continue }
        $linkPath = ($linkPath -split '#')[0]
        $resolvedLink = [System.IO.Path]::GetFullPath((Join-Path $markdownFile.DirectoryName $linkPath))
        Assert-Plan (Test-Path -LiteralPath $resolvedLink) "Broken Markdown link in $($markdownFile.Name): $linkPath"
    }
}

if ($problems.Count -gt 0) {
    $problems | ForEach-Object { Write-Output "FAIL: $_" }
    throw "Prompt package validation failed: $($problems.Count) problem(s)."
}
Write-Output "PASS: 15 sequential stages, state, dependencies, outputs, control files and links are structurally valid."
Write-Output "Package status: $($state.package_status). Website quality and goal completion are NOT established by this check."
