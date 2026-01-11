# Changelog

All notable changes to the Harith Design System will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-01-11

### Added
- Initial release of Harith Design System
- **Design Tokens** (`tokens.css`): CSS variables for colors, spacing, typography, shadows
- **Base Styles** (`base.css`): Resets, typography, layout, animations
- **Components** (`components.css`):
  - HarithShell: Fixed header/footer with glassmorphism
  - Buttons: Primary, secondary, toggle, external link indicators
  - Status indicators: Online/offline dots
  - Chat widget: Floating button and modal
- **Utilities** (`utils.css`): Spacing, display, flex, position, text, color, border, shadow helpers
- **JavaScript Modules**:
  - `theme-toggle.js`: Dark mode toggle with localStorage
  - `harith-shell.js`: Programmatic header/footer rendering
  - `widget-loader.js`: Auto-load Neo AI chat widget
- **Documentation**:
  - README.md: Quick start, architecture, usage examples
  - Package.json with versioning metadata
- **Dark Mode**: System-wide theme toggle with persistent state
- **Accessibility**: Focus states, semantic HTML, ARIA labels
- **Responsive Design**: Mobile breakpoints for header, footer, chat widget

### Features
- Glassmorphism effects with backdrop-filter
- Gradient backgrounds (light/dark mode)
- Smooth transitions and hover effects
- Cross-iframe theme synchronization
- Versioned CDN-ready structure

### Browser Support
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS 14+, Android 90+)

### Notes
- This is the initial production release extracted from `harithkavish_github_io`
- All CSS variables follow the `--prefix` naming convention
- JavaScript modules are ES5-compatible (IE11+ if needed)

---

## [Unreleased]

### Planned
- Minified CSS/JS bundles
- Component documentation site
- Storybook integration
- TypeScript definitions
- npm package publication
