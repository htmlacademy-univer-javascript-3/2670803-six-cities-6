import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import MapUpdater from './map-updater';
import { Offer } from '../../api/types/types';

const mockSetView = vi.fn();
vi.mock('react-leaflet', () => ({
  useMap: () => ({
    setView: mockSetView,
  }),
}));

describe('MapUpdater component', () => {
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
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls map.setView with the first offer location', () => {
    render(<MapUpdater offers={mockOffers} />);
    expect(mockSetView).toHaveBeenCalledTimes(1);
    expect(mockSetView).toHaveBeenCalledWith([10, 20], 13);
  });

  it('does not call map.setView if offers array is empty', () => {
    render(<MapUpdater offers={[]} />);
    expect(mockSetView).not.toHaveBeenCalled();
  });
});
