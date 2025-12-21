import { describe, it, expect, vi, beforeEach} from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from './header';
import { MemoryRouter } from 'react-router-dom';
import { AuthorizationStatus } from '../../api/types/types';

describe('Header component', () => {
  const mockOnSignOut = vi.fn();
  const mockUser = { email: 'test@example.com', avatarUrl: 'avatar.png' };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders logo and Sign in link when not authorized', () => {
    render(
      <MemoryRouter>
        <Header authorizationStatus={AuthorizationStatus.NoAuth} user={null} />
      </MemoryRouter>
    );

    expect(screen.getByAltText('6 cities logo')).toBeInTheDocument();
    expect(screen.getByText('Sign in')).toBeInTheDocument();
    expect(screen.queryByText('Sign out')).toBeNull();
  });

  it('renders user info and Sign out when authorized', async () => {
    render(
      <MemoryRouter>
        <Header
          authorizationStatus={AuthorizationStatus.Auth}
          user={mockUser}
          favoriteCount={3}
          onSignOut={mockOnSignOut}
        />
      </MemoryRouter>
    );

    expect(screen.getByText(mockUser.email)).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    const signOutButton = screen.getByText('Sign out');
    expect(signOutButton).toBeInTheDocument();

    await userEvent.click(signOutButton);
    expect(mockOnSignOut).toHaveBeenCalledTimes(1);
  });

  it('does not render auth links if hideAuthLinks is true', () => {
    render(
      <MemoryRouter>
        <Header
          authorizationStatus={AuthorizationStatus.Auth}
          user={mockUser}
          hideAuthLinks
        />
      </MemoryRouter>
    );

    expect(screen.queryByText('Sign out')).toBeNull();
    expect(screen.queryByText(mockUser.email)).toBeNull();
  });

  it('renders avatar image if avatarUrl is provided', () => {
    render(
      <MemoryRouter>
        <Header
          authorizationStatus={AuthorizationStatus.Auth}
          user={mockUser}
        />
      </MemoryRouter>
    );

    const avatarImg = screen.getByAltText(mockUser.email);
    expect(avatarImg).toBeInTheDocument();
    expect(avatarImg).toHaveAttribute('src', 'avatar.png');
  });

  it('does not render favorite count if it is 0', () => {
    render(
      <MemoryRouter>
        <Header
          authorizationStatus={AuthorizationStatus.Auth}
          user={mockUser}
          favoriteCount={0}
        />
      </MemoryRouter>
    );

    expect(screen.queryByText('0')).toBeNull();
  });
});
