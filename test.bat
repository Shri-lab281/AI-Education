@echo off
echo ====================================
echo AI Education Platform - Quick Test
echo ====================================
echo.

echo Testing Backend Health Check...
echo.
curl http://localhost:5000/api/health

echo.
echo ====================================
echo.
echo If you see a JSON response with "status": "healthy", your backend is working!
echo.
echo Next, open your browser and go to:
echo http://localhost:5173
echo.
echo ====================================
pause
