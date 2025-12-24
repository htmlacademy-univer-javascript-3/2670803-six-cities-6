import type { Meta, StoryObj } from '@storybook/react';
import MainEmpty from './main-empty';

const meta = {
  title: 'Components/MainEmpty',
  component: MainEmpty,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    city: {
      control: 'text',
    },
  },
  args: {
    city: 'Paris',
  },
} satisfies Meta<typeof MainEmpty>;

export default meta;
type Story = StoryObj<typeof MainEmpty>;

export const Paris: Story = {};

export const Amsterdam: Story = {
  args: {
    city: 'Amsterdam',
  },
};

export const Hamburg: Story = {
  args: {
    city: 'Hamburg',
  },
};
