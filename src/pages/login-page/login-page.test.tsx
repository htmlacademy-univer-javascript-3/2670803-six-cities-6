import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import LoginPage from './login-page';
import * as storeHooks from '../../components/store';
import * as userThunks from '../../components/store/user/user-thunks';
import { AuthorizationStatus } from '../../api/types/types';
import { AppDispatch } from '../../components/store';

type DispatchResult = {
  unwrap: () => Promise<void>;
};

describe('LoginPage', () => {
  const mockDispatch = vi.fn<[], DispatchResult>(() => ({
    unwrap: () => Promise.resolve(),
  }));

  beforeEach(() => {
    mockDispatch.mockClear();
    vi.spyOn(storeHooks, 'useAppDispatch').mockReturnValue(
    mockDispatch as unknown as AppDispatch
    );
  });

  it('renders login form', () => {
    vi.spyOn(storeHooks, 'useAppSelector').mockReturnValue({
      authorizationStatus: AuthorizationStatus.NoAuth,
      error: null,
    });

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument();
  });

  it('shows validation errors if fields are empty', async () => {
    vi.spyOn(storeHooks, 'useAppSelector').mockReturnValue({
      authorizationStatus: AuthorizationStatus.NoAuth,
      error: null,
    });

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Sign in' }));
    expect(
      await screen.findByText('Please enter email')
    ).toBeInTheDocument();
  });

  it('dispatches login thunk on valid form submit', async () => {
    const loginSpy = vi.spyOn(userThunks, 'login').mockImplementation(
      () =>
        (() => Promise.resolve()) as unknown as ReturnType<
          typeof userThunks.login
        >
    );

    vi.spyOn(storeHooks, 'useAppSelector').mockReturnValue({
      authorizationStatus: AuthorizationStatus.NoAuth,
      error: null,
    });

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'Password1' } });
    fireEvent.click(screen.getByRole('button', { name: 'Sign in' }));

    await waitFor(() => {
      expect(loginSpy).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'Password1',
      });
      expect(mockDispatch).toHaveBeenCalled();
    });
  });

  it('shows server error on failed login', async () => {
    mockDispatch.mockImplementation(() => ({
      unwrap: () => Promise.reject(new Error('error')),
    }));

    vi.spyOn(storeHooks, 'useAppSelector').mockReturnValue({
      authorizationStatus: AuthorizationStatus.NoAuth,
      error: null,
    });

    vi.spyOn(userThunks, 'login').mockImplementation(
      () =>
        (() => Promise.resolve()) as unknown as ReturnType<typeof userThunks.login>
    );

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'Password1' },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Sign in' }));

    expect(
      await screen.findByText('Login failed. Please try again.')
    ).toBeInTheDocument();
  });

});
