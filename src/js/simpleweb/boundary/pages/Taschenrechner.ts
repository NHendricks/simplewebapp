import { css, html, LitElement } from 'lit'
import { state } from 'lit/decorators.js'

/**
 * Schulungsbeispiel: Ein robuster Taschenrechner (80% Größe).
 * Fokus: Layout-Sicherheit und saubere Logik.
 */
export class Taschenrechner extends LitElement {
  @state() private display = '0'
  private firstOperand: number | null = null
  private operator: string | null = null
  private waitingForSecondOperand = false

  static styles = css`
    :host {
      display: block;
      max-width: 360px;
      margin: 20px auto;
      padding: 20px;
      background: #f4f4f4;
      border: 4px solid #333;
      border-radius: 15px;
      font-family: system-ui, sans-serif;
      user-select: none; /* Verhindert Markieren von Text beim Klicken */
    }

    .display {
      background: #222;
      color: #0f0;
      font-family: 'Courier New', monospace;
      font-size: 2.2rem; /* Leicht reduziert für mehr Platz */
      text-align: right;
      padding: 15px;
      margin-bottom: 15px;
      border-radius: 5px;

      /* SCHUTZ VOR ÜBERLAUF */
      overflow: hidden; /* Schneidet Text ab */
      white-space: nowrap; /* Kein Zeilenumbruch */
      text-overflow: clip; /* Verhindert, dass Text aus dem Rand ragt */
      min-height: 1.2em;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
    }

    button {
      height: 60px;
      font-size: 1.4rem;
      font-weight: bold;
      cursor: pointer;
      border: 1px solid #999;
      border-radius: 8px;
      background: white;
      transition: background 0.2s;
    }

    button:active {
      background: #ddd;
    }

    .operator {
      background: #ffa500;
      color: white;
      border: none;
    }
    .clear {
      grid-column: span 2;
      background: #ff4444;
      color: white;
      border: none;
    }
    .equal {
      grid-column: span 2;
      background: #4caf50;
      color: white;
      border: none;
    }
    .zero {
      grid-column: span 2;
    }
  `

  private inputDigit(digit: number) {
    // Begrenzung auf 12 Zeichen, damit die Anzeige lesbar bleibt
    if (this.display.length >= 12 && !this.waitingForSecondOperand) return

    if (this.waitingForSecondOperand) {
      this.display = String(digit)
      this.waitingForSecondOperand = false
    } else {
      this.display = this.display === '0' ? String(digit) : this.display + digit
    }
  }

  private handleOperator(nextOp: string) {
    const value = parseFloat(this.display)

    if (this.firstOperand === null) {
      this.firstOperand = value
    } else if (this.operator) {
      const result = this.calculate(this.firstOperand, value, this.operator)
      // Rundung auf max. 10 Stellen, um Overflow durch Kommastellen zu verhindern
      this.display = String(Number(result.toPrecision(10)))
      this.firstOperand = result
    }

    this.waitingForSecondOperand = true
    this.operator = nextOp === '=' ? null : nextOp
  }

  private calculate(a: number, b: number, op: string): number {
    switch (op) {
      case '+':
        return a + b
      case '-':
        return a - b
      case '*':
        return a * b
      case '/':
        return b !== 0 ? a / b : 0
      default:
        return b
    }
  }

  private clear() {
    this.display = '0'
    this.firstOperand = null
    this.operator = null
    this.waitingForSecondOperand = false
  }

  private renderButton(label: string, className: string, action: () => void) {
    return html`<button class="${className}" @click=${action}>${label}</button>`
  }

  render() {
    return html`
      <div class="display" aria-live="polite">
        ${this.display.replace('.', ',')}
      </div>

      <div class="grid">
        ${this.renderButton('LÖSCHEN', 'clear', () => this.clear())}
        ${this.renderButton('÷', 'operator', () => this.handleOperator('/'))}
        ${this.renderButton('×', 'operator', () => this.handleOperator('*'))}
        ${[7, 8, 9].map((n) =>
          this.renderButton(String(n), '', () => this.inputDigit(n)),
        )}
        ${this.renderButton('-', 'operator', () => this.handleOperator('-'))}
        ${[4, 5, 6].map((n) =>
          this.renderButton(String(n), '', () => this.inputDigit(n)),
        )}
        ${this.renderButton('+', 'operator', () => this.handleOperator('+'))}
        ${[1, 2, 3].map((n) =>
          this.renderButton(String(n), '', () => this.inputDigit(n)),
        )}
        ${this.renderButton('=', 'equal', () => this.handleOperator('='))}
        ${this.renderButton('0', 'zero', () => this.inputDigit(0))}
        ${this.renderButton(',', '', () => {
          if (!this.display.includes('.')) this.display += '.'
        })}
      </div>
    `
  }
}
customElements.define('simple-taschenrechner', Taschenrechner)
