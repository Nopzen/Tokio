import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators/custom-element.js"
import { property } from "lit/decorators/property.js"
import { classMap } from "lit/directives/class-map.js";

@customElement('tokio-input')
export class TokioInput extends LitElement {

    @property({ type: String }) private _value: string = "";

    constructor(){
        super()

        this._handleChange = this._handleChange.bind(this);
    }

    static get styles() {
        return css`
            .input-container {
                position: relative;
            }

            input {
                position: relative;
                width: 100%;
                z-index: 1;
                border-radius: var(--box-border-radius-round);
                padding: var(--box-padding-medium) var(--box-padding-medium) calc(var(--box-padding-small) / 2);
                border: none;
                margin-bottom: var(--box-padding-small)
            }
            
            input:focus {
                outline: none;
            }

            input:not(.empty) ~ label {
                transform: scale(.6) translate(calc((var(--box-padding-small) * -1) + 4px), calc((var(--box-padding-medium) * -1) - 2px));
                transition: transform .2s ease-in-out;
            }
            
            label {
                position: absolute;
                font-size: var(--font-size-text-small);
                z-index: 2;
                top: calc(var(--box-padding-xsmall) / 2);
                left: var(--box-padding-small);
            }
            
            input:focus ~ label,
            input:focus ~ label {
                transform: scale(.6) translate(calc((var(--box-padding-large) * -1)), calc((var(--box-padding-medium) * -1) - 2px));
                transition: transform .2s ease-in-out;
            }
        `    
    }

    private get _classMap() {
        return {
            "empty": this._value.length === 0,
        }
    }

    private _handleChange(e: any) {
        this._value = e.target.value
    }

    render() {
        return html`
            <div class="input-container">
                <input id="input" class=${classMap(this._classMap)} @keydown=${this._handleChange}/>
                <label for="input">
                    <slot>Input field</slot>
                </label>
            </div>
        `
    }
}