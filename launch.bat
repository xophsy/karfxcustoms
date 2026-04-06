@echo off
title KAR FX Customs — Dev Server
cd /d "%~dp0"
echo Starting KAR FX Customs...
echo.
start http://localhost:3000
npm run dev
pause
