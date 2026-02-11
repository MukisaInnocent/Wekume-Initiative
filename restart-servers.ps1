# SERVER RESTART SCRIPT
# Use this if servers crash or stop responding

Write-Host "🔄 Stopping any running Node processes..." -ForegroundColor Yellow

# Kill existing node processes (if needed)
# Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force

Write-Host "`n📦 Installing/Updating dependencies..." -ForegroundColor Cyan

# Backend
Write-Host "`nBackend:" -ForegroundColor Green
Set-Location .\backend
if (!(Test-Path "node_modules")) {
    npm install
}

# Frontend  
Write-Host "`nFrontend:" -ForegroundColor Green
Set-Location ..\frontend
if (!(Test-Path "node_modules")) {
    npm install
}

Set-Location ..

Write-Host "`n✅ Ready to start servers!" -ForegroundColor Green
Write-Host "`nOpen TWO separate terminals and run:" -ForegroundColor Yellow
Write-Host "  Terminal 1: cd backend && npm run dev" -ForegroundColor White
Write-Host "  Terminal 2: cd frontend && npm run dev" -ForegroundColor White
Write-Host "`nBackend will run on: http://localhost:5000" -ForegroundColor Cyan
Write-Host "Frontend will run on: http://localhost:5175" -ForegroundColor Cyan
Write-Host "`nPress any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
