/* eslint-disable import/no-duplicates */
import { html, fixture, expect } from '@open-wc/testing';
import sinon from 'sinon';

import { TokioButton } from '../../src/form-elements/button.js';
import '../../src/form-elements/button.js';

describe('components/form-elements', () => {
  describe('button', () => {
    let element: TokioButton;
    const clickHandler = sinon.fake();

    beforeEach(async () => {
      element = await fixture(
        html`<tokio-button @click=${() => clickHandler()}
          >My button</tokio-button
        >`
      );
    });

    it('should exist', () => {
      expect(element).to.exist;
    });

    it('has a static shadow dom', () => {
      expect(element).shadowDom.to.equal(
        '<button class="info"><slot></slot></button'
      );
    });

    it('has a slot with text: My button', () => {
      expect(element).lightDom.to.be.equal('My button');
    });

    it('has by default, variant info, not disabled, not outlined & not block', () => {
      expect(element.variant).to.equal('info');
      expect(element.type).to.equal('button');
      expect(element.disabled).to.equal(false);
      expect(element.outlined).to.equal(false);
      expect(element.loading).to.equal(false);
      expect(element.block).to.equal(false);
    });

    it('should bubble up click event', () => {
      element.shadowRoot?.querySelector('button')?.click();
      expect(clickHandler).to.be.calledOnce;
    });
  });

  describe('button', () => {
    let element: TokioButton;

    beforeEach(async () => {
      element = await fixture(html`<tokio-button>My button</tokio-button>`);
    });

    it('should have class info as default', () => {
      const button = element.shadowRoot?.querySelector('button');
      expect(button?.classList.contains('info')).to.equal(true);
    });

    it('should have class error when variant is error', async () => {
      element.variant = 'error';
      await element.updateComplete;
      const button = element.shadowRoot?.querySelector('button');
      expect(button?.classList.contains('error')).to.equal(true);
    });

    it('should have class success when variant is success', async () => {
      element.variant = 'success';
      await element.updateComplete;
      const button = element.shadowRoot?.querySelector('button');
      expect(button?.classList.contains('success')).to.equal(true);
    });

    it('should have class warning when variant is warning', async () => {
      element.variant = 'warning';
      await element.updateComplete;
      const button = element.shadowRoot?.querySelector('button');
      expect(button?.classList.contains('warning')).to.equal(true);
    });
  });

  describe('button/loading', () => {
    let element: TokioButton;
    const clickHandler = sinon.fake();

    beforeEach(async () => {
      element = await fixture(
        html`<tokio-button ?loading=${true} @click=${() => clickHandler()}
          >My button</tokio-button
        >`
      );
    });

    it('has property "loading" set to true', () => {
      expect(element.hasAttribute('loading')).to.equal(true);
      expect(element.loading).to.equal(true);
    });

    it('has text Loading... instead of slotted value', () => {
      expect(element).shadowDom.to.equal(
        '<button class="info">Loading...</button>'
      );
    });

    it('should prevent event bubbling when clicked', async () => {
      element.shadowRoot?.querySelector('button')?.click();

      expect(clickHandler).to.not.be.called;
    });
  });

  describe('button/disabled', () => {
    let element: TokioButton;
    const clickHandler = sinon.fake();

    beforeEach(async () => {
      element = await fixture(
        html`<tokio-button ?disabled=${true} @click=${() => clickHandler()}
          >My button</tokio-button
        >`
      );
    });

    it('has property "disabled" set to true', () => {
      expect(element.hasAttribute('disabled')).to.equal(true);
      expect(element.disabled).to.equal(true);
    });

    it('has text Loading... instead of slotted value', () => {
      expect(element).shadowDom.to.equal(
        '<button class="info"><slot></slot></button>'
      );
    });

    it('should prevent event bubbling when clicked', async () => {
      element.shadowRoot?.querySelector('button')?.click();

      expect(clickHandler).to.not.be.called;
    });
  });

  describe('button/link', () => {
    let element: TokioButton;

    beforeEach(async () => {
      element = await fixture(
        html`<tokio-button href="https://github.com/Nopzen/Tokio"
          >My button</tokio-button
        >`
      );
    });

    it('when given a href, the button should transform to a a tag with given href', () => {
      expect(element.hasAttribute('href'));
      expect(element).shadowDom.to.equal(
        '<a href="https://github.com/Nopzen/Tokio" class="info"><slot></slot></a>'
      );
    });
  });
});
