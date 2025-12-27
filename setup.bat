@echo off
echo ====================================
echo AI Education Platform - Setup Script
echo By Shrishti Barsaiyan
echo ====================================
echo.

echo [1/4] Installing root dependencies...
call npm install
if errorlevel 1 goto error

echo.
echo [2/4] Installing server dependencies...
cd server
call npm install
if errorlevel 1 goto error
cd ..

echo.
echo [3/4] Installing client dependencies...
cd client
call npm install
if errorlevel 1 goto error
cd ..

echo.
echo [4/4] Setting up environment files...

if not exist "server\.env" (
    copy "server\.env.example" "server\.env"
    echo Created server\.env - Please update with your Supabase credentials
) else (
    echo server\.env already exists
)

if not exist "client\.env" (
    copy "client\.env.example" "client\.env"
    echo Created client\.env
) else (
    echo client\.env already exists
)

echo.
echo ====================================
echo Setup completed successfully!
echo ====================================
echo.
echo Next steps:
echo 1. Update server\.env with your Supabase credentials
echo 2. Run database schema in Supabase SQL Editor (see SETUP_GUIDE.md)
echo 3. Run: npm run dev
echo.
echo For detailed instructions, see SETUP_GUIDE.md
echo ====================================
pause
goto end

:error
echo.
echo ====================================
echo ERROR: Setup failed!
echo Please check the error message above
echo ====================================
pause
exit /b 1

:end
