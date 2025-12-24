// ReviewForm.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import { configureStore, Store } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import { MemoizedReviewForm } from '../memoized-component/memoized-component';

interface CommentsState {
  commentsLoading: boolean;
  comments: unknown[];
  error: string | null;
}

interface RootState {
  comments: CommentsState;
}

const createMockStore = (commentsLoading = false): Store<RootState> =>
  configureStore({
    reducer: {
      comments: (): CommentsState => ({
        commentsLoading,
        comments: [],
        error: null,
      }),
    },
  }) as Store<RootState>;

const WithProviders = (
  Story: React.ComponentType,
) => {
  const store = createMockStore();

  return (
    <MemoryRouter>
      <Provider store={store}>
        <div style={{
          maxWidth: '600px',
          margin: '0 auto',
          padding: '40px',
          backgroundColor: '#f5f5f5'
        }}
        >
          <Story />
        </div>
      </Provider>
    </MemoryRouter>
  );
};

const meta: Meta<typeof MemoizedReviewForm> = {
  title: 'Components/ReviewForm',
  component: MemoizedReviewForm,
  tags: ['autodocs'],
  argTypes: {
    offerId: {
      control: 'text',
      description: 'ID предложения для которого оставляется отзыв',
    },
  },
  args: {
    offerId: '1',
  },
} satisfies Meta<typeof MemoizedReviewForm>;

export default meta;
type Story = StoryObj<typeof MemoizedReviewForm>;

export const Default: Story = {
  decorators: [WithProviders],
  parameters: {
    docs: {
      description: {
        story: 'Пустая форма для отправки отзыва',
      },
    },
  },
};
