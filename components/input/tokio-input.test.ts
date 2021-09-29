import chai, { assert, expect } from "@esm-bundle/chai"
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';

chai.use(chaiDomDiff);

import "./tokio-input.js"
import { TokioInput } from "./tokio-input"

describe("<tokio-input>", () => {
    
    let node: TokioInput;

    beforeEach(async () => {
        node = <TokioInput>document.createElement("tokio-input")
        document.body.appendChild(node)

        await node.updateComplete
    });

    afterEach(async () => {
        node.remove();
    })

    it("should initial render the component, and contain initial values", async () => {
        const el = document.querySelector("tokio-input")
        const label = el?.shadowRoot?.querySelector("label")
        const input = el?.shadowRoot?.querySelector("input")
        const feedback = el?.shadowRoot?.querySelector("tokio-text")

        assert.isNotNull(el)
        assert.isNotNull(label)
        assert.isNotNull(input)
        assert.isNull(feedback)

        expect(label?.innerText).to.be.equal("Input field")
        
    })
    
    it("should render, and contain label with given value", async () => {
        node.label = "foo"
        await node.updateComplete

        const el = document.querySelector("tokio-input")
        const label = el?.shadowRoot?.querySelector("label")

        expect(label?.innerText).to.be.equal("foo")
    })
    
    it("should render, feedback item if user provides string to component slot", async () => {
        node.feedback = "feedback text";
        await node.updateComplete

        const el = document.querySelector("tokio-input")
        const feedback = el?.shadowRoot?.querySelector("tokio-text")

        expect(feedback).lightDom.to.equal("feedback text")
    })
    
    it("should trigger a custom change event, when input register key down", async () => {
        let changeEventEmited = false;
        node.addEventListener("change", () => { changeEventEmited = true })

        const el = document.querySelector("tokio-input")
        const input = el?.shadowRoot?.querySelector("input")

        input?.dispatchEvent(new KeyboardEvent("keydown", { key: '1' }))

        assert.equal(changeEventEmited, true)
    })
})