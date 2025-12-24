import type { Meta, StoryObj } from '@storybook/react';
import { MemoizedReview } from '../memoized-component/memoized-component';
import { ReviewType } from '../types/types';

const mockReview: ReviewType = {
  id: '1',
  rating: 4.5,
  text: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
  date: '2024-04-15T10:30:00.000Z',
  userName: 'Max',
  userAvatar: '/img/avatar-max.jpg',
};

const mockReview2: ReviewType = {
  id: '2',
  rating: 2,
  text: 'The room was spacious and clean, but the noise from the street was unbearable at night.',
  date: '2024-03-20T14:45:00.000Z',
  userName: 'Angelina',
  userAvatar: '/img/avatar-angelina.jpg',
};

const mockReview3: ReviewType = {
  id: '3',
  rating: 5,
  text: 'Absolutely perfect! The view was amazing, location was great, and the staff was very helpful.',
  date: '2024-02-10T09:15:00.000Z',
  userName: 'Oliver',
  userAvatar: '/img/avatar-angelina.jpg',
};

const meta: Meta<typeof MemoizedReview> = {
  title: 'Components/Review',
  component: MemoizedReview,
  tags: ['autodocs'],
  argTypes: {
    review: { control: 'object' },
    'data-testid': { control: 'text' },
    'data-review-id': { control: 'text' },
  },
} satisfies Meta<typeof MemoizedReview>;

export default meta;
type Story = StoryObj<typeof MemoizedReview>;

export const HighRating: Story = {
  args: {
    review: mockReview,
  },
  parameters: {
    docs: {
      description: {
        story: 'Отзыв с высоким рейтингом (4.5 из 5)',
      },
    },
  },
};

export const LowRating: Story = {
  args: {
    review: mockReview2,
  },
  parameters: {
    docs: {
      description: {
        story: 'Отзыв с низким рейтингом (2 из 5)',
      },
    },
  },
};

export const PerfectRating: Story = {
  args: {
    review: mockReview3,
  },
  parameters: {
    docs: {
      description: {
        story: 'Отзыв с максимальным рейтингом (5 из 5)',
      },
    },
  },
};

export const WithTestIds: Story = {
  args: {
    review: mockReview,
    'data-testid': 'review-item',
    'data-review-id': 'review-123',
  },
  parameters: {
    docs: {
      description: {
        story: 'Отзыв с data-атрибутами для тестирования',
      },
    },
  },
};

export const DifferentDates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <MemoizedReview review={{
        ...mockReview,
        date: '2024-04-01T00:00:00.000Z',
        text: 'April 2024 review'
      }}
      />
      <MemoizedReview review={{
        ...mockReview,
        date: '2023-12-15T00:00:00.000Z',
        text: 'December 2023 review'
      }}
      />
      <MemoizedReview review={{
        ...mockReview,
        date: '2023-06-01T00:00:00.000Z',
        text: 'June 2023 review'
      }}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Отзывы с разными датами для демонстрации форматирования',
      },
    },
  },
};

export const InList: Story = {
  render: () => (
    <ul className="reviews__list" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <MemoizedReview review={mockReview3} />
      <MemoizedReview review={mockReview} />
      <MemoizedReview review={mockReview2} />
      <MemoizedReview review={{
        id: '4',
        rating: 3.5,
        text: 'Good location but the room needs renovation.',
        date: '2024-01-05T16:20:00.000Z',
        userName: 'Sophie',
        userAvatar: '/img/avatar-angelina.jpg',
      }}
      />
    </ul>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Несколько отзывов в списке',
      },
    },
  },
};
