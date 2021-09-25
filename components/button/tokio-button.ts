import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators/custom-element.js"
import { property } from "lit/decorators/property.js"
import { classMap } from 'lit/directives/class-map.js';

import { Variant, VariantStyle } from "../../@types/enums";

@customElement("tokio-button")
export class TokioButton extends LitElement {
    @property({ type: String }) variant: Variant = Variant.Info
    @property({ type: String, attribute: "variant-style" }) variantStyle: VariantStyle = VariantStyle.Solid;
    @property({ type: Boolean }) block: boolean = true;

    static get styles() {
        return css`
            button {
                display: block;
                width: 100%;
                padding: var(--box-padding-medium);
                margin-bottom: var(--box-padding-medium);
                border-radius: var(--box-border-radius-round);
                border-width: 3px;
                border-style: solid;
                font-family: var(--font-family);
                font-size: var(--font-size-text-medium);
                line-height: 0;
                color: var(--color-white);
                cursor: pointer;
            }

            button:active {
                opacity: 0.8;
            }

            button.outline {
                background-color: transparent;
            }

            .inline {
                display: inline-block;
                width: auto;
            }

            .info {
                background-color: var(--color-info-base);
                border-color: var(--color-info-dark);
            }
            .info.outline {
                color: var(--color-info-base);
                border-color: var(--color-info-base);
            }
            .success {
                background-color: var(--color-success-base);
                border-color: var(--color-success-dark);
            }
            .success.outline {
                color: var(--color-success-base);
                border-color: var(--color-success-base);
            }
            .error {
                background-color: var(--color-error-base);
                border-color: var(--color-error-dark);
            }
            .error.outline {
                color: var(--color-error-base);
                border-color: var(--color-error-base);
            }
            .warning {
                background-color: var(--color-warning-base);
                border-color: var(--color-warning-dark);
                color: var(--color-warning-dark);
            }
            .warning.outline {
                color: var(--color-warning-base);
                border-color: var(--color-warning-base);
            }
        `
    }

    private get _classMap() {
        return {
            [this.variant]: true,
            [this.variantStyle]: true,
            inline: !this.block,
            block: this.block
        }
    }

    render() {
        return html`
            <button class=${classMap(this._classMap)} @click=${this.click}>
                <slot></slot>
            </button>
        `
    }
}