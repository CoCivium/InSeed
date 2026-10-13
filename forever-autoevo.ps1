while($true){
  git fetch origin | Out-Null
  git pull origin main --rebase | Out-Null
  Write-Host "$(Get-Date -Format HH:mm:ss) — ⊂EvoAll+ a+++ — $($($(git log --oneline -1))) — all pretty forever GO" -ForegroundColor Cyan
  Start-Sleep -Seconds 3600
}
