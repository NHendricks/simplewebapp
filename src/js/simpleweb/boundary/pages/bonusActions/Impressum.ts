import { LitElement, css, html } from 'lit'

export class Impressum extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: Arial, sans-serif;
      color: #c4bebe;
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
  `

  render() {
    return html`
      <div class="content">
        <h1>Impressum</h1>
      </div>
    `
  }
}

customElements.define('simple-impressum', Impressum)
