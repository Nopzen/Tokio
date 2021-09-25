import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators/custom-element.js"
import { property } from "lit/decorators/property.js"
import { classMap } from 'lit/directives/class-map.js';

import { FontWeight, HeaderSize } from "../../@types/enums";

@customElement("tokio-header")
export class TokioHeader extends LitElement {
    @property({ type: String }) size: HeaderSize = HeaderSize.Medium
    @property({ type: String }) weight: FontWeight = FontWeight.Normal

    static get styles() {
        return css`
            
            slot {
                display: block;
            }

            .large {
                font-size: var(--font-size-header-large);
                line-height: var(--line-height-header-large);
                margin-bottom: calc(var(--line-height-header-large) / 2);
            }
            
            .medium {
                font-size: var(--font-size-header-medium);
                line-height: var(--line-height-header-medium);
                margin-bottom: calc(var(--line-height-header-medium) / 2);
            }
            
            .small {
                font-size: var(--font-size-header-small);
                line-height: var(--line-height-header-small);
                margin-bottom: calc(var(--line-height-header-small) / 2);
            }
            
            .xsmall {
                font-size: var(--font-size-header-xsmall);
                line-height: var(--line-height-header-xsmall);
                margin-bottom: calc(var(--line-height-header-xsmall) / 2);
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