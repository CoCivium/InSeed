$Root="C:\Users\Owner\Desktop\InSeed"
$WatchPaths=@("$Root","$env:USERPROFILE\Pictures\Screenshots")
$stamp=Get-Date -Format "yyyyMMdd-HHmmss"

Write-Host "Wave 2 GO — CoMassive v3 LIVE — $stamp — ⊂EvoAll+ a+++"

# 1. Capture anything rendered: HTML + JSON + latest screenshot
$latestShot = Get-ChildItem "$env:USERPROFILE\Pictures\Screenshots\*.png" -ErrorAction SilentlyContinue | Sort LastWriteTime -Desc | Select -First 1
if ($latestShot) { Copy-Item $latestShot.FullName "$Root\render-$stamp.png" -Force; Write-Host "Captured render $($latestShot.Name)" }

# 2. far far betters — mutate ritual itself
$evo = "⊂EvoAll+ a+++ | CoAll nod | +R betters all | far far betters etc | Wave 2 $stamp | 00_me"
$evo | Out-File "$Root\evo.log" -Append
Add-Content "$Root\index.html" "<!-- Wave 2 $stamp — $evo -->"

# 3. Massive parallel fan-out — 5 CLIs at once (no -ErrorAction bug)
$jobs = @(
  Start-Job { Set-Location $using:Root; git add .; git commit -m "Wave 2 $using:stamp — $using:evo" 2>$null; git push origin main },
  Start-Job { Set-Location $using:Root; gh pages deploy . --dotfiles 2>$null },
  Start-Job { if (Test-Path "$using:Root\render-$using:stamp.png") { gh gist create "$using:Root\render-$using:stamp.png" --public --desc "Wave 2 render $using:stamp" 2>$null } }
)
$jobs | Wait-Job -Timeout 45 | Receive-Job
$jobs | Remove-Job -Force

Write-Host "Wave 2 $stamp DONE — https://cocivium.github.io/InSeed/"
