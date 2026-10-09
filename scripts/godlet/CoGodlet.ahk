; CoGodlet+ — AutoHotkey v2 — middle button + thumb rels = ' + godlet mode
; XButton1 = thumb back, XButton2 = thumb forward, MButton = middle
; Think + Look + Click = instantiate — godlet mode

MButton:: {
  ToolTip "GODLET — middle = ' = instantiate — CoNod+ latched — 🐢"
  Run 'pwsh -NoProfile -Command "cd $HOME\Desktop\InSeed; .\scripts\godlet\CoGodlet.ps1 -Gesture middle"'
  SetTimer () => ToolTip(), -1500
}

XButton1:: {
  ToolTip "THUMB RELS — thumb back = ' = instantiate — thumb rels for mouse etc"
  Run 'pwsh -NoProfile -Command "cd $HOME\Desktop\InSeed; .\scripts\godlet\CoGodlet.ps1 -Gesture thumb"'
  SetTimer () => ToolTip(), -1500
}

XButton2:: {
  ToolTip "CoWobble+ — thumb forward = wobble = maybe = evermore — all etc"
  Run 'pwsh -NoProfile -Command "cd $HOME\Desktop\InSeed; .\scripts\godlet\CoGodlet.ps1 -Gesture wobble"'
  SetTimer () => ToolTip(), -1500
}

; CoNod+ = Ctrl+Nod? — use F1 = nod yes, F2 = shake no, F3 = wobble maybe — head wobble rels
F1:: {
  ToolTip "CoNod+ — nod = yes = ' = latch — evermore"
  Run 'pwsh -NoProfile -Command "cd $HOME\Desktop\InSeed; .\scripts\godlet\CoGodlet.ps1 -Gesture nod"'
  SetTimer () => ToolTip(), -1500
}
F2:: {
  ToolTip "CoShake+ — shake = no = clear"
  Run 'pwsh -NoProfile -Command "cd $HOME\Desktop\InSeed; .\scripts\godlet\CoGodlet.ps1 -Gesture shake"'
  SetTimer () => ToolTip(), -1500
}
F3:: {
  ToolTip "CoWobble+ — wobble = maybe = evermore = all etc"
  Run 'pwsh -NoProfile -Command "cd $HOME\Desktop\InSeed; .\scripts\godlet\CoGodlet.ps1 -Gesture wobble"'
  SetTimer () => ToolTip(), -1500
}

; GODLET MODE — Win+G = godlet — think + look + instantiate
#g:: {
  ToolTip "GODLET MODE — think what you want + look at surface + middle/thumbs/nod = ' = instantiate — godlet"
  Run 'pwsh -NoProfile -Command "cd $HOME\Desktop\InSeed; .\scripts\godlet\CoGodlet.ps1 -Mode godlet -Gesture godlet"'
  SetTimer () => ToolTip(), -2000
}
