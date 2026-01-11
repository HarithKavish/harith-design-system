# Harith Design System

A comprehensive, production-ready design system powering all `harithkavish.github.io` projects.

## Overview

Central theme repository providing consistent styling, components, and interactions across all repositories. Built with glassmorphism, dark mode, and accessibility in mind.

## Quick Start

### Via CDN (Recommended)

```html
<!-- Load theme CSS -->
<link rel="stylesheet" href="https://harithkavish.github.io/design-system/v1.0.0/harith-theme.min.css">

<!-- Load JavaScript (optional, for components & dark mode) -->
<script src="https://harithkavish.github.io/design-system/v1.0.0/harith-theme.min.js"></script>
```

### Modular Loading

```html
<!-- Tokens only -->
<link rel="stylesheet" href="https://harithkavish.github.io/design-system/v1.0.0/tokens.css">

<!-- Base styles -->
<link rel="stylesheet" href="https://harithkavish.github.io/design-system/v1.0.0/base.css">

<!-- Components -->
<link rel="stylesheet" href="https://harithkavish.github.io/design-system/v1.0.0/components.css">

<!-- Utilities -->
<link rel="stylesheet" href="https://harithkavish.github.io/design-system/v1.0.0/utils.css">
```

## Features

### Design Tokens
- CSS variables for colors, spacing, typography, shadows
- Dark mode support via class toggle
- Smooth transitions and animations

### Components
- **HarithShell**: Fixed header/footer with glassmorphism
- **Buttons**: Primary, secondary, icon, toggle styles
- **Cards**: Glass-effect containers with backdrop blur
- **Status Indicators**: Online/offline dots with animations
- **Chat Widget**: Floating modal with iframe embedding

### JavaScript Utilities
- **Theme Toggle**: Persistent dark/light mode with localStorage
- **HarithShell API**: Programmatic header/footer rendering
- **Widget Loader**: Auto-load Neo AI chat widget

## Architecture

```
design-system/
├── v1.0.0/                    # Versioned release
│   ├── tokens.css             # Design tokens & CSS variables
│   ├── base.css               # Resets, typography, layout
│   ├── components.css         # Buttons, cards, HarithShell
│   ├── utils.css              # Spacing, display, helpers
│   ├── harith-theme.css       # Combined (all CSS)
│   ├── harith-theme.min.css   # Minified combined CSS
│   ├── theme-toggle.js        # Dark mode logic
│   ├── harith-shell.js        # Header/footer components
│   ├── widget-loader.js       # Neo AI widget
│   ├── harith-theme.js        # Combined (all JS)
│   └── harith-theme.min.js    # Minified combined JS
├── docs/                      # Documentation
│   ├── USAGE.md               # Integration guide
│   ├── COMPONENTS.md          # Component reference
│   ├── TOKENS.md              # Design token reference
│   └── MIGRATION.md           # Version migration guides
├── examples/                  # Example pages
│   ├── basic.html             # Minimal setup
│   ├── full-featured.html     # All components
│   └── custom-overrides.html  # Theme customization
├── CHANGELOG.md               # Version history
└── package.json               # Metadata & versioning
```

## Usage

### Basic Page Setup

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Page</title>
    
    <!-- Design System -->
    <link rel="stylesheet" href="https://harithkavish.github.io/design-system/v1.0.0/harith-theme.min.css">
    
    <!-- Dark mode initialization (before body renders) -->
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
    
    <!-- Main content -->
    <main>
        <h1>Hello World</h1>
        <button class="portfolio-btn">Click Me</button>
    </main>
    
    <!-- Footer mount point -->
    <div id="sharedFooter"></div>
    
    <!-- JavaScript -->
    <script src="https://harithkavish.github.io/design-system/v1.0.0/harith-theme.min.js"></script>
    <script>
        // Render header & footer
        HarithShell.renderHeader({
            navLinks: [
                { label: 'Home', href: '/' },
                { label: 'Projects', href: '/projects' }
            ]
        });
        HarithShell.renderFooter({
            links: [
                { label: 'Privacy', href: '/privacy-policy.html' },
                { label: 'Terms', href: '/terms-of-service.html' }
            ]
        });
    </script>
</body>
</html>
```

### Custom Overrides

```html
<style>
    /* Override design tokens */
    :root {
        --shell-header-bg-light: rgba(240, 240, 255, 0.6);
    }
    
    /* Add custom classes */
    .my-custom-button {
        /* Inherits from .portfolio-btn */
    }
</style>
```

## Version Strategy

- **v1.0.0**: Initial release (current)
- **v1.x.x**: Backward-compatible additions/fixes
- **v2.0.0**: Breaking changes

Repos can lock to specific versions or use `@latest` for auto-updates.

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS 14+, Android 90+)

## Contributing

1. Test changes locally
2. Update CHANGELOG.md
3. Bump version in package.json
4. Create new versioned folder (e.g., `v1.1.0/`)
5. Build minified assets
6. Update documentation
7. Commit and push

## License

© 2026 Harith Kavish. All rights reserved.

## Links

- [Production Site](https://harithkavish.github.io/)
- [Component Docs](docs/COMPONENTS.md)
- [Token Reference](docs/TOKENS.md)
- [Changelog](CHANGELOG.md)
