import type { Meta, StoryObj } from '@storybook/react';
import FavoritesEmpty from './favorite-empty';

const meta = {
  title: 'Components/FavoritesEmpty',
  component: FavoritesEmpty,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FavoritesEmpty>;

export default meta;
type Story = StoryObj<typeof FavoritesEmpty>;

export const Default: Story = {};

export const OnPage: Story = {
  decorators: [
    (Story) => (
      <div style={{
        width: '800px',
        padding: '40px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px'
      }}
      >
        <Story />
      </div>
    ),
  ],
};
