import { Router } from '@vaadin/router'
import { LitElement, css, html } from 'lit'
import { customElement, state } from 'lit/decorators.js'

@customElement('responsive-menu')
export class ResponsiveMenu extends LitElement {
  @state() private isMenuOpen = false
  @state() private isPortrait = window.matchMedia('(orientation: portrait)')
    .matches
  @state() private isScrolled = false
  @state() private openSubmenu: string | null = null

  private scrollHandler?: () => void

  static styles = css`
    :host {
      display: block;
      --primary-bg: #1a1a2e;
      --secondary-bg: #16213e;
      --accent-color: #0f3460;
      --highlight-color: #e94560;
      --text-primary: #eaeaea;
      --text-secondary: #a0a0a0;
      --border-color: #2d2d44;
      --transition-speed: 0.3s;
    }

    * {
      box-sizing: border-box;
    }

    /* Portrait Mode - Burger Menu */
    .portrait-header {
      position: fixed;
      top: 0;
      right: 0;
      z-index: 1000;
      padding: 1rem;
    }

    .burger-btn {
      background: var(--secondary-bg);
      border: 2px solid var(--accent-color);
      border-radius: 8px;
      width: 50px;
      height: 50px;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 5px;
      transition: all var(--transition-speed);
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
    }

    .burger-btn:hover {
      background: var(--accent-color);
      transform: scale(1.05);
    }

    .burger-line {
      width: 30px;
      height: 3px;
      background: var(--text-primary);
      border-radius: 2px;
      transition: all var(--transition-speed);
    }

    .burger-btn.open .burger-line:nth-child(1) {
      transform: rotate(45deg) translate(8px, 8px);
    }

    .burger-btn.open .burger-line:nth-child(2) {
      opacity: 0;
    }

    .burger-btn.open .burger-line:nth-child(3) {
      transform: rotate(-45deg) translate(8px, -8px);
    }

    .fullscreen-menu {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        135deg,
        var(--primary-bg) 0%,
        var(--secondary-bg) 100%
      );
      z-index: 999;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      opacity: 0;
      pointer-events: none;
      transition: opacity var(--transition-speed);
    }

    .fullscreen-menu.open {
      opacity: 1;
      pointer-events: all;
    }

    .portrait-nav {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      width: 80%;
      max-width: 400px;
    }

    .portrait-nav-item {
      background: var(--secondary-bg);
      border: 1px solid var(--border-color);
      border-radius: 8px;
      padding: 1.2rem;
      color: var(--text-primary);
      text-decoration: none;
      font-size: 1.5rem;
      font-weight: 500;
      text-align: center;
      cursor: pointer;
      transition: all var(--transition-speed);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    .portrait-nav-item:hover {
      background: var(--accent-color);
      transform: translateX(10px);
      box-shadow: 0 4px 8px rgba(233, 69, 96, 0.3);
    }

    .portrait-submenu {
      margin-top: 0.5rem;
      padding-left: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .portrait-submenu-item {
      background: var(--accent-color);
      border-radius: 6px;
      padding: 0.8rem;
      color: var(--text-primary);
      text-decoration: none;
      font-size: 1.1rem;
      text-align: center;
      cursor: pointer;
      transition: all var(--transition-speed);
    }

    .portrait-submenu-item:hover {
      background: var(--highlight-color);
      transform: translateX(5px);
    }

    .portrait-bonus {
      margin-top: 2rem;
      padding-top: 2rem;
      border-top: 2px solid var(--border-color);
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
    }

    .portrait-bonus-item {
      background: transparent;
      border: 1px solid var(--border-color);
      border-radius: 6px;
      padding: 0.8rem;
      color: var(--text-secondary);
      text-decoration: none;
      font-size: 1rem;
      text-align: center;
      cursor: pointer;
      transition: all var(--transition-speed);
    }

    .portrait-bonus-item:hover {
      background: var(--secondary-bg);
      color: var(--text-primary);
      border-color: var(--accent-color);
    }

    /* Landscape Mode - Horizontal Header */
    .landscape-header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: linear-gradient(
        180deg,
        var(--primary-bg) 0%,
        var(--secondary-bg) 100%
      );
      z-index: 1000;
      transition: all var(--transition-speed);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
    }

    .landscape-header.scrolled {
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.7);
    }

    .landscape-bonus {
      display: flex;
      justify-content: flex-end;
      gap: 2rem;
      padding: 0.8rem 2rem;
      background: var(--secondary-bg);
      border-bottom: 1px solid var(--border-color);
      transition: all var(--transition-speed);
      max-height: 50px;
      overflow: hidden;
    }

    .landscape-bonus.hidden {
      max-height: 0;
      padding: 0 2rem;
      opacity: 0;
    }

    .landscape-bonus-item {
      color: var(--text-secondary);
      text-decoration: none;
      font-size: 0.85rem;
      cursor: pointer;
      transition: all var(--transition-speed);
      white-space: nowrap;
    }

    .landscape-bonus-item:hover {
      color: var(--highlight-color);
    }

    .landscape-main {
      display: flex;
      align-items: center;
      padding: 1rem 2rem;
      gap: 3rem;
      transition: all var(--transition-speed);
    }

    .landscape-header.scrolled .landscape-main {
      padding: 0.5rem 2rem;
    }

    .site-icon {
      font-size: 3rem;
      transition: all var(--transition-speed);
      cursor: pointer;
      filter: drop-shadow(0 0 10px var(--highlight-color));
    }

    .landscape-header.scrolled .site-icon {
      font-size: 2rem;
    }

    .landscape-nav {
      display: flex;
      gap: 2rem;
      align-items: center;
      flex: 1;
    }

    .landscape-nav-item {
      color: var(--text-primary);
      text-decoration: none;
      font-size: 1.1rem;
      font-weight: 500;
      cursor: pointer;
      padding: 0.5rem 1rem;
      border-radius: 6px;
      transition: all var(--transition-speed);
      position: relative;
      white-space: nowrap;
    }

    .landscape-nav-item:hover {
      background: var(--accent-color);
      color: var(--highlight-color);
    }

    .submenu-container {
      position: relative;
    }

    .dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      margin-top: 0.5rem;
      background: var(--secondary-bg);
      border: 1px solid var(--border-color);
      border-radius: 8px;
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
      min-width: 200px;
      overflow: hidden;
      max-height: 0;
      opacity: 0;
      transition: all var(--transition-speed);
      pointer-events: none;
    }

    .dropdown.open {
      max-height: 500px;
      opacity: 1;
      pointer-events: all;
    }

    .dropdown-item {
      display: block;
      padding: 1rem 1.5rem;
      color: var(--text-primary);
      text-decoration: none;
      cursor: pointer;
      transition: all var(--transition-speed);
      border-bottom: 1px solid var(--border-color);
    }

    .dropdown-item:last-child {
      border-bottom: none;
    }

    .dropdown-item:hover {
      background: var(--accent-color);
      color: var(--highlight-color);
      padding-left: 2rem;
    }

    /* Hide content based on orientation */
    .portrait-only {
      display: none;
    }

    .landscape-only {
      display: none;
    }

    @media (orientation: portrait) {
      .portrait-only {
        display: block;
      }
      .landscape-only {
        display: none;
      }
    }

    @media (orientation: landscape) {
      .portrait-only {
        display: none;
      }
      .landscape-only {
        display: block;
      }
    }
  `

