import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Review from './review';
import type { ReviewType } from '../types/types';

const mockReview: ReviewType = {
  id: '1',
  userName: 'John Doe',
  userAvatar: 'avatar.jpg',
  rating: 4,
  text: 'This is a review text.',
  date: '2023-12-21T10:00:00.000Z',
};

describe('Review', () => {
  it('should render review content correctly', () => {
    render(<Review review={mockReview} />);
    expect(screen.getByText(mockReview.text)).toBeInTheDocument();
    expect(screen.getByText(mockReview.userName)).toBeInTheDocument();
    const avatar = screen.getByAltText('Reviews avatar');

    if (avatar instanceof HTMLImageElement) {
      expect(avatar.src).toContain(mockReview.userAvatar);
      expect(avatar.width).toBe(54);
      expect(avatar.height).toBe(54);
    } else {
      throw new Error('Avatar element is not an HTMLImageElement');
    }
  });

  it('should display correct rating width', () => {
    render(<Review review={mockReview} />);
    const starsSpan = screen.getByText('Rating').previousElementSibling as HTMLElement;
    expect(starsSpan).toHaveStyle(`width: ${ (mockReview.rating / 5) * 100 }%`);
  });

  it('should format date correctly', () => {
    render(<Review review={mockReview} />);
    const time = screen.getByText(/December 2023/i);
    expect(time).toBeInTheDocument();
    expect(time).toHaveAttribute('dateTime', mockReview.date);
  });
});
