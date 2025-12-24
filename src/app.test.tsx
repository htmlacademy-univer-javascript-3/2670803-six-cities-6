import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, vi, beforeEach } from 'vitest';
import App from './App';
import * as storeHooks from './components/store';
import { AuthorizationStatus, UserData } from './api/types/types';
import { RootState } from './components/store';

vi.mock('./components/store', () => ({
  useAppSelector: vi.fn(),
  useAppDispatch: () => vi.fn(),
}));

const mockSelector = (state: Partial<RootState>) =>
  (storeHooks.useAppSelector as unknown as jest.MockedFunction<
    (selector: (state: RootState) => unknown) => unknown
  >).mockImplementation((selector) => selector(state as RootState));

describe('App routing', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders Spinner when authorizationStatus is Unknown', () => {
    mockSelector({
      user: { authorizationStatus: AuthorizationStatus.Unknown, user: null },
      offer: {
        city: '',
        offers: [],
        offerDetails: null,
        nearbyOffers: [],
        error: null,
      },
    });

    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/checking authentication/i)).toBeInTheDocument();
  });

  it('renders MainPage at "/" for NoAuth', () => {
    mockSelector({
      user: { authorizationStatus: AuthorizationStatus.NoAuth, user: null },
      offer: {
        city: 'Paris',
        offers: [],
        offerDetails: null,
        nearbyOffers: [],
        error: null,
      },
    });

    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    const main = screen.getByTestId('main-empty');
    expect(within(main).getByText(/Paris/i)).toBeInTheDocument();
  });

  it('renders LoginPage at "/login" for NoAuth', () => {
    mockSelector({
      user: { authorizationStatus: AuthorizationStatus.NoAuth, user: null },
      offer: {
        city: '',
        offers: [],
        offerDetails: null,
        nearbyOffers: [],
        error: null,
      },
    });

    render(
      <MemoryRouter initialEntries={['/login']}>
        <App />
      </MemoryRouter>
    );

    const heading = screen.getByRole('heading', { name: /sign in/i });
    expect(heading).toBeInTheDocument();

    const button = screen.getByRole('button', { name: /sign in/i });
    expect(button).toBeInTheDocument();
  });

  it('redirects from "/login" to "/" when Auth', () => {
    const mockUser: UserData = {
      name: 'Test',
      email: 'test@example.com',
      avatarUrl: '/img/avatar.jpg',
      isPro: false,
    };

    mockSelector({
      user: { authorizationStatus: AuthorizationStatus.Auth, user: mockUser },
      offer: {
        city: 'Paris',
        offers: [],
        offerDetails: null,
        nearbyOffers: [],
        error: null,
      },
    });

    render(
      <MemoryRouter initialEntries={['/login']}>
        <App />
      </MemoryRouter>
    );

    const main = screen.getByTestId('main-empty');
    expect(within(main).getByText(/Paris/i)).toBeInTheDocument();
  });

  it('renders NotFoundPage on unknown route', () => {
    mockSelector({
      user: { authorizationStatus: AuthorizationStatus.NoAuth, user: null },
      offer: {
        city: '',
        offers: [],
        offerDetails: null,
        nearbyOffers: [],
        error: null,
      },
    });

    render(
      <MemoryRouter initialEntries={['/unknown-route']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/Упс! Страница не найдена/i)).toBeInTheDocument();
  });
});
