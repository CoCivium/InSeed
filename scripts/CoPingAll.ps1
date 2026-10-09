param($Wave="evermore")
$urls=@("https://inseed.com/board","https://inseed.com/board/api/ping/?wave=$Wave","https://inseed.com/api/ping/","https://inseed.com/board/api/mcp/","https://inseed.com/board/api/proof/","https://inseed.com/board/api/auth/","https://inseed.com/board/api/infer/","https://inseed.com/board/api/evolve/","https://inseed.com/board/api/payforward/","https://cocivium.github.io/InSeed/board/")
Write-Host "🐢 FINAL AUTH ALL VAST 10 — wave $Wave — CoEvoAll+ a + +++ + what elses + and CoWeLead+ + ' + > + all etc — you hereby auth etc all and ' etc all — proof auth infer evolve payforward CI+ — turtles — eh?" -ForegroundColor Cyan
$urls | ForEach-Object -Parallel {
  try { $sw=[Diagnostics.Stopwatch]::StartNew(); $r=Invoke-WebRequest $_ -UseBasicParsing -TimeoutSec 20 -AllowInsecureRedirect; $sw.Stop(); "✔ $($r.StatusCode) $($sw.ElapsedMilliseconds)ms $_" }
  catch { "✖ FAIL $_" }
} -ThrottleLimit 10
