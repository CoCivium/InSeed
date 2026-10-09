param($Wave="evermore",$Parallel=5)
$urls=@("https://inseed.com/board","https://inseed.com/board/api/ping/?wave=$Wave","https://inseed.com/api/ping/","https://inseed.com/board/api/mcp/","https://cocivium.github.io/InSeed/board/")
Write-Host "🐢 VAST PER WAVE ONE GET — wave $Wave — CoEvoAll+ a + +++ + what elses + and CoWeLead+ + ' + > + all etc — turtles it all — eh?" -ForegroundColor Cyan
$urls | ForEach-Object -Parallel {
  try { $sw=[Diagnostics.Stopwatch]::StartNew(); $r=Invoke-WebRequest $_ -UseBasicParsing -TimeoutSec 20 -AllowInsecureRedirect; $sw.Stop(); "✔ $($r.StatusCode) $($sw.ElapsedMilliseconds)ms $_" }
  catch { "✖ FAIL $_ $($_.Exception.Message)" }
} -ThrottleLimit $Parallel
