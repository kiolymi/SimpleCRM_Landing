$ErrorActionPreference = 'Stop'
$folder = Join-Path $PSScriptRoot 'simple-crm-landing-screens'
New-Item -ItemType Directory -Force -Path $folder | Out-Null
Get-ChildItem -LiteralPath $folder -File | Remove-Item -Force
$assets = @(
  @('01-today-schedule.png','https://www.figma.com/api/mcp/asset/e9172feb-2dce-4ebb-abe8-d31216625c24.png'),
  @('02-today-list.png','https://www.figma.com/api/mcp/asset/d5fc5707-5583-42dd-ab5e-00edf060f93d.png'),
  @('03-meeting-soon.png','https://www.figma.com/api/mcp/asset/6b2c1b52-7c43-45f9-9c8f-5e0196d3ff54.png'),
  @('04-meeting-in-progress.png','https://www.figma.com/api/mcp/asset/81a95c1a-b1aa-471f-8139-109562fe6501.png'),
  @('05-schedule-conflict.png','https://www.figma.com/api/mcp/asset/55cef5d7-ad13-4cfa-9304-a58f50527d81.png'),
  @('06-day-completed.png','https://www.figma.com/api/mcp/asset/323ad1f3-7b83-4751-9ed4-34eae2d59b6b.png'),
  @('07-calendar-month.png','https://www.figma.com/api/mcp/asset/aa1c478b-a031-4a85-9235-c4eefd563c9f.png'),
  @('08-calendar-week.png','https://www.figma.com/api/mcp/asset/5a15e7bd-7d06-4751-9909-81a669162714.png'),
  @('09-calendar-list.png','https://www.figma.com/api/mcp/asset/d0791293-1a38-40ca-9d84-d9c3ab7f3a55.png'),
  @('10-calendar-filters.png','https://www.figma.com/api/mcp/asset/142b83bf-d26b-48b8-bb5c-c80e624677b6.png'),
  @('11-create-meeting.png','https://www.figma.com/api/mcp/asset/83e75c82-d40c-4075-aaab-71c62117fa1b.png'),
  @('12-meeting-detail.png','https://www.figma.com/api/mcp/asset/d819fb24-ce6c-4f8d-af83-12bea3f1a0e6.png'),
  @('13-clients-list.png','https://www.figma.com/api/mcp/asset/528ee903-e018-439a-8af4-edfb97cd32a3.png'),
  @('14-client-search.png','https://www.figma.com/api/mcp/asset/ee6b747f-a985-470b-aa77-a3ce6375650f.png'),
  @('15-client-overview.png','https://www.figma.com/api/mcp/asset/e179134b-3e22-4b33-95ec-c67a26c17cec.png'),
  @('16-client-activity.png','https://www.figma.com/api/mcp/asset/8dccfb85-23ff-49e1-9211-fa9007d5ae64.png'),
  @('17-client-contacts.png','https://www.figma.com/api/mcp/asset/672e541a-2195-46cd-9b46-4140aa16c60d.png'),
  @('18-messages-inbox.png','https://www.figma.com/api/mcp/asset/3e3e2aa0-1d03-47f9-8d26-23029bb41db5.png'),
  @('19-client-conversation.png','https://www.figma.com/api/mcp/asset/e7daa8e0-aed3-4abd-b115-78e9a0661305.png'),
  @('20-task-board.png','https://www.figma.com/api/mcp/asset/f9881010-44ba-4f84-9d87-fcd0a4024e0e.png'),
  @('21-task-list.png','https://www.figma.com/api/mcp/asset/a78faead-d7d6-4677-a624-dc7bbf5d991d.png'),
  @('22-task-inbox.png','https://www.figma.com/api/mcp/asset/b1aaeac5-3a0b-4042-801e-ae87fd58cbd9.png'),
  @('23-task-detail.png','https://www.figma.com/api/mcp/asset/9183f05a-7c94-46ba-946f-8380bfd91377.png'),
  @('24-create-task.png','https://www.figma.com/api/mcp/asset/457d04a3-39ef-440c-b800-12d34a0037ce.png'),
  @('25-payments.png','https://www.figma.com/api/mcp/asset/8689d885-2a30-4eed-84a6-fddb56e2205e.png')
)
foreach ($asset in $assets) { Invoke-WebRequest -Uri $asset[1] -OutFile (Join-Path $folder $asset[0]) }
Add-Type -AssemblyName System.Drawing
foreach ($file in Get-ChildItem -LiteralPath $folder -Filter '*.png') {
  $src = [System.Drawing.Bitmap]::FromFile($file.FullName)
  $dst = New-Object System.Drawing.Bitmap($src.Width,$src.Height,[System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $g = [System.Drawing.Graphics]::FromImage($dst)
  $g.DrawImage($src,(New-Object System.Drawing.Rectangle(0,0,$src.Width,$src.Height)),0,0,$src.Width,$src.Height,[System.Drawing.GraphicsUnit]::Pixel)
  $g.Dispose(); $src.Dispose()
  $radius = 120
  for($x=0;$x -lt $radius;$x++){ for($y=0;$y -lt $radius;$y++){
    if((($radius-$x)*($radius-$x)+($radius-$y)*($radius-$y)) -gt ($radius*$radius)){
      $clear=[System.Drawing.Color]::FromArgb(0,255,255,255)
      $dst.SetPixel($x,$y,$clear); $dst.SetPixel($dst.Width-1-$x,$y,$clear)
      $dst.SetPixel($x,$dst.Height-1-$y,$clear); $dst.SetPixel($dst.Width-1-$x,$dst.Height-1-$y,$clear)
    }
  }}
  $tmp=$file.FullName+'.tmp.png'; $dst.Save($tmp,[System.Drawing.Imaging.ImageFormat]::Png); $dst.Dispose(); Move-Item -Force $tmp $file.FullName
}
$result = Get-ChildItem -LiteralPath $folder -Filter '*.png' | ForEach-Object {
  $img=[System.Drawing.Image]::FromFile($_.FullName); $row=[pscustomobject]@{Name=$_.Name;Width=$img.Width;Height=$img.Height}; $img.Dispose(); $row
}
$result | ConvertTo-Json -Compress
