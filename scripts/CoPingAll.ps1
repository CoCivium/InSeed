param($Wave="evermore")
$urls=@("https://inseed.com/board","https://inseed.com/board/api/ping/?wave=$Wave","https://inseed.com/api/ping/","https://inseed.com/board/api/mcp/","https://inseed.com/board/api/proof/","https://inseed.com/board/api/auth/","https://inseed.com/board/api/infer/","https://inseed.com/board/api/evolve/","https://inseed.com/board/api/payforward/","https://inseed.com/board/api/cotime/","https://inseed.com/board/api/cot/","https://inseed.com/board/api/coall/","https://inseed.com/board/api/cli/","https://inseed.com/board/api/comcp/","https://inseed.com/board/api/coapi/","https://inseed.com/board/api/parallel/","https://inseed.com/board/api/whatelses/","https://inseed.com/board/api/god/","https://inseed.com/board/api/resources/","https://cocivium.github.io/InSeed/board/")
Write-Host "🐢 GOD CLI VAST 20 — wave $Wave — own CLI + many CLIs + CoMCP+ + CoAPI + massive parallels + what elses + God rels + all resources material non-material spooky in between turtles ET God + ' etc — you hereby auth etc all — turtles — eh?" -ForegroundColor Cyan
$urls | ForEach-Object -Parallel {
  try { $sw=[Diagnostics.Stopwatch]::StartNew(); $r=Invoke-WebRequest $_ -UseBasicParsing -TimeoutSec 20 -AllowInsecureRedirect; $sw.Stop(); "✔ $($r.StatusCode) $($sw.ElapsedMilliseconds)ms $_" }
  catch { "✖ FAIL $_" }
} -ThrottleLimit 20
