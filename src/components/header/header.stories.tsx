import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Header from './header';
import { MemoryRouter } from 'react-router-dom';
import { AuthorizationStatus } from '../../api/types/types';

const meta = {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    authorizationStatus: {
      control: 'select',
      options: Object.values(AuthorizationStatus),
    },
    favoriteCount: {
      control: 'number',
    },
    hideAuthLinks: {
      control: 'boolean',
    },
    onSignOut: {
      action: 'signedOut',
    },
  },
  args: {
    authorizationStatus: AuthorizationStatus.Auth,
    user: {
      email: 'user@example.com',
      avatarUrl: 'https://i.pravatar.cc/50',
    },
    favoriteCount: 3,
    onSignOut: fn(),
    hideAuthLinks: false,
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof Header>;

export const Authorized: Story = {};

export const Unauthorized: Story = {
  args: {
    authorizationStatus: AuthorizationStatus.NoAuth,
    user: null,
    favoriteCount: 0,
  },
};

export const WithoutAuthLinks: Story = {
  args: {
    hideAuthLinks: true,
  },
};

export const NoFavorites: Story = {
  args: {
    favoriteCount: 0,
  },
};

export const ManyFavorites: Story = {
  args: {
    favoriteCount: 12,
  },
};
