import type { Meta, StoryObj } from '@storybook/react';
import Footer from './footer';
import { MemoryRouter } from 'react-router-dom';

const meta = {
  title: 'Components/Footer',
  component: Footer,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof Footer>;

export const Default: Story = {};
