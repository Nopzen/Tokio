import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('tokio-alert')
export class TokioAlert extends LitElement {
  @property({ type: String }) variant:
    | 'info'
    | 'success'
    | 'error'
    | 'warning' = 'info';

  @property({ type: Boolean }) outlined?: boolean;

  @property({ type: Boolean }) closeable?: boolean;

  @property({ type: String }) closeLabel?: string;

  @property({ attribute: true }) close?: () => void;

  constructor() {
    super();

    this._closeHandler = this._closeHandler.bind(this);
  }

  static get styles() {
    return css`
      :host {
        font-family: var(--font-family);
        visibility: visible;
      }

      :host([aria-hidden='true']) {
        visibility: hidden;
      }

      :host([outlined]) > div {
        background-color: transparent;
      }

      div {
        border: 3px solid transparent;
        border-radius: var(--box-radius-large);
        padding: 8px 24px;
        font-size: var(--font-text-small-font-size);
        line-height: var(--font-text-small-line-height);
        display: flex;
        flex-direction: row;
        column-gap: 16px;
        align-items: flex-start;
        width: 100%;
      }

      div p {
        flex: 1 1 auto;
        margin: 0;
      }

      div button {
        cursor: pointer;
        border: none;
        background-color: transparent;
        font-size: var(--font-text-x-small-font-size);
        line-height: var(--font-text-x-small-line-height);
      }

      div button:focus {
        outline: none;
      }

      .info {
        background-color: var(--info-default);
        border-color: var(--info-dark);
        color: var(--grayscale-white);
      }
      .info button {
        color: var(--grayscale-white);
      }
      :host([outlined]) .info,
      :host([outlined]) .info button {
        color: var(--info-default);
      }

      .success {
        background-color: var(--success-default);
        border-color: var(--success-dark);
        color: var(--grayscale-white);
      }
      .success button {
        color: var(--grayscale-white);
      }
      :host([outlined]) .success,
      :host([outlined]) .success button {
        color: var(--success-default);
      }

      .error {
        background-color: var(--error-default);
        border-color: var(--error-dark);
        color: var(--grayscale-white);
      }
      .error button {
        color: var(--grayscale-white);
      }
      :host([outlined]) .error,
      :host([outlined]) .error button {
        color: var(--error-default);
      }

      .warning {
        background-color: var(--warning-default);
        border-color: var(--warning-dark);
        color: var(--warning-dark);
      }
      .warning button {
        color: var(--warning-dark);
      }
      :host([outlined]) .warning,
      :host([outlined]) .warning button {
        color: var(--warning-default);
      }
    `;
  }

  private _closeHandler(): void {
    if (this.close === undefined) return;

    this.setAttribute('aria-hidden', 'true');
    this.close();
  }

  render() {
    if (this.closeable && !this.close) {
      throw new Error(
        'Missing close callback for alert with provided closeable property'
      );
    }

    return html`
      <div class=${this.variant}>
        <p><slot></slot></p>
        ${this.close
          ? html`<button @click=${this._closeHandler}>X</button>`
          : html``}
      </div>
    `;
  }
}
