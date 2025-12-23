import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import PrivateRoute from './private-route';
import { AuthorizationStatus } from '../../api/types/types';
import { useAppSelector } from '../store';

vi.mock('../store', () => ({
  useAppSelector: vi.fn(),
}));

describe('PrivateRoute', () => {
  const mockUseAppSelector = vi.mocked(useAppSelector);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders outlet when user is authorized', () => {
    mockUseAppSelector.mockReturnValue(AuthorizationStatus.Auth);

    render(
      <MemoryRouter initialEntries={['/private']}>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/private" element={<h1>Private content</h1>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Private content')).toBeInTheDocument();
  });

  it('redirects to login when user is not authorized', () => {
    mockUseAppSelector.mockReturnValue(AuthorizationStatus.NoAuth);

    render(
      <MemoryRouter initialEntries={['/private']}>
        <Routes>
          <Route path="/login" element={<h1>Login page</h1>} />
          <Route element={<PrivateRoute />}>
            <Route path="/private" element={<h1>Private content</h1>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Login page')).toBeInTheDocument();
  });
});
