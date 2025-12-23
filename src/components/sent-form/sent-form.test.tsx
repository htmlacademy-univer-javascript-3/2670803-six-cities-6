import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, beforeEach, vi, expect } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import { commentsReducer } from '../store/comments/comment-slice';
import ReviewForm from './sent-form';

vi.mock('../store/comments/comment-thunks', () => ({
  postComment: vi.fn(),
}));

type RootState = {
  comments: {
    comments: { id: string }[];
    commentsLoading: boolean;
  };
};

describe('ReviewForm', () => {
  let store: EnhancedStore<RootState>;

  beforeEach(() => {
    store = configureStore({
      reducer: { comments: commentsReducer },
      preloadedState: {
        comments: {
          comments: [],
          commentsLoading: false
        }
      }
    });

    store.dispatch = vi.fn().mockImplementation(() => ({
      unwrap: vi.fn().mockResolvedValue({}),
    }));
  });

  it('renders the form and all elements', () => {
    render(
      <Provider store={store}>
        <ReviewForm offerId="1" />
      </Provider>
    );

    expect(screen.getByLabelText(/Your review/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Tell how was your stay/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Submit/i })).toBeDisabled();
  });

  it('inputs text and selects rating, enabling submit button', async () => {
    render(
      <Provider store={store}>
        <ReviewForm offerId="1" />
      </Provider>
    );

    const textarea = screen.getByPlaceholderText(/Tell how was your stay/i);
    const ratingInput = screen.getByRole('radio', { name: '5 stars' });
    const button = screen.getByRole('button', { name: /Submit/i });

    await userEvent.type(textarea, 'A'.repeat(50));
    await userEvent.click(ratingInput);

    expect(textarea).toHaveValue('A'.repeat(50));
    expect(ratingInput).toBeChecked();
    expect(button).toBeEnabled();
  });

  it('successfully submits the form and resets fields', async () => {
    render(
      <Provider store={store}>
        <ReviewForm offerId="1" />
      </Provider>
    );

    const textarea = screen.getByPlaceholderText(/Tell how was your stay/i);
    const ratingInput = screen.getByRole('radio', { name: '5 stars' });
    const button = screen.getByRole('button', { name: /Submit/i });

    await userEvent.type(textarea, 'A'.repeat(50));
    await userEvent.click(ratingInput);
    await userEvent.click(button);

    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalled();
      expect(textarea).toHaveValue('');
      expect(ratingInput).not.toBeChecked();
    });
  });

  it('shows error message on failed submission', async () => {
    store.dispatch = vi.fn().mockImplementation(() => ({
      unwrap: vi.fn().mockRejectedValue(new Error('fail')),
    }));

    render(
      <Provider store={store}>
        <ReviewForm offerId="1" />
      </Provider>
    );

    const textarea = screen.getByPlaceholderText(/Tell how was your stay/i);
    const ratingInput = screen.getByRole('radio', { name: '5 stars' });
    const button = screen.getByRole('button', { name: /Submit/i });

    await userEvent.type(textarea, 'A'.repeat(50));
    await userEvent.click(ratingInput);
    await userEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/Failed to send review/i)).toBeInTheDocument();
    });
  });
});
