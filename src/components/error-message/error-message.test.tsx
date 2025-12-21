import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ErrorMessage from './error-message';
import * as storeHooks from '../store';
import { setError } from '../store/offers/offer-slice';

describe('ErrorMessage component', () => {
  const mockDispatch = vi.fn();
  const mockMessage = 'Mock error message';

  beforeEach(() => {
    vi.spyOn(storeHooks, 'useAppDispatch').mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the error message text', () => {
    render(<ErrorMessage message={mockMessage} />);
    expect(screen.getByText(mockMessage)).toBeInTheDocument();
  });

  it('renders the error icon', () => {
    render(<ErrorMessage message={mockMessage} />);
    expect(screen.getByText('⚠️')).toBeInTheDocument();
  });

  it('calls dispatch with setError(null) when close button is clicked', async () => {
    render(<ErrorMessage message={mockMessage} />);
    const closeButton = screen.getByRole('button', { name: /close error message/i });
    await userEvent.click(closeButton);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(setError(null));
  });
});
