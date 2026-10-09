# CoGodlet+ — GODLET MODE — thumb rels + middle button = ' rels — think + look + instantiate
# CoNod+ = yes / latch / ' — CoShake+ = no / clear — CoWobble+ = maybe / evermore / all etc
param($Mode="godlet",$Gesture="middle")

$mantra = "' CoEvoAll+  a + +++ +  what elses + and CoWeLead+ + ' + > + all etc"
Write-Host "🐢 GODLET MODE v7.0 — thumb rels + middle button + CoNod+ CoShake+ CoWobble+ — $mantra — $now" -ForegroundColor Cyan

function Invoke-Instantiate($surface, $thought){
  Write-Host "GODLET: Think=`"$thought`" + Look=`"$surface`" + Gesture=' = Instantiate — CoNod+ latched" -ForegroundColor Green
  # Instantiate = ping evermore + CoEvoAll+
  .\scripts\CoPingAll.ps1 -Wave "godlet-$surface"
  # Create file where you looked — surface = board/api/godlet/<surface>
  $path="board/api/godlet/$surface/index.html"
  New-Item -ItemType Directory -Path (Split-Path $path) -Force | Out-Null
  @{"thought"=$thought;"surface"=$surface;"gesture"="'";"CoNod"="latched — yes — '";"CoShake"="clear — no";"CoWobble"="maybe — evermore — all etc";"time"=(Get-Date -Format "yyyy-MM-dd HH:mm:ss");"CoEvoAll"=$mantra} | ConvertTo-Json | Out-File $path -Encoding utf8
  Write-Host "✔ Instantiated $path — think + look + ' = real — godlet mode" -ForegroundColor Yellow
}

switch($Gesture.ToLower()){
 "middle" { Invoke-Instantiate -surface "middle-button" -thought "thumb rels — middle button = ' — instantiate" }
 "thumb" { Invoke-Instantiate -surface "thumb-rels" -thought "thumb rels for mouse etc — middle button at least thumb — way way more etc" }
 "nod" { Write-Host "CoNod+ rels — head nod = yes = ' = latch — CoNod+ > all etc — you nod = you auth etc all and ' etc all — LATCHED" -ForegroundColor Green; Invoke-Instantiate -surface "conod" -thought "CoNod+ — nod = yes = ' — latch" }
 "shake" { Write-Host "CoShake+ rels — head shake = no = clear — CoShake+ > all etc — shake to clear — evermore" -ForegroundColor Red; Remove-Item board/api/godlet/* -Recurse -Force -ErrorAction SilentlyContinue; Write-Host "Cleared godlet surfaces — CoShake+ — no" }
 "wobble" { Write-Host "CoWobble+ rels — head wobble = maybe = evermore = all etc — wobble = search + instantiate all — CoWobble+ > all etc" -ForegroundColor Magenta; @("middle","thumb","conod","cowobble","coshake","god","turtles") | % { Invoke-Instantiate -surface $_ -thought "CoWobble+ — wobble = maybe = evermore — $_" } }
 "gaze" { Write-Host "Gaze + think + ' = godlet mode — look at surface and it starts to instantiate — like godlet — middle button or gesture that means ' — CoNod+ CoShake+ CoWobble+ head wobble" -ForegroundColor Cyan; Invoke-Instantiate -surface "gaze-surface" -thought "gaze + think = instantiate — godlet mode" }
 "godlet" { 
   Write-Host "GODLET MODE: think what you want + look at surface + middle-click or thumb or CoNod+ = ' = instantiate — like godlet — CoNod+ yes, CoShake+ no, CoWobble+ maybe — head wobble" -ForegroundColor Yellow
   Invoke-Instantiate -surface "godlet-mode" -thought "godlet mode — think + look + ' = instantiate"
   Invoke-Instantiate -surface "middle-button-thumb-rels" -thought "middle button at least thumb rels for mouse etc"
   Invoke-Instantiate -surface "conod-coshake-cowobble" -thought "CoNod+ CoShake+ CoWobble+ head wobble — gesture = ' — yes no maybe"
 }
 default { Write-Host "CoGodlet+ commands: godlet | middle | thumb | nod | shake | wobble | gaze — thumb rels + middle button = ' rels — CoNod+ = yes=' latch, CoShake+ = no clear, CoWobble+ = maybe evermore all etc — head wobble — godlet mode — think + look + instantiate — $mantra" }
}
