import type { Meta, StoryObj } from '@storybook/react';
import { MemoizedReviewList } from '../memoized-component/memoized-component';
import { ReviewType } from '../types/types';

const mockReviews: ReviewType[] = [
  {
    id: '1',
    rating: 4.5,
    text: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
    date: '2024-04-15T10:30:00.000Z',
    userName: 'Max',
    userAvatar: '/img/avatar-max.jpg',
  },
  {
    id: '2',
    rating: 2,
    text: 'The room was spacious and clean, but the noise from the street was unbearable at night.',
    date: '2024-03-20T14:45:00.000Z',
    userName: 'Angelina',
    userAvatar: '/img/avatar-angelina.jpg',
  },
  {
    id: '3',
    rating: 5,
    text: 'Absolutely perfect! The view was amazing, location was great, and the staff was very helpful.',
    date: '2024-02-10T09:15:00.000Z',
    userName: 'Oliver',
    userAvatar: '/img/avatar.jpg',
  },
  {
    id: '4',
    rating: 3.5,
    text: 'Good location but the room needs renovation. The bed was uncomfortable.',
    date: '2024-01-05T16:20:00.000Z',
    userName: 'Sophie',
    userAvatar: '/img/avatar-angelina.jpg',
  },
  {
    id: '5',
    rating: 4,
    text: 'Great value for money. Would stay here again.',
    date: '2023-12-15T11:10:00.000Z',
    userName: 'John',
    userAvatar: '/img/avatar.jpg',
  },
];

const generateManyReviews = (count: number): ReviewType[] =>
  Array.from({ length: count }, (_, index) => ({
    id: `${index + 1}`,
    rating: Math.floor(Math.random() * 5) + 1,
    text: `Review ${index + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    date: new Date(2024, 0, index + 1).toISOString(),
    userName: ['Max', 'Angelina', 'Oliver', 'Sophie', 'John'][index % 5],
    userAvatar: ['/img/avatar-max.jpg', '/img/avatar-angelina.jpg', '/img/avatar.jpg'][index % 3],
  }));

const meta: Meta<typeof MemoizedReviewList> = {
  title: 'Components/ReviewList',
  component: MemoizedReviewList,
  tags: ['autodocs'],
  argTypes: {
    reviews: { control: 'object' },
  },
} satisfies Meta<typeof MemoizedReviewList>;

export default meta;
type Story = StoryObj<typeof MemoizedReviewList>;

export const Default: Story = {
  args: {
    reviews: mockReviews,
  },
  parameters: {
    docs: {
      description: {
        story: 'Стандартный список отзывов (5 штук)',
      },
    },
  },
};

export const EmptyList: Story = {
  args: {
    reviews: [],
  },
  parameters: {
    docs: {
      description: {
        story: 'Пустой список отзывов',
      },
    },
  },
};

export const SingleReview: Story = {
  args: {
    reviews: [mockReviews[0]],
  },
  parameters: {
    docs: {
      description: {
        story: 'Список с одним отзывом',
      },
    },
  },
};

export const ManyReviews: Story = {
  args: {
    reviews: generateManyReviews(15),
  },
  parameters: {
    docs: {
      description: {
        story: 'Много отзывов (проверка ограничения в 10 штук и сортировки по дате)',
      },
    },
  },
};

export const SortedByDate: Story = {
  args: {
    reviews: [
      { ...mockReviews[0], date: '2023-06-01T00:00:00.000Z', text: 'Oldest review' },
      { ...mockReviews[1], date: '2024-04-01T00:00:00.000Z', text: 'Newest review' },
      { ...mockReviews[2], date: '2023-12-15T00:00:00.000Z', text: 'Middle review' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Отзывы в разном порядке, проверка сортировки по убыванию даты',
      },
    },
  },
};

export const ExactlyTenReviews: Story = {
  args: {
    reviews: generateManyReviews(10),
  },
  parameters: {
    docs: {
      description: {
        story: 'Ровно 10 отзывов (граничный случай)',
      },
    },
  },
};

export const InContext: Story = {
  args: {
    reviews: mockReviews,
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px', backgroundColor: '#f5f5f5' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Компонент в контексте страницы',
      },
    },
  },
};
