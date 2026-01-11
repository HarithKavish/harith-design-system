# Usage Guide - Harith Design System

Complete integration guide for using the Harith Design System across projects.

## Table of Contents
1. [Installation](#installation)
2. [Basic Setup](#basic-setup)
3. [Dark Mode](#dark-mode)
4. [HarithShell Components](#harithshell-components)
5. [Custom Styling](#custom-styling)
6. [Migration from Legacy](#migration-from-legacy)

---

## Installation

### Option 1: CDN (Recommended)

Load the complete theme bundle:

```html
<link rel="stylesheet" href="https://harithkavish.github.io/design-system/v1.0.0/harith-theme.min.css">
<script src="https://harithkavish.github.io/design-system/v1.0.0/harith-theme.min.js"></script>
```

### Option 2: Modular Loading

Pick only what you need:

```html
<!-- Tokens (required) -->
<link rel="stylesheet" href="https://harithkavish.github.io/design-system/v1.0.0/tokens.css">

<!-- Base styles (recommended) -->
<link rel="stylesheet" href="https://harithkavish.github.io/design-system/v1.0.0/base.css">

<!-- Components (optional) -->
<link rel="stylesheet" href="https://harithkavish.github.io/design-system/v1.0.0/components.css">

<!-- Utilities (optional) -->
<link rel="stylesheet" href="https://harithkavish.github.io/design-system/v1.0.0/utils.css">

<!-- JavaScript (optional) -->
<script src="https://harithkavish.github.io/design-system/v1.0.0/theme-toggle.js"></script>
<script src="https://harithkavish.github.io/design-system/v1.0.0/harith-shell.js"></script>
<script src="https://harithkavish.github.io/design-system/v1.0.0/widget-loader.js"></script>
```

---

## Basic Setup

### Minimal Page

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Page</title>
    
    <!-- Design System CSS -->
    <link rel="stylesheet" href="https://harithkavish.github.io/design-system/v1.0.0/harith-theme.min.css">
    
    <!-- Dark mode initialization (optional but recommended) -->
    <script>
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark-mode');
        }
    </script>
</head>
<body>
    <main>
        <h1>Hello World</h1>
        <p>Welcome to my page.</p>
        <button class="portfolio-btn">Click Me</button>
    </main>
    
    <!-- Design System JS (for theme toggle) -->
    <script src="https://harithkavish.github.io/design-system/v1.0.0/harith-theme.min.js"></script>
</body>
</html>
```

### With HarithShell (Header/Footer)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Page</title>
    <link rel="stylesheet" href="https://harithkavish.github.io/design-system/v1.0.0/harith-theme.min.css">
    <script>
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark-mode');
        }
    </script>
</head>
<body>
    <!-- Header mount point -->
    <div id="sharedHeader"></div>
    
    <main>
        <h1>Welcome</h1>
        <p>Content goes here.</p>
    </main>
    
    <!-- Footer mount point -->
    <div id="sharedFooter"></div>
    
    <script src="https://harithkavish.github.io/design-system/v1.0.0/harith-theme.min.js"></script>
    <script>
        // Render header
        HarithShell.renderHeader({
            navLinks: [
                { label: 'Home', href: '/' },
                { label: 'About', href: '/about' },
                { label: 'Projects', href: '/projects' }
            ]
        });
        
        // Render footer
        HarithShell.renderFooter({
            links: [
                { label: 'Privacy Policy', href: '/privacy-policy.html' },
                { label: 'Terms of Service', href: '/terms-of-service.html' }
            ]
        });
    </script>
</body>
</html>
```

---

## Dark Mode

### Automatic Initialization

The theme toggle script auto-detects user preference:

```javascript
// Automatically runs on page load
HarithTheme.init(); // Already called by theme-toggle.js
```

### Manual Theme Control

```javascript
// Get current theme
const currentTheme = HarithTheme.get(); // 'light' or 'dark'

// Apply specific theme
HarithTheme.apply('dark'); // Switch to dark mode
HarithTheme.apply('light'); // Switch to light mode

// Toggle between themes
HarithTheme.toggle();
```

### Pre-render Flash Prevention

Add this in `<head>` before `<body>`:

```html
<script>
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark-mode');
    }
</script>
```

---

## HarithShell Components

### Header with Custom Brand

```javascript
HarithShell.renderHeader({
    target: '#sharedHeader', // Mount point (default: '#sharedHeader')
    brand: {
        title: 'My Portfolio',
        tagline: 'Developer & Designer' // Currently not displayed in layout
    },
    navLinks: [
        { label: 'Home', href: '/' },
        { label: 'Blog', href: '/blog' },
        { label: 'Contact', href: '/contact' }
    ]
});
```

### Header with Action Buttons

```javascript
HarithShell.renderHeader({
    navLinks: [
        { label: 'Toggle Panel', action: 'toggle-panel' }
    ]
});

// Listen for custom actions
document.addEventListener('harith-shell-action', (event) => {
    const { action, button } = event.detail;
    if (action === 'toggle-panel') {
        console.log('Panel toggle requested');
        // Your custom logic here
    }
});
```

### Footer with Custom Links

```javascript
HarithShell.renderFooter({
    target: '#sharedFooter',
    text: 'My Company', // Copyright text
    links: [
        { label: 'GitHub', href: 'https://github.com/username' },
        { label: 'LinkedIn', href: 'https://linkedin.com/in/username' },
        { label: 'Twitter', href: 'https://twitter.com/username' }
    ]
});
```

---

## Custom Styling

### Override Design Tokens

```html
<style>
    :root {
        /* Override light mode tokens */
        --shell-header-bg-light: rgba(240, 240, 255, 0.7);
        --btn-bg: rgba(100, 100, 255, 0.5);
        --color-primary: #0066ff;
    }
    
    body.dark-mode {
        /* Override dark mode tokens */
        --shell-header-bg-dark: rgba(10, 10, 30, 0.7);
        --btn-dark-bg: rgba(60, 60, 80, 0.6);
    }
</style>
```

### Custom Component Classes

```html
<style>
    .my-custom-button {
        /* Inherits from .portfolio-btn */
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
    }
</style>

<button class="portfolio-btn my-custom-button">Custom Button</button>
```

### Utility Composition

```html
<!-- Use built-in utilities -->
<div class="d-flex justify-center align-center gap-md p-lg">
    <button class="portfolio-btn">Action 1</button>
    <button class="portfolio-btn">Action 2</button>
</div>
```

---

## Migration from Legacy

### From Inline Styles

**Before:**
```html
<link rel="stylesheet" href="style.css">
<script src="script.js"></script>
```

**After:**
```html
<link rel="stylesheet" href="https://harithkavish.github.io/design-system/v1.0.0/harith-theme.min.css">
<script src="https://harithkavish.github.io/design-system/v1.0.0/harith-theme.min.js"></script>
```

### Update Header/Footer

**Before (manual HTML):**
```html
<header>
    <h1>My Site</h1>
    <nav>...</nav>
</header>
```

**After (HarithShell):**
```html
<div id="sharedHeader"></div>
<script>
    HarithShell.renderHeader({ navLinks: [...] });
</script>
```

### Dark Mode Migration

**Before (custom script):**
```javascript
// Old custom theme logic
function toggleDarkMode() { ... }
```

**After (HarithTheme API):**
```javascript
// Use built-in API
HarithTheme.toggle();
```

---

## Troubleshooting

### Theme Not Persisting
- Ensure `localStorage` is enabled
- Check browser console for errors
- Verify `theme` key in localStorage: `localStorage.getItem('theme')`

### Styles Not Loading
- Confirm CDN URL is correct and accessible
- Check network tab for 404 errors
- Ensure CSS is loaded before JavaScript

### Components Not Rendering
- Verify mount points exist (`#sharedHeader`, `#sharedFooter`)
- Check console for JavaScript errors
- Ensure `HarithShell` is defined: `console.log(window.HarithShell)`

---

## Best Practices

1. **Always load tokens.css first** if using modular approach
2. **Pre-render dark mode** to avoid flash of unstyled content
3. **Use semantic HTML** for accessibility
4. **Test on mobile** viewports (< 768px)
5. **Override tokens** instead of component styles when possible
6. **Keep custom CSS minimal** to benefit from future updates

---

## Version Locking

To lock to a specific version:

```html
<!-- Lock to v1.0.0 -->
<link rel="stylesheet" href="https://harithkavish.github.io/design-system/v1.0.0/harith-theme.min.css">

<!-- Auto-update to latest v1.x.x (when implemented) -->
<link rel="stylesheet" href="https://harithkavish.github.io/design-system/v1/harith-theme.min.css">
```

---

## Support

- [GitHub Issues](https://github.com/HarithKavish/harithkavish.github.io/issues)
- [Component Reference](COMPONENTS.md)
- [Token Reference](TOKENS.md)
- [Changelog](../CHANGELOG.md)
