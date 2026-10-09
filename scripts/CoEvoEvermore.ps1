param($Wave="evermore")
while ($true) {
  $urls=@("https://inseed.com/board","https://inseed.com/board/api/ping/?wave=$Wave","https://inseed.com/api/ping/","https://inseed.com/board/api/mcp/","https://cocivium.github.io/InSeed/board/")
  $urls | ForEach-Object -Parallel {
    try { $r=iwr $_ -UseBasicParsing -TimeoutSec 15 -AllowInsecureRedirect; "✔ $(Get-Date -Format HH:mm:ss) $($r.StatusCode) $_" }
    catch { "✖ $(Get-Date -Format HH:mm:ss) FAIL $_ $($_.Exception.Message.Split("`n")[0])" }
  } -ThrottleLimit 5
  Start-Sleep 35
}
