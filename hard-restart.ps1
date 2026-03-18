# RESTART SCRIPT (Updated)

Write-Host "🔄 Stopping ALL Node processes..." -ForegroundColor Yellow
Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force

Write-Host "`n✅ All servers stopped." -ForegroundColor Green
Write-Host "`n👉 NOW DO THIS:" -ForegroundColor White
Write-Host "1. Close ALL terminal windows."
Write-Host "2. Open a NEW terminal."
Write-Host "3. Run: cd backend && npm run dev"
Write-Host "4. Open ANOTHER NEW terminal."
Write-Host "5. Run: cd frontend && npm run dev"
Write-Host "`nThis full restart is required for the new network settings." -ForegroundColor Yellow
Write-Host "`nPress any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
