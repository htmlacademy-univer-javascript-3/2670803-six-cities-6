import type { Meta, StoryObj } from '@storybook/react';
import OfferMap from './map';
import { Offer } from '../../api/types/types';

const meta = {
  title: 'Components/OfferMap',
  component: OfferMap,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: 'select',
      options: ['default', 'offer'],
      description: 'Режим отображения карты',
    },
    activeOfferId: {
      control: 'text',
      description: 'ID активного предложения',
    },
  },
} satisfies Meta<typeof OfferMap>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockOffers: Offer[] = [
  {
    id: '1',
    title: 'Beautiful & luxurious apartment at great location',
    type: 'apartment',
    price: 120,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13,
      },
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 12,
    },
    isFavorite: true,
    isPremium: true,
    rating: 4.8,
    previewImage: 'https://example.com/image1.jpg',
  },
  {
    id: '2',
    title: 'Wood and stone place',
    type: 'room',
    price: 80,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13,
      },
    },
    location: {
      latitude: 52.3609553943508,
      longitude: 4.85309666406198,
      zoom: 12,
    },
    isFavorite: false,
    isPremium: false,
    rating: 4.3,
    previewImage: 'https://example.com/image2.jpg',
  },
  {
    id: '3',
    title: 'Canal View Prinsengracht',
    type: 'apartment',
    price: 132,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13,
      },
    },
    location: {
      latitude: 52.3809553943508,
      longitude: 4.879309666406198,
      zoom: 12,
    },
    isFavorite: true,
    isPremium: true,
    rating: 4.9,
    previewImage: 'https://example.com/image3.jpg',
  },
  {
    id: '4',
    title: 'Nice, cozy, warm big bed apartment',
    type: 'house',
    price: 180,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13,
      },
    },
    location: {
      latitude: 52.3709553943508,
      longitude: 4.84309666406198,
      zoom: 12,
    },
    isFavorite: false,
    isPremium: true,
    rating: 4.7,
    previewImage: 'https://example.com/image4.jpg',
  },
  {
    id: '5',
    title: 'Loft Studio in the Central Area',
    type: 'hotel',
    price: 90,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13,
      },
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.929309666406198,
      zoom: 12,
    },
    isFavorite: true,
    isPremium: false,
    rating: 4.2,
    previewImage: 'https://example.com/image5.jpg',
  },
];

export const Default: Story = {
  args: {
    offers: mockOffers,
    activeOfferId: '2',
    mode: 'default',
  },
};

export const NoActiveOffer: Story = {
  args: {
    offers: mockOffers,
    activeOfferId: null,
  },
};

export const OfferMode: Story = {
  args: {
    offers: mockOffers,
    mode: 'offer',
  },
  parameters: {
    docs: {
      description: {
        story: 'В режиме "offer" первый оффер в массиве считается текущим и отображается как активный. Показываются только первые 4 предложения (текущий + 3 рядом).',
      },
    },
  },
};

export const SingleOffer: Story = {
  args: {
    offers: [mockOffers[0]],
    activeOfferId: '1',
  },
};

export const NoLocationData: Story = {
  args: {
    offers: [],
  },
  parameters: {
    docs: {
      description: {
        story: 'Компонент покажет сообщение "No location data" если нет данных о местоположении',
      },
    },
  },
};

export const WithCustomSize: Story = {
  args: {
    offers: mockOffers,
    activeOfferId: '2',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '600px', height: '400px', margin: '0 auto' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Карта в контейнере фиксированного размера',
      },
    },
  },
};
