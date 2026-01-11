/**
 * Harith Design System - Theme Toggle
 * Version: 1.0.0
 * 
 * Dark mode toggle with localStorage persistence.
 */

(function () {
    const THEME_KEY = 'theme';
    let currentTheme = 'light';

    /**
         * Detect user's preferred theme from localStorage or system preference
         */
    function detectPreferredTheme() {
        const saved = localStorage.getItem(THEME_KEY);
        if (saved) return saved;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    /**
         * Update body class for dark mode
         */
    function updateBodyClass(isDark) {
        if (document.body) {
            document.body.classList.toggle('dark-mode', isDark);
        } else {
            document.addEventListener('DOMContentLoaded', () => {
                document.body.classList.toggle('dark-mode', isDark);
            }, { once: true });
        }
    }

    /**
         * Update toggle button text (🌙 / ☀️)
         */
    function updateToggleText(theme) {
        const toggle = document.getElementById('darkModeToggle');
        if (toggle) {
            toggle.textContent = theme === 'dark' ? '☀️' : '🌙';
        }
    }

    /**
         * Notify iframe/widget of theme change via postMessage
         */
    function notifyThemeChange(theme) {
        const chatFrame = document.getElementById('chatFrame');
        if (chatFrame && chatFrame.contentWindow) {
            chatFrame.contentWindow.postMessage({
                type: 'theme-change',
                theme
            }, '*');
        }
    }

    /**
         * Apply theme to document
         * @param {string} theme - 'light' or 'dark'
         * @param {boolean} persist - Save to localStorage
         */
    function applyTheme(theme, persist = true) {
        currentTheme = theme === 'dark' ? 'dark' : 'light';
        document.documentElement.classList.toggle('dark-mode', currentTheme === 'dark');
        updateBodyClass(currentTheme === 'dark');
        if (persist) {
            localStorage.setItem(THEME_KEY, currentTheme);
        }
        updateToggleText(currentTheme);
        notifyThemeChange(currentTheme);
    }

    /**
     * Toggle between light and dark themes
     */
    function toggleTheme() {
        applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
    }

    /**
     * Initialize theme on page load
     */
    function initTheme() {
        applyTheme(detectPreferredTheme(), false);
    }

    /**
     * Auto-initialize theme and expose public API
     */
    window.HarithTheme = {
        toggle: toggleTheme,
        apply: applyTheme,
        get: () => currentTheme,
        init: initTheme
    };

    // Auto-init on script load
    initTheme();

    // Bind to toggle button if present
    document.addEventListener('DOMContentLoaded', () => {
        const toggleBtn = document.getElementById('darkModeToggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', toggleTheme);
            updateToggleText(currentTheme);
        }
    });
})();
