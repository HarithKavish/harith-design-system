/**
 * Harith Design System - HarithShell Components (Web Components)
 * Version: 1.1.0
 * 
 * Defines <harith-header> and <harith-footer> Web Components.
 * Handles Theme Toggle and Google Sign-In internally.
 */

(function () {
    const GOOGLE_USER_KEY = 'harith_google_user';

    // --- Helper: Theme Logic ---
    function toggleTheme() {
        if (window.HarithTheme) {
            window.HarithTheme.toggle();
        } else {
            document.body.classList.toggle('dark-mode');
        }
    }

    // --- Helper: Decode JWT ---
    function decodeJwt(credential) {
        try {
            const payload = credential.split('.')[1];
            const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
            const decoded = decodeURIComponent(atob(base64)
                .split('')
                .map(char => '%' + ('00' + char.charCodeAt(0).toString(16)).slice(-2))
                .join(''));
            return JSON.parse(decoded);
        } catch (e) { return null; }
    }

    class HarithHeader extends HTMLElement {
        static get observedAttributes() {
            return ['site-title', 'site-tagline', 'google-client-id', 'nav-links'];
        }

        constructor() {
            super();
        }

        connectedCallback() {
            this.render();
            // Need to defer init logic slightly to ensure DOM is ready or attributes parsed
            setTimeout(() => {
                this.initThemeToggle();
                this.initGoogleAuth();
            }, 0);
        }

        attributeChangedCallback(name, oldValue, newValue) {
            if (oldValue !== newValue) {
                this.render();
                // If auth client ID changes, re-init? Only if strictly needed.
                if (name === 'google-client-id') this.initGoogleAuth();
            }
        }

        get siteTitle() { return this.getAttribute('site-title') || 'Harith Kavish'; }
        get siteTagline() { return this.getAttribute('site-tagline') || 'AI-Driven Systems Architect & Creative Director'; }
        get navLinks() { 
            try { return JSON.parse(this.getAttribute('nav-links') || '[]'); } 
            catch { return []; }
        }
        get googleClientId() { return this.getAttribute('google-client-id'); }

        render() {
            const navMarkup = this.navLinks.map(link => {
                if (link.action) {
                    return `<button type="button" class="shared-nav-link" data-action="${link.action}">${link.label}</button>`;
                }
                return `<a class="shared-nav-link" href="${link.href}">${link.label}</a>`;
            }).join('');

            // Use Light DOM
            this.innerHTML = `
                <header class="shared-header">
                    <div class="shared-header__inner">
                        <div class="shared-brand shared-brand--single-line">
                            <span class="shared-brand__name">${this.siteTitle}</span>
                        </div>
                        ${navMarkup ? `<nav class="shared-nav" aria-label="Primary">${navMarkup}</nav>` : ''}
                        <div class="shared-header__actions">
                            <button id="darkModeToggle" class="theme-toggle" aria-label="Toggle dark mode">
                                ${document.body.classList.contains('dark-mode') ? '☀️' : '🌙'}
                            </button>
                            ${this.googleClientId ? '<div class="google-button-wrapper" id="googleSignInButton" aria-label="Sign in with Google"></div>' : ''}
                        </div>
                    </div>
                </header>
            `;

            // Bind Action Buttons
            this.querySelectorAll('[data-action]').forEach(btn => {
                // Remove old listeners to avoid dupes? innerHTML replacement clears them.
                btn.addEventListener('click', e => {
                    this.dispatchEvent(new CustomEvent('harith-shell-action', {
                        detail: { action: btn.getAttribute('data-action'), originalEvent: e },
                        bubbles: true
                    }));
                });
            });
        }

        initThemeToggle() {
            const btn = this.querySelector('#darkModeToggle');
            if (btn) {
                btn.onclick = toggleTheme; // Simple bind
                // Listen for theme changes to update icon
                if (!this._themeObserver) {
                    this._themeObserver = new MutationObserver(() => {
                        btn.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
                    });
                    this._themeObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });
                }
            }
        }

        initGoogleAuth() {
            const container = this.querySelector('#googleSignInButton');
            if (!container || !this.googleClientId) return;

            // Check stored user
            try {
                const stored = localStorage.getItem(GOOGLE_USER_KEY);
                if (stored) {
                    const user = JSON.parse(stored);
                    if (user && user.name) {
                        this.renderUserProfile(container, user);
                        return;
                    }
                }
            } catch (e) { }

            // Init GSI
            const initGSI = () => {
                if (window.google && google.accounts && google.accounts.id) {
                    google.accounts.id.initialize({
                        client_id: this.googleClientId,
                        callback: (response) => {
                            const payload = decodeJwt(response.credential);
                            if (payload) {
                                const user = {
                                    name: payload.name,
                                    picture: payload.picture,
                                    email: payload.email
                                };
                                localStorage.setItem(GOOGLE_USER_KEY, JSON.stringify(user));
                                this.renderUserProfile(container, user);
                            }
                        }
                    });
                    google.accounts.id.renderButton(container, { theme: "outline", size: "large", shape: "pill" });
                } else {
                    // Poll if not loaded yet
                    setTimeout(initGSI, 200);
                }
            };
            initGSI();
        }

        renderUserProfile(container, user) {
            const dropdownId = 'userProfileDropdown';
            container.style.position = 'relative';

            container.innerHTML = `
                <button type="button" class="signed-in-button" aria-label="Signed in as ${user.name}" aria-expanded="false" aria-controls="${dropdownId}">
                    <img src="${user.picture || ''}" alt="${user.name}" class="signed-in-button__avatar" loading="lazy" />
                </button>
                <div id="${dropdownId}" class="user-dropdown-menu">
                    <div class="user-dropdown-header">
                        <span class="user-dropdown-name">${user.name}</span>
                    </div>
                    <button type="button" class="user-dropdown-action" id="logoutBtn">
                        Sign Out
                    </button>
                </div>
            `;

            this.injectStyles();

            const btn = container.querySelector('.signed-in-button');
            const dropdown = container.querySelector('.user-dropdown-menu');
            const logout = container.querySelector('#logoutBtn');

            btn.onclick = (e) => {
                e.stopPropagation();
                dropdown.classList.toggle('show');
                const isExpanded = dropdown.classList.contains('show');
                btn.setAttribute('aria-expanded', isExpanded);
                btn.classList.toggle('active', isExpanded);
            };

            // Global click to close
            if (!this._globalClickListener) {
                this._globalClickListener = () => {
                    if(dropdown) dropdown.classList.remove('show');
                    if(btn) {
                        btn.setAttribute('aria-expanded', 'false');
                        btn.classList.remove('active');
                    }
                };
                document.addEventListener('click', this._globalClickListener);
            }

            dropdown.onclick = e => e.stopPropagation();

            logout.onclick = () => {
                localStorage.removeItem(GOOGLE_USER_KEY);
                location.reload();
            };
        }

        injectStyles() {
            if (document.getElementById('harith-shell-styles')) return;
            const style = document.createElement('style');
            style.id = 'harith-shell-styles';
            style.textContent = `
                .user-dropdown-menu {
                    position: absolute;
                    top: 100%;
                    right: 0;
                    margin-top: 0.5rem;
                    background: var(--surface-card, #fff);
                    border: 1px solid var(--border-color, #eee);
                    border-radius: 12px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                    width: 200px;
                    display: none;
                    z-index: 1000;
                    overflow: hidden;
                    text-align: left;
                }
                .dark-mode .user-dropdown-menu {
                    background: var(--surface-card-dark, #222);
                    border-color: var(--border-color-dark, #444);
                }
                .user-dropdown-menu.show { display: block; }
                .user-dropdown-header {
                    padding: 12px 16px;
                    border-bottom: 1px solid var(--border-color, #eee);
                    font-weight: 600;
                    color: var(--text-primary, #111);
                }
                .dark-mode .user-dropdown-header {
                    border-color: var(--border-color-dark, #444);
                    color: var(--text-primary-dark, #fff);
                }
                .user-dropdown-action {
                    width: 100%;
                    text-align: left;
                    padding: 12px 16px;
                    background: none;
                    border: none;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    color: var(--text-secondary, #666);
                    font-size: 0.95rem;
                }
                .user-dropdown-action:hover {
                    background: var(--surface-hover, #f5f5f5);
                    color: var(--color-primary, #007bff);
                }
                .dark-mode .user-dropdown-action:hover {
                    background: var(--surface-hover-dark, #333);
                }
                .signed-in-button {
                    padding: 2px;
                    border-radius: 50%;
                    cursor: pointer;
                    border: 2px solid transparent;
                    transition: border-color 0.2s;
                }
                .signed-in-button.active {
                    border-color: var(--color-primary, #007bff);
                }
                .signed-in-button__avatar {
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    object-fit: cover;
                }
            `;
            document.head.appendChild(style);
        }
    }

    class HarithFooter extends HTMLElement {
        static get observedAttributes() { return ['links', 'copyright-text']; }
        
        get links() {
            try { return JSON.parse(this.getAttribute('links') || '[]'); } 
            catch { return []; }
        }

        connectedCallback() {
            this.render();
        }
        
        attributeChangedCallback() { this.render(); }

        render() {
            const year = new Date().getFullYear();
            const text = this.getAttribute('copyright-text') || 'Harith Kavish';
            
            this.innerHTML = `
                <footer class="shared-footer">
                    <div class="shared-footer__inner">
                        <span class="shared-footer__copy">© ${year} ${text}</span>
                        ${this.links.length ? `
                        <div class="shared-footer__links">
                            ${this.links.map(link => `<a href="${link.href}" target="_blank" rel="noreferrer noopener">${link.label}</a>`).join('')}
                        </div>
                        ` : ''}
                    </div>
                </footer>
            `;
        }
    }

    // Register Components
    if (!customElements.get('harith-header')) customElements.define('harith-header', HarithHeader);
    if (!customElements.get('harith-footer')) customElements.define('harith-footer', HarithFooter);

    // Legacy Fallback
    window.HarithShell = {
        renderHeader: (opts) => {
            const target = typeof opts.target === 'string' ? document.querySelector(opts.target) : opts.target;
            if(!target) return;
            const el = document.createElement('harith-header');
            if(opts.brand && opts.brand.title) el.setAttribute('site-title', opts.brand.title);
            if(opts.navLinks) el.setAttribute('nav-links', JSON.stringify(opts.navLinks));
            target.appendChild(el);
        },
        renderFooter: (opts) => {
             const target = typeof opts.target === 'string' ? document.querySelector(opts.target) : opts.target;
             if(!target) return;
             const el = document.createElement('harith-footer');
             if(opts.links) el.setAttribute('links', JSON.stringify(opts.links));
             target.appendChild(el);
        }
    };

})();
