import { describe, it, vi, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import PlaceCard from './place-card';
import { AuthorizationStatus, Offer } from '../../api/types/types';
import * as reduxHooks from '../store';
import type { AppDispatch } from '../store';
import { BrowserRouter } from 'react-router-dom';
import * as favoritesThunks from '../store/favorites/favorites-thunks';

const mockOffer: Offer = {
  id: '1',
  title: 'Test Place',
  price: 100,
  type: 'apartment',
  rating: 4,
  previewImage: 'test.jpg',
  isFavorite: false,
  isPremium: true,
  city: { name: 'Test City', location: { latitude: 0, longitude: 0, zoom: 1 } },
  location: { latitude: 0, longitude: 0, zoom: 1 }
};

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('PlaceCard', () => {
  let mockDispatch: AppDispatch;

  beforeEach(() => {
    mockDispatch = vi.fn() as unknown as AppDispatch;
    vi.spyOn(reduxHooks, 'useAppDispatch').mockReturnValue(mockDispatch);
    vi.spyOn(reduxHooks, 'useAppSelector').mockReturnValue(AuthorizationStatus.Auth);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render with correct data', () => {
    render(
      <BrowserRouter>
        <PlaceCard offer={mockOffer} onMouseEnter={vi.fn()} onMouseLeave={vi.fn()} />
      </BrowserRouter>
    );

    expect(screen.getByText('Premium')).toBeInTheDocument();
    expect(screen.getByText('€100')).toBeInTheDocument();
    expect(screen.getByText('Test Place')).toBeInTheDocument();
    expect(screen.getByText('apartment')).toBeInTheDocument();
  });

  it('should call toggleFavoriteOffer when bookmark button is clicked if user is authorized', () => {
    const toggleFavoriteOfferMock = vi.spyOn(favoritesThunks, 'toggleFavoriteOffer');

    render(
      <BrowserRouter>
        <PlaceCard offer={mockOffer} onMouseEnter={vi.fn()} onMouseLeave={vi.fn()} />
      </BrowserRouter>
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(toggleFavoriteOfferMock).toHaveBeenCalledWith({
      offerId: mockOffer.id,
      isFavorite: mockOffer.isFavorite,
    });
  });

  it('should redirect to /login if user is not authorized', () => {
    vi.spyOn(reduxHooks, 'useAppSelector').mockReturnValue(AuthorizationStatus.NoAuth);

    render(
      <BrowserRouter>
        <PlaceCard offer={mockOffer} onMouseEnter={vi.fn()} onMouseLeave={vi.fn()} />
      </BrowserRouter>
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });

  it('should apply active class when isActive prop is true', () => {
    render(
      <BrowserRouter>
        <PlaceCard offer={mockOffer} onMouseEnter={vi.fn()} onMouseLeave={vi.fn()} isActive />
      </BrowserRouter>
    );

    const article = screen.getByRole('article');
    expect(article).toHaveClass('place-card--active');
  });

  it('should call onMouseEnter and onMouseLeave handlers', () => {
    const handleMouseEnter = vi.fn();
    const handleMouseLeave = vi.fn();

    render(
      <BrowserRouter>
        <PlaceCard
          offer={mockOffer}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      </BrowserRouter>
    );

    const article = screen.getByRole('article');
    fireEvent.mouseEnter(article);
    expect(handleMouseEnter).toHaveBeenCalledTimes(1);

    fireEvent.mouseLeave(article);
    expect(handleMouseLeave).toHaveBeenCalledTimes(1);
  });
});
