// MapUpdater.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import MapUpdater from './map-updater';
import { Offer } from '../../api/types/types';

const meta: Meta<typeof MapUpdater> = {
  title: 'Components/MapUpdater',
  component: MapUpdater,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MapUpdater>;

// Создаем утилитарный тип для моков
type MockOffer = {
  id: string;
  title: string;
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
} & Partial<Omit<Offer, 'id' | 'title' | 'location'>>;

// Хелпер для создания моковых данных
const createMockOffer = (id: string, title: string, lat: number, lng: number): MockOffer => ({
  id,
  title,
  location: { latitude: lat, longitude: lng, zoom: 12 },
  type: 'apartment',
  price: 100 + Math.floor(Math.random() * 200),
  city: {
    name: 'Amsterdam',
    location: { latitude: 52.37454, longitude: 4.897976, zoom: 13 },
  },
  isFavorite: Math.random() > 0.5,
  isPremium: Math.random() > 0.7,
  rating: 3.5 + Math.random() * 1.5,
  previewImage: `https://example.com/image-${id}.jpg`,
});

const mockOffers: MockOffer[] = [
  createMockOffer('1', 'Beautiful apartment', 52.390955, 4.853096),
  createMockOffer('2', 'Wood and stone place', 52.360955, 4.853096),
  createMockOffer('3', 'Canal View', 52.380955, 4.879309),
];

const MapInfo = ({ offers }: { offers: MockOffer[] }) => (
  <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
    <h3 style={{ marginBottom: '16px' }}>MapUpdater Demo</h3>
    <p style={{ marginBottom: '8px' }}>
      Компонент обновляет центр карты на основе первого предложения
    </p>
    <p style={{ marginBottom: '8px' }}>
      <strong>Количество предложений:</strong> {offers.length}
    </p>
    {offers[0] && (
      <p style={{ marginBottom: '8px' }}>
        <strong>Центр карты будет установлен на:</strong><br />
        Широта: {offers[0].location.latitude.toFixed(6)}<br />
        Долгота: {offers[0].location.longitude.toFixed(6)}<br />
        Зум: {offers[0].location.zoom}
      </p>
    )}
    {offers.length > 1 && (
      <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
        <strong>Все предложения:</strong>
        <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
          {offers.slice(0, 5).map((offer) => (
            <li key={offer.id} style={{ marginBottom: '4px' }}>
              {offer.title} ({offer.location.latitude.toFixed(4)}, {offer.location.longitude.toFixed(4)})
            </li>
          ))}
          {offers.length > 5 && <li>... и еще {offers.length - 5} предложений</li>}
        </ul>
      </div>
    )}
  </div>
);

export const Default: Story = {
  args: {
    offers: mockOffers as Offer[],
  },
  render: (args) => <MapInfo offers={args.offers as MockOffer[]} />,
};

export const SingleOffer: Story = {
  args: {
    offers: [mockOffers[0]] as Offer[],
  },
  render: (args) => <MapInfo offers={args.offers as MockOffer[]} />,
};

export const Empty: Story = {
  args: {
    offers: [] as Offer[],
  },
  render: (args) => <MapInfo offers={args.offers as MockOffer[]} />,
};

export const DifferentCities: Story = {
  args: {
    offers: [
      createMockOffer('paris-1', 'Paris Apartment', 48.8566, 2.3522),
      createMockOffer('london-1', 'London Flat', 51.5074, -0.1278),
      createMockOffer('berlin-1', 'Berlin Loft', 52.5200, 13.4050),
    ] as Offer[],
  },
  render: (args) => <MapInfo offers={args.offers as MockOffer[]} />,
};

export const ManyOffers: Story = {
  args: {
    offers: Array.from({ length: 10 }, (_, i) =>
      createMockOffer(
        `offer-${i}`,
        `Apartment ${i + 1}`,
        52.5200 + (Math.random() - 0.5) * 0.1,
        13.4050 + (Math.random() - 0.5) * 0.1
      )
    ) as Offer[],
  },
  render: (args) => <MapInfo offers={args.offers as MockOffer[]} />,
};

export const RandomOffers: Story = {
  args: {
    offers: Array.from({ length: 7 }, (_, i) =>
      createMockOffer(
        `random-${i}`,
        `Random Place ${i + 1}`,
        40 + Math.random() * 20,
        -10 + Math.random() * 30
      )
    ) as Offer[],
  },
  render: (args) => <MapInfo offers={args.offers as MockOffer[]} />,
};
