@echo off
title Nexora
start "" cmd /c "ping -n 3 127.0.0.1 >nul && start http://127.0.0.1:8787/"
node server.js
pause
