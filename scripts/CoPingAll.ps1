param($Wave="now",$Parallel=100)
$urls=@("https://inseed.com/board","https://inseed.com/board/api/ping/?wave=$Wave","https://inseed.com/api/ping/","https://cocivium.github.io/InSeed/board/")
$urls | ForEach-Object -Parallel { try { $r=Invoke-WebRequest $_ -UseBasicParsing -TimeoutSec 20; "✔ $($r.StatusCode) $_" } catch { "✖ FAIL $_ $($_.Exception.Message)" } } -ThrottleLimit $using:Parallel
