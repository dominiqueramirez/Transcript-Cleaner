# Easy Deploy Script for PowerShell
# Run this script to deploy your changes to GitHub Pages

Write-Host "🚀 Transcript Cleaner - Easy Deploy" -ForegroundColor Cyan
Write-Host "==================================`n" -ForegroundColor Cyan

# Check if there are changes
$status = git status --porcelain
if ($status) {
    Write-Host "📝 Changes detected. Committing..." -ForegroundColor Yellow
    
    # Add all changes
    git add .
    
    # Prompt for commit message
    $message = Read-Host "Enter commit message (or press Enter for default)"
    if ([string]::IsNullOrWhiteSpace($message)) {
        $message = "Update transcript cleaner - $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
    }
    
    # Commit
    git commit -m $message
    Write-Host "✅ Changes committed`n" -ForegroundColor Green
} else {
    Write-Host "✅ No changes to commit`n" -ForegroundColor Green
}

# Push to GitHub
Write-Host "📤 Pushing to GitHub..." -ForegroundColor Yellow
git push

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ Successfully deployed!" -ForegroundColor Green
    Write-Host "`n🌐 Your site will be live in 2-3 minutes at:" -ForegroundColor Cyan
    
    # Try to get the remote URL
    $remote = git config --get remote.origin.url
    if ($remote -match "github.com[:/](.+)/(.+?)(.git)?$") {
        $username = $matches[1]
        $repo = $matches[2]
        Write-Host "   https://$username.github.io/$repo/" -ForegroundColor White
    }
    
    Write-Host "`n💡 Tip: Run this script anytime you want to deploy updates!" -ForegroundColor Cyan
} else {
    Write-Host "`n❌ Push failed. See error above." -ForegroundColor Red
    Write-Host "💡 You may need to set up GitHub authentication." -ForegroundColor Yellow
}

Write-Host "`nPress any key to continue..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
