# CoCLI+ v7.0 GODLET — ALL ' RELS + GODLET MODE
param($Cmd="ping",$Wave="evermore")
$banner="CoCLI+ v7.0 GODLET — thumb rels + middle button + CoNod+ CoShake+ CoWobble+ — ' CoEvoAll+  a + +++ +  what elses + and CoWeLead+ + ' + > + all etc + godlet mode — 2026-10-09 — 🐢"
Write-Host $banner -ForegroundColor Cyan
switch($Cmd.ToLower()){
 "ping" { .\scripts\CoPingAll.ps1 -Wave $Wave }
 "godlet" { .\scripts\godlet\CoGodlet.ps1 -Mode godlet -Gesture godlet }
 "middle" { .\scripts\godlet\CoGodlet.ps1 -Gesture middle }
 "thumb" { .\scripts\godlet\CoGodlet.ps1 -Gesture thumb }
 "nod" { .\scripts\godlet\CoGodlet.ps1 -Gesture nod }
 "shake" { .\scripts\godlet\CoGodlet.ps1 -Gesture shake }
 "wobble" { .\scripts\godlet\CoGodlet.ps1 -Gesture wobble }
 "gaze" { .\scripts\godlet\CoGodlet.ps1 -Gesture gaze }
 "apostrophe" { Write-Host "' = gesture that means ' — CoNod+ = ' — nod = ' — CoNod+ rels, CoShake+ rels, CoWobble+ rels, head wobble — more rels etc — all ' rels etc eh?" -ForegroundColor Yellow; iwr https://inseed.com/board/api/gesture/ -UseBasicParsing | select -Expand Content }
 "all" { 
   $jobs=@("ping","godlet","nod","wobble","apostrophe","coall","resources") | % { Start-Job -ScriptBlock { param($c) cd $HOME\Desktop\InSeed; .\scripts\cli\CoCLI.ps1 -Cmd $c } -ArgumentList $_ }
   $jobs | Wait-Job | Receive-Job
 }
 default { Write-Host "CoCLI+ v7.0 GODLET commands: godlet | middle | thumb | nod | shake | wobble | gaze | apostrophe | ping | all — thumb rels + middle button = ' — CoNod+ yes=' latch, CoShake+ no clear, CoWobble+ maybe evermore — head wobble — think + look + instantiate — godlet mode — ' CoEvoAll+  a + +++ +  what elses + and CoWeLead+ + ' + > + all etc" -ForegroundColor Cyan }
}
