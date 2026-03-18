@echo off
echo ======================================
echo    Wekume Initiative - Local Server
echo ======================================
echo.

set PATH=C:\nodejs\node-v20.12.0-win-x64;%PATH%

echo [1/2] Starting Backend Server...
start "Wekume Backend" cmd /k "set PATH=C:\nodejs\node-v20.12.0-win-x64;%%PATH%% && cd /d %~dp0backend && npm start"

echo [2/2] Starting Frontend Server...
timeout /t 3 /nobreak > nul
start "Wekume Frontend" cmd /k "set PATH=C:\nodejs\node-v20.12.0-win-x64;%%PATH%% && cd /d %~dp0frontend && npm run dev"

echo.
echo Both servers are starting in separate windows!
echo.
echo   Frontend: http://localhost:5200
echo   Backend:  http://localhost:5050
echo.
echo To access from other devices on your network, use your IP address instead of localhost.
echo.
pause
