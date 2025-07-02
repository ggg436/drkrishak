@echo off
echo ===== GitHub Push Script =====
echo.

REM Configure Git if needed
git config --global user.name "Your GitHub Username"
git config --global user.email "your.email@example.com"

REM Add all files
echo Adding all files to git...
git add .

REM Commit changes
echo Committing changes...
git commit -m "Migrate from Supabase to Clerk and Neon PostgreSQL with mock implementations"

REM Add remote if it doesn't exist
echo Checking remote repository...
git remote -v | findstr origin
if %errorlevel% neq 0 (
    echo Adding remote repository...
    git remote add origin https://github.com/ggg436/earth-friendly-frontpage-now.git
)

REM Push to GitHub
echo.
echo ===== Pushing to GitHub =====
echo.
echo When prompted, enter your GitHub username and personal access token as password.
echo If you don't have a personal access token, create one at:
echo https://github.com/settings/tokens
echo.
echo Press any key to continue...
pause > nul

git push -u origin main

echo.
if %errorlevel% equ 0 (
    echo Push successful!
) else (
    echo Push failed. Please check your credentials and try again.
)

pause 