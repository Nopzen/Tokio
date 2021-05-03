import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('tokio-button')
export class TokioButton extends LitElement {
  @property({ type: String }) type: 'button' | 'reset' | 'submit' = 'button';

  @property({ type: String }) variant:
    | 'info'
    | 'success'
    | 'error'
    | 'warning' = 'info';

  @property({ type: Boolean }) disabled: boolean = false;

  @property({ type: Boolean }) block: boolean = false;

  @property({ type: Boolean }) outlined: boolean = false;

  @property({ type: Boolean }) loading: boolean = false;

  @property({ type: String }) href?: string;

  static get styles() {
    return css`
      :host {
        display: inline-block;
      }

      :host([block]),
      :host([block]) button {
        display: block;
        width: 100%;
      }

      button {
        border: 3px solid transparent;
        border-radius: var(--box-radius-large);
        padding: 8px 24px;
        font-size: var(--font-text-medium-font-size);
        line-height: var(--font-text-medium-line-height);
        cursor: pointer;
      }

      a {
        padding: 8px 24px;
        font-family: var(--font-family);
        font-size: var(--font-text-medium-font-size);
        line-height: var(--font-text-medium-line-height);
        text-decoration: none;
        cursor: pointer;
      }

      button:focus,
      a:focus {
        outline: none;
      }

      .info {
        background-color: var(--info-default);
        border-color: var(--info-dark);
        color: var(--grayscale-white);
      }
      a.info {
        background-color: transparent;
        color: var(--info-default);
      }

      button.info:focus {
        box-shadow: 0 0 5px 3px var(--info-light);
      }

      .success {
        background-color: var(--success-default);
        border-color: var(--success-dark);
        color: var(--grayscale-white);
      }
      a.success {
        background-color: transparent;
        color: var(--success-default);
      }

      button.success:focus {
        box-shadow: 0 0 5px 3px var(--success-light);
      }

      .error {
        background-color: var(--error-default);
        border-color: var(--error-dark);
        color: var(--grayscale-white);
      }
      a.error {
        background-color: transparent;
        color: var(--error-default);
      }

      button.error:focus {
        box-shadow: 0 0 5px 3px var(--error-light);
      }

      .warning {
        background-color: var(--warning-default);
        border-color: var(--warning-dark);
        color: var(--warning-dark);
      }
      a.warning {
        background-color: transparent;
        color: var(--warning-default);
      }

      button.warning:focus {
        box-shadow: 0 0 5px 3px var(--warning-light);
      }

      /**
       * outlined style
       */
      :host([outlined]) button {
        background-color: transparent !important;
      }

      :host([outlined]) button.info {
        color: var(--info-default);
      }

      :host([outlined]) button.success {
        color: var(--success-default);
      }

      :host([outlined]) button.error {
        color: var(--error-default);
      }

      :host([outlined]) button.warning {
        border-color: var(--warning-default);
        color: var(--warning-default);
      }

      /**
       * Disabled styles
       */
      :host([disabled]) button {
        opacity: 0.3;
        cursor: not-allowed;
      }
    `;
  }

  private _handleClick(event: MouseEvent) {
    if (this.disabled || this.loading) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }

  render() {
    if (this.href) {
      return html`
        <a class=${this.variant} href=${this.href} @click=${this._handleClick}>
          ${this.loading ? 'Loading...' : html`<slot></slot>`}
        </a>
      `;
    }
    return html`
      <button class=${this.variant} @click=${this._handleClick}>
        ${this.loading ? 'Loading...' : html`<slot></slot>`}
      </button>
    `;
  }
}
