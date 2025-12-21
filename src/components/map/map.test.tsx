import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import OfferMap from './map';
import { Offer } from '../../api/types/types';
import { ReactNode } from 'react';

vi.mock('react-leaflet', async () => {
  const actual = await vi.importActual<typeof import('react-leaflet')>('react-leaflet');
  return {
    ...actual,
    MapContainer: ({ children }: { children: ReactNode }) => <div data-testid="map-container">{children}</div>,
    TileLayer: () => <div data-testid="tile-layer" />,
    Marker: ({ children }: { children: ReactNode }) => <div data-testid="marker">{children}</div>,
    Popup: ({ children }: { children: ReactNode }) => <div data-testid="popup">{children}</div>,
  };
});

vi.mock('../map-updater/map-updater', () => ({
  default: () => <div data-testid="map-updater" />,
}));

describe('OfferMap component', () => {
  const mockOffers: Offer[] = [
    {
      id: '1',
      title: 'Offer 1',
      type: 'apartment',
      price: 100,
      city: {
        name: 'City A',
        location: { latitude: 10, longitude: 20, zoom: 13 },
      },
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
      city: {
        name: 'City B',
        location: { latitude: 11, longitude: 21, zoom: 13 },
      },
      location: { latitude: 11, longitude: 21, zoom: 13 },
      isFavorite: true,
      isPremium: true,
      rating: 4.0,
    },
    {
      id: '3',
      title: 'Offer 3',
      type: 'room',
      price: 50,
      city: {
        name: 'City C',
        location: { latitude: 12, longitude: 22, zoom: 13 },
      },
      location: { latitude: 12, longitude: 22, zoom: 13 },
      isFavorite: false,
      isPremium: false,
      rating: 3.5,
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders map container', () => {
    render(<OfferMap offers={mockOffers} />);
    expect(screen.getByTestId('map-container')).toBeInTheDocument();
  });

  it('renders markers for all offers', () => {
    render(<OfferMap offers={mockOffers} />);
    const markers = screen.getAllByTestId('marker');
    expect(markers.length).toBe(mockOffers.length);
  });

  it('renders popups with offer titles', () => {
    render(<OfferMap offers={mockOffers} />);
    mockOffers.forEach((offer) => {
      expect(screen.getByText(offer.title)).toBeInTheDocument();
    });
  });

  it('renders MapUpdater component', () => {
    render(<OfferMap offers={mockOffers} />);
    expect(screen.getByTestId('map-updater')).toBeInTheDocument();
  });

  it('shows fallback text if no location data', () => {
    render(<OfferMap offers={[]} />);
    expect(screen.getByText('No location data')).toBeInTheDocument();
  });

  it('limits offers to 4 in offer mode and sets activeOfferId', () => {
    const manyOffers = [
      { id: '1', title: 'O1', location: { latitude: 2, longitude: 3, zoom: 10 } },
      { id: '2', title: 'O2', location: { latitude: 5, longitude: 4, zoom: 10 } },
      { id: '3', title: 'O3', location: { latitude: 5, longitude: 4, zoom: 10 } },
      { id: '4', title: 'O4', location: { latitude: 6, longitude: 7, zoom: 10 } },
      { id: '5', title: 'O5', location: { latitude: 3, longitude: 3, zoom: 10 } },
    ] as Offer[];

    render(<OfferMap offers={manyOffers} mode="offer" />);
    const markers = screen.getAllByTestId('marker');
    expect(markers.length).toBe(4);
    expect(screen.getByText('O1')).toBeInTheDocument();
  });
});
