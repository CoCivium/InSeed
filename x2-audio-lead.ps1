# X2 USB EARBUD AUTO LEAD — ⊂EvoAll+ a+++ | +R betters all
Write-Host "=== X2 AUDIO LEAD — detecting USB earbud ===" -ForegroundColor Cyan

# 1. LIST USB AUDIO
Get-PnpDevice -Class Media,AudioEndpoint | Where-Object {$_.Status -eq "OK"} | Format-Table FriendlyName,InstanceId,Status

# 2. LIST USB PLUGGED
Get-PnpDevice -Class USB | Where-Object {$_.FriendlyName -like "*Audio*" -or $_.FriendlyName -like "*Headset*" -or $_.FriendlyName -like "*Earbud*"} | Format-Table

# 3. AUDIO ENDPOINTS — set new USB as default (requires AudioDeviceCmdlets if installed, fallback shows commands)
Write-Host "`n-- Audio Endpoints --" -ForegroundColor Yellow
$endpoints = Get-CimInstance Win32_SoundDevice
$endpoints | Format-Table Name,Status

# 4. If AudioDeviceCmdlets module present, auto-set
try {
  Install-Module -Name AudioDeviceCmdlets -Force -Scope CurrentUser -ErrorAction Stop
  Import-Module AudioDeviceCmdlets
  $all = Get-AudioDevice -List
  $all | Format-Table Index,Default,DefaultCommunication,Type,Name
  $usb = $all | Where-Object {$_.Type -like "*Playback*" -and $_.Name -like "*USB*"} | Select-Object -First 1
  if($usb){
    Set-AudioDevice -Index $usb.Index
    Write-Host "✓ USB EARBUD SET AS DEFAULT — $($usb.Name) Index $($usb.Index)" -ForegroundColor Green
  } else {
    Write-Host "! No USB playback found in list — check Sound settings" -ForegroundColor Red
  }
} catch {
  Write-Host "AudioDeviceCmdlets not yet — open Sound panel manual: mmsys.cpl" -ForegroundColor DarkYellow
  Start-Process "mmsys.cpl"
}

# 5. TEST TONE
[System.Media.SystemSounds]::Exclamation.Play()
Write-Host "`n✓ Test tone played — if you heard in new earbud, X2 lead GO" -ForegroundColor Green
Write-Host "X2 dual cockpit audio = routed" -ForegroundColor Cyan
