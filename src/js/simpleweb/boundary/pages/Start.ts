import { LitElement, css, html } from 'lit'

export class ReisebusLayout extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: Arial, sans-serif;
      color: #333;
    }

    /* Menüleiste */
    nav {
      display: flex;
      justify-content: space-around;
      align-items: center;
      background: #1e293b;
      color: white;
      padding: 1rem;
    }

    nav a {
      color: white;
      text-decoration: none;
      font-weight: 500;
    }

    nav a:hover {
      text-decoration: underline;
    }

    /* Bildbereich */
    .hero {
      width: 100%;
      height: 280px;
      overflow: hidden;
    }

    .hero img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    /* Inhalt */
    .content {
      padding: 2rem;
      max-width: 1000px;
      margin: 0 auto;
    }

    h1 {
      margin-bottom: 0.5rem;
    }

    h2 {
      margin-top: 2rem;
      color: #475569;
    }

    .columns {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
      margin-top: 1rem;
    }

    @media (max-width: 768px) {
      .columns {
        grid-template-columns: 1fr;
      }
    }
  `

  render() {
    return html`
      <nav>
        <a href="/">Start</a>
        <a href="/reisen">Reisen</a>
        <a href="#">Busflotte</a>
        <a href="#">Service</a>
        <a href="#">Kontakt</a>
      </nav>

      <div class="hero">
        <img
          src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957"
          alt="Reisebus"
        />
      </div>

      <div class="content">
        <h1>Komfortables Reisen mit dem Bus</h1>
        <h2>Entspannt ans Ziel</h2>

        <div class="columns">
          <p>
            Unsere modernen Reisebusse bieten höchsten Komfort für kurze und
            lange Strecken. Bequeme Sitze, Klimaanlage und großzügiger Stauraum
            sorgen für ein angenehmes Reiseerlebnis.
          </p>
          <p>
            Ob Städtereise, Gruppenfahrt oder individuelle Tour – wir bringen
            Sie sicher und zuverlässig ans Ziel. Lehnen Sie sich zurück und
            genießen Sie die Fahrt.
          </p>
        </div>
      </div>
    `
  }
}

customElements.define('simple-start', ReisebusLayout)
