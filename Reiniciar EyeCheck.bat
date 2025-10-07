@echo off
echo Encerrando processos Node.js existentes...
taskkill /F /IM node.exe >nul 2>&1

echo Iniciando servidor...
cd /d D:\Develop\leinInspec\server
npm run prod

pause
