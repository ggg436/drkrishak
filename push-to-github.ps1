# GitHub Push PowerShell Script

Write-Host "===== GitHub Push Script =====" -ForegroundColor Cyan
Write-Host ""

# Configure Git if needed
Write-Host "Configuring Git..." -ForegroundColor Yellow
$username = Read-Host "Enter your GitHub username"
$email = Read-Host "Enter your GitHub email"

git config --global user.name $username
git config --global user.email $email

# Add all files
Write-Host "Adding all files to git..." -ForegroundColor Yellow
git add .

# Commit changes
Write-Host "Committing changes..." -ForegroundColor Yellow
git commit -m "Migrate from Supabase to Clerk and Neon PostgreSQL with mock implementations"

# Add remote if it doesn't exist
Write-Host "Checking remote repository..." -ForegroundColor Yellow
$remoteExists = git remote -v | Select-String -Pattern "origin"
if (-not $remoteExists) {
    Write-Host "Adding remote repository..." -ForegroundColor Yellow
    git remote add origin https://github.com/ggg436/earth-friendly-frontpage-now.git
}

# Push to GitHub
Write-Host ""
Write-Host "===== Pushing to GitHub =====" -ForegroundColor Cyan
Write-Host ""
Write-Host "When prompted, enter your GitHub personal access token as password." -ForegroundColor Yellow
Write-Host "If you don't have a personal access token, create one at:" -ForegroundColor Yellow
Write-Host "https://github.com/settings/tokens" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press any key to continue..." -ForegroundColor Green
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

# Try to push to main branch
$pushResult = git push -u origin main 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "Push successful!" -ForegroundColor Green
} else {
    Write-Host "Push to main failed, trying master branch..." -ForegroundColor Yellow
    $pushResult = git push -u origin master 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Push successful!" -ForegroundColor Green
    } else {
        Write-Host "Push failed. Please check your credentials and try again." -ForegroundColor Red
        Write-Host $pushResult -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown") 