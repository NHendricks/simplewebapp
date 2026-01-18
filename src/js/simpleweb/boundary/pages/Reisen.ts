import { LitElement, css, html } from 'lit'

export class ReisebusLayout extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: Arial, sans-serif;
      color: #333;
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
      <div class="hero">
        <img src="./assets/photo-1544620347-c4fd4a3d5957.jpg" alt="Reisebus" />
      </div>

      <div class="content">
        <h1>Reisen mit dem Bus</h1>
      </div>
    `
  }
}

customElements.define('simple-reisen', ReisebusLayout)
