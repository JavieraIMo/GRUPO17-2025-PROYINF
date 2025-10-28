@echo off
echo Iniciando ALARA Simulador Completo con Docker...
echo.
cd /d "C:\Users\javii\Desktop\Alara\GRUPO17-2025-PROYINF\analisis-y-diseno-de-software-main"
echo.
echo =========================================
echo Frontend React: http://localhost:3101
echo Backend API: http://localhost:3100
echo Base de datos PostgreSQL: puerto 5433
echo =========================================
echo.
echo Construyendo e iniciando servicios...
docker-compose up --build
pause