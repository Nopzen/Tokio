import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators/custom-element.js"
import { property } from "lit/decorators/property.js"
import { classMap } from 'lit/directives/class-map.js';

import { FontWeight, HeaderSize } from "../../@types/enums";

@customElement("tokio-text")
export class TokioText extends LitElement {
    @property({ type: String }) size: HeaderSize = HeaderSize.Medium
    @property({ type: String }) weight: FontWeight = FontWeight.Normal

    static get styles() {
        return css`
            slot {
                display: block;
            }

            .large {
                font-size: var(--font-size-text-large);
                line-height: var(--line-height-text-large);
                margin-bottom: calc(var(--line-height-text-large) / 2);
            }
            
            .medium {
                font-size: var(--font-size-text-medium);
                line-height: var(--line-height-text-medium);
                margin-bottom: calc(var(--line-height-text-medium) / 2);
            }
            
            .small {
                font-size: var(--font-size-text-small);
                line-height: var(--line-height-text-small);
                margin-bottom: calc(var(--line-height-text-small) / 2);
            }
            
            .xsmall {
                font-size: var(--font-size-text-xsmall);
                line-height: var(--line-height-text-xsmall);
                margin-bottom: calc(var(--line-height-text-xsmall) / 2);
            }

            .bold {
                font-weight: bold;
            }
        `
    }

    private get _classMap() {
        return {
            [this.size]: true,
            normal: this.weight === FontWeight.Normal,
            bold: this.weight === FontWeight.Bold
        }
    }

    render() {
        return html`<slot class=${classMap(this._classMap)}></slot>`
    }
}