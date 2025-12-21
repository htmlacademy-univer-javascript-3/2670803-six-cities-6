import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import SortOptions from './sort-options';

describe('SortOptions', () => {

  it('renders with current sort', () => {
    const onSortChange = vi.fn();
    render(<SortOptions currentSort="Popular" onSortChange={onSortChange} />);

    const currentSortElement = screen.getByText('Popular', { selector: '.places__sorting-type' });
    expect(currentSortElement).toBeInTheDocument();

    expect(screen.getByText(/Sort by/i)).toBeInTheDocument();

    const optionsList = screen.getByRole('list', { hidden: true });
    expect(optionsList.classList.contains('places__options--opened')).toBe(false);
  });

  it('opens and closes dropdown on click', async () => {
    const onSortChange = vi.fn();
    render(<SortOptions currentSort="Popular" onSortChange={onSortChange} />);

    const sortToggle = screen.getByText('Popular', { selector: '.places__sorting-type' });

    await userEvent.click(sortToggle);
    const optionsList = screen.getByRole('list', { hidden: true });
    expect(optionsList.classList.contains('places__options--opened')).toBe(true);

    await userEvent.click(sortToggle);
    expect(optionsList.classList.contains('places__options--opened')).toBe(false);
  });

  it('calls onSortChange and closes dropdown when option is clicked', async () => {
    const onSortChange = vi.fn();
    render(<SortOptions currentSort="Popular" onSortChange={onSortChange} />);

    const sortToggle = screen.getByText('Popular', { selector: '.places__sorting-type' });
    await userEvent.click(sortToggle);
    const newOption = screen.getByText('Price: low to high', { selector: 'li' });
    await userEvent.click(newOption);

    expect(onSortChange).toHaveBeenCalledWith('Price: low to high');
    const optionsList = screen.getByRole('list', { hidden: true });
    expect(optionsList.classList.contains('places__options--opened')).toBe(false);
  });

});
