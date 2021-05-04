/* eslint-disable import/no-duplicates */
import { html, fixture, expect } from '@open-wc/testing';
import sinon from 'sinon';

import { TokioAlert } from '../src/alert.js';
import '../src/alert.js';

describe('components', () => {
  describe('alert/default', () => {
    let element: TokioAlert;

    beforeEach(async () => {
      element = await fixture(html`<tokio-alert>Tokio alert</tokio-alert>`);
    });

    it('should exists', () => {
      expect(element).to.exist;
    });

    it('has a static shadow dom', () => {
      expect(element).shadowDom.to.equal(`
        <div class="info">
          <p><slot></slot></p>
        </div>
      `);
    });

    it('has a light dom', () => {
      expect(element).lightDom.to.equal('Tokio alert');
    });

    it('has default properties correctly initialized', () => {
      expect(element.variant).to.equal('info');
      expect(element.closeable).to.equal(undefined);
      expect(element.closeLabel).to.equal(undefined);
      expect(element.close).to.equal(undefined);
    });
  });

  describe('alert/closeable', () => {
    let element: TokioAlert;
    const closeAlert = sinon.fake();

    beforeEach(async () => {
      element = await fixture(
        html`<tokio-alert closeable .close=${() => closeAlert()}
          >Tokio alert</tokio-alert
        >`
      );
    });

    afterEach(() => {
      closeAlert.restore;
    });

    it('should have a shadow dom with a close button', () => {
      expect(element).shadowDom.to.equal(`
        <div class="info">
          <p><slot></slot></p>
          <button>X</button>
        </div>
      `);
    });

    it('should throw and error if close function is not present with closable property', async () => {
      // MISSING TEST: Investigate how to the thrown error when closeable is true and close property is undefined
    });

    it('should call close callback when clicking close button', () => {
      const button = <HTMLButtonElement>(
        element.shadowRoot?.querySelector('button')!
      );
      button.click();

      expect(closeAlert).to.been.calledOnce;
    });

    it('should should set aria-hidden="true" once this._closeHandler is invoked', async () => {
      const button = <HTMLButtonElement>(
        element.shadowRoot?.querySelector('button')!
      );
      button.click();

      expect(element.getAttribute('aria-hidden')).to.equal('true');
    });
  });

  describe('alert/variants', () => {
    let element: TokioAlert;

    beforeEach(async () => {
      element = await fixture(html`<tokio-alert>Tokio alert</tokio-alert>`);
    });

    it('should have class error when variant is error', async () => {
      element.variant = 'error';
      element.requestUpdate();
      await element.updateComplete;

      expect(element.variant).to.equal('error');
      expect(element).shadowDom.to.equal(`
        <div class="error">
          <p><slot></slot></p>
        </div>
      `);
    });

    it('should have class success when variant is success', async () => {
      element.variant = 'success';
      element.requestUpdate();
      await element.updateComplete;

      expect(element.variant).to.equal('success');
      expect(element).shadowDom.to.equal(`
        <div class="success">
          <p><slot></slot></p>
        </div>
      `);
    });

    it('should have class warning when variant is warning', async () => {
      element.variant = 'warning';
      element.requestUpdate();
      await element.updateComplete;

      expect(element.variant).to.equal('warning');
      expect(element).shadowDom.to.equal(`
        <div class="warning">
          <p><slot></slot></p>
        </div>
      `);
    });
  });
});
