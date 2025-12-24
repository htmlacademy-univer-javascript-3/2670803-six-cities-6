import type { Meta, StoryObj } from '@storybook/react';
import ErrorMessage from './error-message';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import type { StoryFn } from '@storybook/react';

interface OffersState {
  error: string | null;
}

const initialState: OffersState = {
  error: null,
};

const offersReducer = (state: OffersState = initialState): OffersState => state;

const mockStore = configureStore({
  reducer: {
    offers: offersReducer,
  },
});

const withStore = (Story: StoryFn) => (
  <Provider store={mockStore}>
    <Story />
  </Provider>
);

const meta = {
  title: 'Components/ErrorMessage',
  component: ErrorMessage,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Компонент для отображения сообщений об ошибках с возможностью закрытия.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    message: {
      control: 'text',
      description: 'Текст сообщения об ошибке',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
  },
  args: {
    message: 'Произошла ошибка при загрузке данных',
  },
  decorators: [withStore],
} satisfies Meta<typeof ErrorMessage>;

export default meta;
type Story = StoryObj<typeof ErrorMessage>;

export const Default: Story = {
  args: {
    message: 'Произошла ошибка при загрузке данных',
  },
};

export const ShortMessage: Story = {
  args: {
    message: 'Ошибка!',
  },
  name: 'Short Error Message',
};

export const LongMessage: Story = {
  args: {
    message: 'Произошла критическая ошибка при подключении к серверу. Пожалуйста, проверьте подключение к интернету и попробуйте снова. Если проблема persists, обратитесь в службу поддержки.',
  },
  name: 'Long Error Message',
};

export const NetworkError: Story = {
  args: {
    message: 'Нет соединения с интернетом. Проверьте подключение и попробуйте снова.',
  },
  name: 'Network Error',
};
