/**
 * Harith Design System - HarithShell Component
 * Version: 1.0.0
 * 
 * Programmatic header/footer rendering with nav links and brand customization.
 */

const HarithShell = (() => {
    const defaultNavLinks = [];
    const defaultFooterLinks = [];

    /**
         * Resolve target element from selector string or HTMLElement
         */
    function resolveTarget(target) {
        if (!target) return null;
        if (typeof target === 'string') {
            return document.querySelector(target);
        }
        if (target instanceof HTMLElement) {
            return target;
        }
        return null;
    }

    /**
         * Render navigation links (buttons or anchors)
         */
    function renderNavLinks(links) {
        return links.map(link => {
            if (link.action) {
                return `<button type="button" class="shared-nav-link" data-action="${link.action}">${link.label}</button>`;
            }
            return `<a class="shared-nav-link" href="${link.href}">${link.label}</a>`;
        }).join('');
    }

    /**
         * Render header component
         * @param {Object} options
         * @param {string|HTMLElement} options.target - Mount point selector or element
         * @param {Array} options.navLinks - Navigation link objects
         * @param {Object} options.brand - Brand title and tagline
         * @returns {HTMLElement} Header element
         */
    function renderHeader({ target = '#sharedHeader', navLinks = defaultNavLinks, brand = {} } = {}) {
        const container = resolveTarget(target);
        if (!container) return null;

        const brandTitle = brand.title || 'Harith Kavish';
        const brandTagline = brand.tagline || 'AI-Driven Systems Architect & Creative Director';

        container.innerHTML = '';
        const header = document.createElement('header');
        header.className = 'shared-header';

        const navMarkup = renderNavLinks(navLinks);

        header.innerHTML = `
            <div class="shared-header__inner">
                <div class="shared-brand shared-brand--single-line">
                    <span class="shared-brand__name">${brandTitle}</span>
                </div>
                ${navMarkup ? `<nav class="shared-nav" aria-label="Primary">${navMarkup}</nav>` : ''}
                <div class="shared-header__actions">
                    <button id="darkModeToggle" class="theme-toggle" aria-label="Toggle dark mode"></button>
                    <div class="google-button-wrapper" id="googleSignInButton" aria-label="Sign in with Google"></div>
                </div>
            </div>
        `;

        container.appendChild(header);

        // Bind action buttons
        header.querySelectorAll('[data-action]').forEach(button => {
            button.addEventListener('click', event => {
                const action = button.getAttribute('data-action');
                const actionEvent = new CustomEvent('harith-shell-action', {
                    detail: { action, button, event }
                });
                document.dispatchEvent(actionEvent);
            });
        });

        return header;
    }

    /**
     * Render footer component
     * @param {Object} options
     * @param {string|HTMLElement} options.target - Mount point selector or element
     * @param {Array} options.links - Footer link objects
     * @param {string} options.text - Footer copyright text
     * @returns {HTMLElement} Footer element
     */
    function renderFooter({ target = '#sharedFooter', links = defaultFooterLinks, text = 'Harith Kavish' } = {}) {
        const container = resolveTarget(target);
        if (!container) return null;

        const year = new Date().getFullYear();

        container.innerHTML = '';
        const footer = document.createElement('footer');
        footer.className = 'shared-footer';

        footer.innerHTML = `
            <div class="shared-footer__inner">
                <span class="shared-footer__copy">© ${year} ${text}</span>
                ${links.length
                ? `<div class="shared-footer__links">
                    ${links.map(link => `<a href="${link.href}" target="_blank" rel="noreferrer noopener">${link.label}</a>`).join('')}
                </div>`
                : ''}
            </div>
        `;

        container.appendChild(footer);
        return footer;
    }

    return {
        renderHeader,
        renderFooter
    };
})();

window.HarithShell = HarithShell;
