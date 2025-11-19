# GitHub Pages Deployment Guide

## ✅ Setup Complete!

Your Transcript Cleaner app is ready to deploy to GitHub Pages. Follow these steps:

---

## Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com/new)
2. Create a new repository:
   - **Repository name**: `transcript-cleaner`
   - **Description**: "Adobe Premiere transcript cleaner for VA terminology"
   - **Visibility**: Choose Public or Private
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)

---

## Step 2: Push Your Code

Run these commands in your terminal:

```bash
# Add the GitHub remote (replace YOUR-USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR-USERNAME/transcript-cleaner.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

**Example:**
```bash
git remote add origin https://github.com/vacoramird/transcript-cleaner.git
git branch -M main
git push -u origin main
```

---

## Step 3: Enable GitHub Pages

### Option A: Automatic Deployment (Recommended)

1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (left sidebar)
3. Under **Build and deployment**:
   - **Source**: Select "GitHub Actions"
4. The workflow will automatically run and deploy your site!

### Option B: Manual Deployment with gh-pages

Alternatively, deploy manually:

```bash
npm run deploy
```

Then configure Pages:
1. Go to **Settings** → **Pages**
2. **Source**: Select "Deploy from a branch"
3. **Branch**: Select `gh-pages` and `/ (root)`
4. Click **Save**

---

## Step 4: Access Your Site

After deployment (2-3 minutes), your app will be available at:

```
https://YOUR-USERNAME.github.io/transcript-cleaner/
```

**Example:**
```
https://vacoramird.github.io/transcript-cleaner/
```

---

## 🔄 Updating Your Site

### Automatic Updates
Any push to the `main` branch will automatically rebuild and deploy:

```bash
# Make your changes, then:
git add .
git commit -m "Update description"
git push
```

### Manual Updates
```bash
npm run deploy
```

---

## ⚙️ Configuration Already Done

✅ **Vite Config**: Base path set to `/transcript-cleaner/`
✅ **GitHub Actions**: Workflow file created at `.github/workflows/deploy.yml`
✅ **Build Scripts**: Deploy script added to `package.json`
✅ **Dependencies**: gh-pages installed

---

## 🎯 Quick Commands Reference

```bash
# Build locally
npm run build

# Preview build
npm run preview

# Deploy manually
npm run deploy

# Check git status
git status

# View remote URL
git remote -v
```

---

## 🐛 Troubleshooting

### Build Fails
Check that all dependencies are installed:
```bash
npm install
npm run build
```

### 404 Error on GitHub Pages
- Verify the base path in `vite.config.js` matches your repo name
- Check GitHub Pages settings (Settings → Pages)
- Wait 2-3 minutes for DNS propagation

### Authentication Issues
Use a Personal Access Token instead of password:
1. GitHub → Settings → Developer settings → Personal access tokens
2. Generate new token (classic) with `repo` scope
3. Use token as password when pushing

### Workflow Not Running
- Check **Actions** tab in GitHub
- Verify the workflow file exists at `.github/workflows/deploy.yml`
- Ensure GitHub Actions are enabled (Settings → Actions)

---

## 📋 Current Configuration

**Repository Name**: `transcript-cleaner`
**Base URL**: `/transcript-cleaner/`
**Build Output**: `dist/`
**Branch**: `main`
**Deployment Method**: GitHub Actions (automatic)

---

## 🚀 You're All Set!

1. Create the GitHub repository
2. Run the git commands above
3. Enable GitHub Pages in Settings
4. Visit your live site!

**Questions?** Check the GitHub Actions tab for deployment status.

---

**Department of Veterans Affairs**  
Transcript Cleaner - Deployed on GitHub Pages