  connectedCallback() {
    super.connectedCallback()

    // Monitor orientation changes
    const mediaQuery = window.matchMedia('(orientation: portrait)')
    mediaQuery.addEventListener('change', (e) => {
      this.isPortrait = e.matches
      this.isMenuOpen = false
      this.openSubmenu = null
    })

    // Monitor scroll in landscape mode
    this.scrollHandler = () => {
      if (!this.isPortrait) {
        this.isScrolled = window.scrollY > 50
      }
    }
    window.addEventListener('scroll', this.scrollHandler)
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    if (this.scrollHandler) {
      window.removeEventListener('scroll', this.scrollHandler)
    }
  }

  private toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen
  }

  private toggleSubmenu(menu: string) {
    this.openSubmenu = this.openSubmenu === menu ? null : menu
  }

  private handleNavigation(path: string) {
    console.log('Navigate to:', path)
    this.isMenuOpen = false
    this.openSubmenu = null
    // Here you can integrate with your router
    Router.go(path)
  }

  render() {
    return html`
      <!-- Portrait Mode -->
      <div class="portrait-only">
        <div class="portrait-header">
          <button
            class="burger-btn ${this.isMenuOpen ? 'open' : ''}"
            @click=${this.toggleMenu}
            aria-label="Menu"
          >
            <span class="burger-line"></span>
            <span class="burger-line"></span>
            <span class="burger-line"></span>
          </button>
        </div>

        <div class="fullscreen-menu ${this.isMenuOpen ? 'open' : ''}">
          <nav class="portrait-nav">
            <!-- Main Navigation -->
            <a
              class="portrait-nav-item"
              @click=${() => this.handleNavigation('/')}
            >
              Start
            </a>
            <a
              class="portrait-nav-item"
              @click=${() => this.handleNavigation('/reisen')}
            >
              Reisen
            </a>
            <a
              class="portrait-nav-item"
              @click=${() => this.handleNavigation('/faq')}
            >
              FAQ
            </a>
            <div>
              <div
                class="portrait-nav-item"
                @click=${() => this.toggleSubmenu('aktionen')}
              >
                Aktionen ${this.openSubmenu === 'aktionen' ? '▼' : '▶'}
              </div>
              ${this.openSubmenu === 'aktionen'
                ? html`
                    <div class="portrait-submenu">
                      <a
                        class="portrait-submenu-item"
                        @click=${() =>
                          this.handleNavigation('/aktionen/anlegen')}
                      >
                        Anlegen
                      </a>
                      <a
                        class="portrait-submenu-item"
                        @click=${() =>
                          this.handleNavigation('/aktionen/aendern')}
                      >
                        Ändern
                      </a>
                      <a
                        class="portrait-submenu-item"
                        @click=${() =>
                          this.handleNavigation('/aktionen/loeschen')}
                      >
                        Löschen
                      </a>
                    </div>
                  `
                : ''}
            </div>

            <!-- Bonus Actions -->
            <div class="portrait-bonus">
              <a
                class="portrait-bonus-item"
                @click=${() => this.handleNavigation('/datenschutz')}
              >
                Datenschutz
              </a>
              <a
                class="portrait-bonus-item"
                @click=${() => this.handleNavigation('/impressum')}
              >
                Impressum
              </a>
              <a
                class="portrait-bonus-item"
                @click=${() => this.handleNavigation('/kontakt')}
              >
                Kontakt
              </a>
            </div>
          </nav>
        </div>
      </div>

      <!-- Landscape Mode -->
      <div class="landscape-only">
        <header class="landscape-header ${this.isScrolled ? 'scrolled' : ''}">
          <!-- Bonus Actions -->
          <div class="landscape-bonus ${this.isScrolled ? 'hidden' : ''}">
            <a
              class="landscape-bonus-item"
              @click=${() => this.handleNavigation('/datenschutz')}
            >
              Datenschutz
            </a>
            <a
              class="landscape-bonus-item"
              @click=${() => this.handleNavigation('/impressum')}
            >
              Impressum
            </a>
            <a
              class="landscape-bonus-item"
              @click=${() => this.handleNavigation('/kontakt')}
            >
              Kontakt
            </a>
          </div>

          <!-- Main Navigation -->
          <div class="landscape-main">
            <div class="site-icon" @click=${() => this.handleNavigation('/')}>
              🌐
            </div>
            <nav class="landscape-nav">
              <a
                class="landscape-nav-item"
                @click=${() => this.handleNavigation('/')}
              >
                Start
              </a>
              <a
                class="landscape-nav-item"
                @click=${() => this.handleNavigation('/reisen')}
              >
                Reisen
              </a>
              <a
                class="landscape-nav-item"
                @click=${() => this.handleNavigation('/faq')}
              >
                FAQ
              </a>
              <div class="submenu-container">
                <div
                  class="landscape-nav-item"
                  @click=${() => this.toggleSubmenu('aktionen-landscape')}
                >
                  Aktionen
                  ${this.openSubmenu === 'aktionen-landscape' ? '▼' : '▶'}
                </div>
                <div
                  class="dropdown ${this.openSubmenu === 'aktionen-landscape'
                    ? 'open'
                    : ''}"
                >
                  <a
                    class="dropdown-item"
                    @click=${() => this.handleNavigation('/aktionen/anlegen')}
                  >
                    Anlegen
                  </a>
                  <a
                    class="dropdown-item"
                    @click=${() => this.handleNavigation('/aktionen/aendern')}
                  >
                    Ändern
                  </a>
                  <a
                    class="dropdown-item"
                    @click=${() => this.handleNavigation('/aktionen/loeschen')}
                  >
                    Löschen
                  </a>
                </div>
              </div>
            </nav>
          </div>
        </header>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'responsive-menu': ResponsiveMenu
  }
}
