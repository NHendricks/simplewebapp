import { LitElement, css, html } from 'lit'

export class Faq extends LitElement {
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

    h2 {
      margin-top: 2rem;
      color: #475569;
    }

    .list {
      font-size: x-large;
    }

    .list-entry {
      margin-top: 1em;
    }
  `

  render() {
    return html`
      <div class="content">
        <h1>FAQ</h1>
        <h2>Simplify your life</h2>

        <div class="list">
          <ul>
            <li class="list-entry">
              In der index.html werden das Menu und die Hauptseite definiert.
              Die app.ts wird referenziert.
            </li>
            <li class="list-entry">
              In der app.ts werden alle Seiten importiert (auch das Menu) und je
              nach Route wird eine andere Hauptseite angezeigt.
            </li>
            <li class="list-entry">
              In der menu-config.json werden alle Aktionen (normal, Popupmenu
              und Bonus-Aktionen) und die entsprechende Route für die Seite
              definiert.
            </li>
          </ul>
        </div>
      </div>
    `
  }
}

customElements.define('simple-faq', Faq)
