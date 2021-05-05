/* eslint-disable import/no-extraneous-dependencies */
import { html, TemplateResult } from 'lit-html';
import '../src/alert.js';

export default {
  title: 'tokio-alert',
  component: 'tokio-alert',
  argTypes: {
    label: {
      control: {
        type: 'text',
      },
    },
    variant: {
      control: {
        type: 'select',
        options: ['info', 'success', 'error', 'warning'],
      },
    },
    closeable: {
      control: {
        type: 'boolean',
      },
    },
    outlined: {
      control: {
        type: 'boolean',
      },
    },
  },
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  label: string;
  variant: 'info' | 'success' | 'error' | 'warning';
  close?: () => void;
  closeable: boolean;
  outlined: boolean;
}

const Template: Story<ArgTypes> = ({
  label = 'I Am C-3PO, Human/Cyborg Relations. And You Are?',
  variant = 'info',
  closeable = false,
  outlined = false,
  close = () => alert('tokio-alert close callback called'),
}: ArgTypes) => html`
  <div style="width: 600px;">
    <tokio-alert
      ?outlined=${outlined}
      .variant=${variant}
      .close=${closeable ? close : undefined}
    >
      ${label}
    </tokio-alert>
  </div>
`;

export const Default = Template.bind({});
Default.args = {};

export const Outlined = Template.bind({});
Outlined.args = {
  outlined: true,
};

export const Closeable = Template.bind({});
Closeable.args = {
  closeable: true,
};
