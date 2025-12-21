import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ReviewList from './review-list';
import type { ReviewType } from '../types/types';

const mockReviews: ReviewType[] = [
  { id: '1', userName: 'Alice', userAvatar: 'alice.jpg', rating: 5, text: 'Great!', date: '2023-12-21T12:00:00.000Z' },
  { id: '2', userName: 'Bob', userAvatar: 'bob.jpg', rating: 4, text: 'Good!', date: '2023-12-22T12:00:00.000Z' },
  { id: '3', userName: 'Charlie', userAvatar: 'charlie.jpg', rating: 3, text: 'Okay!', date: '2023-12-20T12:00:00.000Z' },
];

describe('ReviewList', () => {
  it('renders correct number of reviews and title', () => {
    render(<ReviewList reviews={mockReviews} />);

    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    expect(screen.getByText(mockReviews.length.toString())).toBeInTheDocument();
  });

  it('renders reviews in sorted order (newest first)', () => {
    render(<ReviewList reviews={mockReviews} />);
    const renderedReviews = screen.getAllByTestId('memoized-review');

    expect(renderedReviews.length).toBe(Math.min(mockReviews.length, 10));

    expect(renderedReviews[0]).toHaveAttribute('data-review-id', '2');
    expect(renderedReviews[1]).toHaveAttribute('data-review-id', '1');
    expect(renderedReviews[2]).toHaveAttribute('data-review-id', '3');
  });

  it('renders at most 10 reviews', () => {
    const manyReviews: ReviewType[] = Array.from({ length: 15 }, (_, i) => ({
      id: `${i}`,
      userName: `User${i}`,
      userAvatar: `avatar${i}.jpg`,
      rating: 5,
      text: `Review ${i}`,
      date: new Date(2023, 11, i + 1).toISOString(),
    }));

    render(<ReviewList reviews={manyReviews} />);
    const renderedReviews = screen.getAllByTestId('memoized-review');
    expect(renderedReviews.length).toBe(10);
  });
});
