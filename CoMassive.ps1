$Root = "C:\Users\Owner\Desktop\InSeed"
$files = @("index.html","CoVIA.json","CoPingables.json") | ForEach-Object { Join-Path $Root $_ } | Where-Object { Test-Path $_ }

Write-Host "CoMassive v2 LIVE — transferring rendered session in parallel — ⊂EvoAll+ a+++"

# far far betters: append lap tag
foreach ($f in $files) {
  Add-Content -Path $f -Value "`n<!-- far far betters lap $(Get-Date -Format yyyyMMdd-HHmm) — ⊂EvoAll+ a+++ | 00_me -->"
}

# massive parallel CLI fan-out — sequential jobs but parallel processes
Start-Job -Name gitPush -ScriptBlock { cd $using:Root; git add .; git commit -m "massive parallel +R far far betters — a+++ | 00_me" -ErrorAction SilentlyContinue; git push origin main } | Out-Null
Start-Job -Name ghGist -ScriptBlock { cd $using:Root; gh gist create CoVIA.json --public -d "CoVIA+ IA rels far far betters" -ErrorAction SilentlyContinue } | Out-Null

Get-Job | Wait-Job | Receive-Job
Get-Job | Remove-Job
Write-Host "DONE — all rendered transferred + far far betters — check https://cocivium.github.io/InSeed/"
