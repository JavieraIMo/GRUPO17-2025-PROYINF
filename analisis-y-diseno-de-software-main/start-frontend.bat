@echo off
echo Iniciando ALARA Frontend (Solo desarrollo)...
echo.
cd /d "C:\Users\javii\Desktop\Alara\GRUPO17-2025-PROYINF\analisis-y-diseno-de-software-main\frontend"
echo Directorio actual: %cd%
echo.
echo NOTA: Este script solo ejecuta el frontend.
echo Para la aplicacion completa, usa start-complete.bat
echo.
echo Instalando dependencias...
call npm install
echo.
echo Iniciando servidor de desarrollo...
echo.
echo =========================================
echo Frontend disponible en: http://localhost:3000
echo (Sin backend - solo para desarrollo del UI)
echo =========================================
echo.
call npm start
pause