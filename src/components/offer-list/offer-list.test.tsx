import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import OfferList from './offer-list';
import { Offer } from '../../api/types/types';
import { MouseEventHandler } from 'react';

interface MockPlaceCardProps {
  offer: Offer;
  onMouseEnter?: MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: MouseEventHandler<HTMLDivElement>;
}

vi.mock('../../hocs/memoized-component/memoized-component', () => ({
  MemoizedPlaceCard: ({ offer, onMouseEnter, onMouseLeave }: MockPlaceCardProps) => (
    <div
      data-testid={`place-card-${offer.id}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {offer.title}
    </div>
  ),
}));

describe('OfferList component', () => {
  const mockOffers: Offer[] = [
    {
      id: '1',
      title: 'Offer 1',
      type: 'apartment',
      price: 100,
      city: { name: 'City A', location: { latitude: 10, longitude: 20, zoom: 13 } },
      location: { latitude: 10, longitude: 20, zoom: 13 },
      isFavorite: false,
      isPremium: false,
      rating: 4.5,
    },
    {
      id: '2',
      title: 'Offer 2',
      type: 'house',
      price: 200,
      city: { name: 'City B', location: { latitude: 11, longitude: 21, zoom: 13 } },
      location: { latitude: 11, longitude: 21, zoom: 13 },
      isFavorite: true,
      isPremium: true,
      rating: 4.0,
    },
  ];

  const mockOnOfferHover = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all offers', () => {
    render(<OfferList offers={mockOffers} onOfferHover={mockOnOfferHover} />);
    mockOffers.forEach((offer) => {
      expect(screen.getByText(offer.title)).toBeInTheDocument();
    });
  });

  it('calls onOfferHover with offer id on mouse enter', async () => {
    render(<OfferList offers={mockOffers} onOfferHover={mockOnOfferHover} />);
    const card = screen.getByTestId('place-card-1');
    await userEvent.hover(card);
    expect(mockOnOfferHover).toHaveBeenCalledWith('1');
  });

  it('calls onOfferHover with null on mouse leave', async () => {
    render(<OfferList offers={mockOffers} onOfferHover={mockOnOfferHover} />);
    const card = screen.getByTestId('place-card-1');
    await userEvent.unhover(card);
    expect(mockOnOfferHover).toHaveBeenCalledWith(null);
  });

  it('works without onOfferHover prop', async () => {
    render(<OfferList offers={mockOffers} />);
    const card = screen.getByTestId('place-card-1');
    await userEvent.hover(card);
    await userEvent.unhover(card);
  });
});
