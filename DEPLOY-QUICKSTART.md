# 🚀 Deploy to GitHub Pages - Quick Steps

## Create Repository on GitHub
1. Go to https://github.com/new
2. Name: `transcript-cleaner`
3. Don't initialize with README
4. Click "Create repository"

## Push Your Code
```bash
# Replace YOUR-USERNAME with your GitHub username
git remote add origin https://github.com/YOUR-USERNAME/transcript-cleaner.git
git branch -M main
git push -u origin main
```

## Enable GitHub Pages
1. Go to repo **Settings** → **Pages**
2. Under "Build and deployment"
3. **Source**: Select "GitHub Actions"
4. Done! 🎉

## Your Live URL
```
https://YOUR-USERNAME.github.io/transcript-cleaner/
```

---

**That's it!** The site will automatically deploy in 2-3 minutes.

See `DEPLOYMENT.md` for detailed instructions and troubleshooting.
