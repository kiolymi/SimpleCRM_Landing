$ErrorActionPreference='Stop'
Add-Type -AssemblyName System.Drawing
$folder=Join-Path $PSScriptRoot 'simple-crm-landing-screens'
function Square-Surface($bmp,$x,$y,$w,$h,$patch=18){
  $scale=3; $px=[int]($x*$scale); $py=[int]($y*$scale); $pw=[int]($w*$scale); $ph=[int]($h*$scale); $p=[int]($patch*$scale)
  $sample=$bmp.GetPixel($px+[int]($pw/2),$py+[int]([Math]::Min($ph/2,18*$scale)))
  $brush=New-Object System.Drawing.SolidBrush($sample); $g=[System.Drawing.Graphics]::FromImage($bmp)
  $g.FillRectangle($brush,$px,$py,$p,$p); $g.FillRectangle($brush,$px+$pw-$p,$py,$p,$p)
  $g.FillRectangle($brush,$px,$py+$ph-$p,$p,$p); $g.FillRectangle($brush,$px+$pw-$p,$py+$ph-$p,$p,$p)
  $g.Dispose(); $brush.Dispose()
}
$surfaces=@{
 '20-task-board.png'=@(@(16,108,358,637,18),@(196,110,176,36,12),@(16,186,358,80,18),@(16,274,358,64,18),@(16,378,358,128,18),@(16,546,358,76,18));
 '21-task-list.png'=@(@(16,176,358,44,14),@(16,240,358,92,18),@(16,344,358,132,18));
 '22-task-inbox.png'=@(@(16,176,358,44,14),@(16,232,358,178,18),@(16,418,358,48,14));
 '23-task-detail.png'=@(@(16,119,358,128,10),@(16,296,358,196,10),@(16,751,358,52,10));
 '24-create-task.png'=@(@(16,139,358,62,18),@(136,253,106,42,14),@(16,305,124,42,14),@(128,305,119,42,14),@(16,313,358,52,14),@(16,477,358,96,18),@(16,755,358,52,14))
}
foreach($name in $surfaces.Keys){
 $path=Join-Path $folder $name; $bmp=[System.Drawing.Bitmap]::FromFile($path)
 foreach($s in $surfaces[$name]){Square-Surface $bmp $s[0] $s[1] $s[2] $s[3] $s[4]}
 $radius=120; $clear=[System.Drawing.Color]::FromArgb(0,255,255,255)
 for($x=0;$x -lt $radius;$x++){for($y=0;$y -lt $radius;$y++){if((($radius-$x)*($radius-$x)+($radius-$y)*($radius-$y)) -gt ($radius*$radius)){$bmp.SetPixel($x,$y,$clear);$bmp.SetPixel($bmp.Width-1-$x,$y,$clear);$bmp.SetPixel($x,$bmp.Height-1-$y,$clear);$bmp.SetPixel($bmp.Width-1-$x,$bmp.Height-1-$y,$clear)}}}
 $tmp=$path+'.tmp.png';$bmp.Save($tmp,[System.Drawing.Imaging.ImageFormat]::Png);$bmp.Dispose();Move-Item -Force $tmp $path
}
Get-ChildItem $folder -Filter '2*-task-*.png' | Select-Object Name,Length | ConvertTo-Json -Compress
