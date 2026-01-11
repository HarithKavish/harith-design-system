# Harith Design System Repository Setup

## GitHub Pages Deployment Guide

This design system is hosted on GitHub Pages and automatically deployed on every push to `main`.

### URLs

| Asset | URL |
|-------|-----|
| **CSS (All)** | `https://harithkavish.github.io/harith-design-system/v1.0.0/` |
| **Tokens** | `https://harithkavish.github.io/harith-design-system/v1.0.0/tokens.css` |
| **Base** | `https://harithkavish.github.io/harith-design-system/v1.0.0/base.css` |
| **Components** | `https://harithkavish.github.io/harith-design-system/v1.0.0/components.css` |
| **Utilities** | `https://harithkavish.github.io/harith-design-system/v1.0.0/utils.css` |
| **Theme Toggle** | `https://harithkavish.github.io/harith-design-system/v1.0.0/theme-toggle.js` |
| **HarithShell** | `https://harithkavish.github.io/harith-design-system/v1.0.0/harith-shell.js` |
| **Widget Loader** | `https://harithkavish.github.io/harith-design-system/v1.0.0/widget-loader.js` |
| **Example** | `https://harithkavish.github.io/harith-design-system/examples/full-featured.html` |
| **Docs** | `https://harithkavish.github.io/harith-design-system/docs/USAGE.md` |

### Initial Setup (First Time)

1. **Create GitHub Repository**
   ```bash
   # Go to https://github.com/new
   # Create repo: harith-design-system
   # Choose public, NO README/LICENSE/gitignore (use ours)
   ```

2. **Add Remote and Push**
   ```bash
   cd c:/Dev/My-Website/design-system
   git remote add origin https://github.com/HarithKavish/harith-design-system.git
   git branch -M main
   git push -u origin main
   ```

3. **Enable GitHub Pages**
   - Go to: https://github.com/HarithKavish/harith-design-system/settings/pages
   - Source: Deploy from branch
   - Branch: `main`, folder: `/ (root)`
   - Click Save

4. **Wait for Workflow**
   - Go to: https://github.com/HarithKavish/harith-design-system/actions
   - Watch `Deploy Design System to GitHub Pages` complete
   - Should take < 1 minute

### Updating Design System

Any push to `main` automatically:
1. Triggers `.github/workflows/deploy.yml`
2. Uploads files as GitHub Pages artifact
3. Deploys to live URL in ~1 minute

### Workflow Details

- **Trigger**: Push to main, PR to main, manual dispatch
- **Permissions**: Writes to Pages environment
- **Concurrency**: Cancels previous runs (only latest deploys)
- **Output**: Displays deployed URL in workflow logs

### Verify Deployment

Check these URLs after first push:

```bash
# Test CSS loads
curl -s https://harithkavish.github.io/harith-design-system/v1.0.0/tokens.css | head -5

# Test JS loads
curl -s https://harithkavish.github.io/harith-design-system/v1.0.0/theme-toggle.js | head -5

# Test example page
curl -s https://harithkavish.github.io/harith-design-system/examples/full-featured.html | grep -o "<title>.*</title>"
```

### Troubleshooting

**Pages not showing up**
- Wait 2-3 minutes for initial deployment
- Check Actions tab for workflow errors
- Ensure Pages is enabled in Settings > Pages

**404 on CSS/JS**
- Confirm file paths match repo structure
- Check workflow artifact upload logs
- Verify main branch is default branch

**Workflow failing**
- Click on failed run in Actions tab
- Check job logs for error details
- Common: Permissions (already fixed in workflow)

### Update Design System URLs in Other Repos

Once deployed, update all repos to use:

```html
<!-- OLD (local file) -->
<link rel="stylesheet" href="style.css">

<!-- NEW (GitHub Pages) -->
<link rel="stylesheet" href="https://harithkavish.github.io/harith-design-system/v1.0.0/harith-theme.css">
<script src="https://harithkavish.github.io/harith-design-system/v1.0.0/harith-theme.js"></script>
```

See [USAGE.md](../docs/USAGE.md) for full integration examples.

---

**Status**: Ready for GitHub repo creation and Pages deployment
