/* eslint-disable import/no-extraneous-dependencies */
import { html, TemplateResult } from 'lit-html';
import '../../src/form-elements/button.js';

export default {
  title: 'tokio-button',
  component: 'tokio-button',
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
    disabled: {
      control: {
        type: 'boolean',
      },
    },
    outlined: {
      control: {
        type: 'boolean',
      },
    },
    loading: {
      control: {
        type: 'boolean',
      },
    },
    block: {
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
  href?: string;
  loading?: boolean;
  outlined?: boolean;
  disabled?: boolean;
  block?: boolean;
}

const Template: Story<ArgTypes> = ({
  label = 'Tokio button',
  variant = 'info',
  block = false,
  disabled = false,
  outlined = false,
  loading = false,
  href = undefined,
}: ArgTypes) => html`
  <div style="width: 300px; text-align: center;">
    <tokio-button
      .variant=${variant}
      .href=${href}
      ?block=${block}
      ?disabled=${disabled}
      ?outlined=${outlined}
      ?loading=${loading}
      @click=${() => alert('Clicked button')}
    >
      ${label}
    </tokio-button>
  </div>
`;

export const Default = Template.bind({});
Default.args = {};

export const Outlined = Template.bind({});
Outlined.args = {
  outlined: true,
};

export const Loading = Template.bind({});
Loading.args = {
  loading: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

export const ButtonAsLink = Template.bind({});
ButtonAsLink.args = {
  href: 'https://github.com/Nopzen/Tokio',
};
