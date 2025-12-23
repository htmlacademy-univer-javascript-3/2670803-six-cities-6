import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, vi, expect } from 'vitest';

import NotFoundPage from './not-found-page';
import { AuthorizationStatus } from '../../api/types/types';

vi.mock('../../components/memoized-component/memoized-component', () => ({
  MemoizedHeader: ({ onSignOut }: { onSignOut: () => void }) => (
    <div data-testid="header">
      <button onClick={onSignOut}>Sign Out</button>
    </div>
  ),
}));

vi.mock('../../components/footer/footer', () => ({
  default: () => <div data-testid="footer" />,
}));

describe('NotFoundPage', () => {
  const mockHandleSignOut = vi.fn();

  beforeEach(() => {
    mockHandleSignOut.mockReset();
  });

  it('renders 404 title and message', () => {
    render(
      <MemoryRouter>
        <NotFoundPage
          authorizationStatus={AuthorizationStatus.NoAuth}
          user={null}
          handleSignOut={mockHandleSignOut}
        />
      </MemoryRouter>
    );

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Упс! Страница не найдена')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Вернуться на главную' })).toBeInTheDocument();
  });

  it('renders header and footer', () => {
    render(
      <MemoryRouter>
        <NotFoundPage
          authorizationStatus={AuthorizationStatus.NoAuth}
          user={null}
          handleSignOut={mockHandleSignOut}
        />
      </MemoryRouter>
    );

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('calls handleSignOut when header button clicked', () => {
    render(
      <MemoryRouter>
        <NotFoundPage
          authorizationStatus={AuthorizationStatus.NoAuth}
          user={null}
          handleSignOut={mockHandleSignOut}
        />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Sign Out'));
    expect(mockHandleSignOut).toHaveBeenCalled();
  });
});
