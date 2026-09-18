$ErrorActionPreference = 'Stop'
$exportRoot = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot 'exports'))
$records = @()
foreach ($source in (Get-ChildItem -LiteralPath $exportRoot -Filter '*.b64' -File)) {
    $target = [IO.Path]::GetFullPath([IO.Path]::ChangeExtension($source.FullName, '.png'))
    if (-not $target.StartsWith($exportRoot + [IO.Path]::DirectorySeparatorChar)) { throw 'Export boundary violation' }
    $bytes = [Convert]::FromBase64String([IO.File]::ReadAllText($source.FullName))
    if ($bytes.Length -lt 24 -or $bytes[0] -ne 137 -or $bytes[1] -ne 80 -or $bytes[2] -ne 78 -or $bytes[3] -ne 71) { throw 'Not a PNG' }
    if (Test-Path -LiteralPath $target) {
        $oldBytes = [IO.File]::ReadAllBytes($target)
        if ([Convert]::ToBase64String($oldBytes) -ne [Convert]::ToBase64String($bytes)) { throw "Refusing to overwrite different export: $target" }
    } else {
        [IO.File]::WriteAllBytes($target, $bytes)
    }
    $records += [pscustomobject]@{
        file = [IO.Path]::GetFileName($target)
        bytes = $bytes.Length
        width = [Net.IPAddress]::NetworkToHostOrder([BitConverter]::ToInt32($bytes, 16))
        height = [Net.IPAddress]::NetworkToHostOrder([BitConverter]::ToInt32($bytes, 20))
        sha256 = (Get-FileHash -LiteralPath $target -Algorithm SHA256).Hash
    }
}
$records | ConvertTo-Json -Depth 4
