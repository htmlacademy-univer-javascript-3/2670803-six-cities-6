import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CityItem from './city-item';
import { MemoryRouter } from 'react-router-dom';

describe('CityItem', () => {
  const mockOnCityChange = vi.fn();

  const renderComponent = (city: string, currentCity: string) =>
    render(
      <MemoryRouter>
        <CityItem city={city} currentCity={currentCity} onCityChange={mockOnCityChange} />
      </MemoryRouter>
    );

  it('renders the city name', () => {
    renderComponent('Amsterdam', 'Paris');
    expect(screen.getByText('Amsterdam')).toBeInTheDocument();
  });

  it('adds active class for the current city', () => {
    renderComponent('Paris', 'Paris');
    const link = screen.getByRole('link', { name: 'Paris' });
    expect(link).toHaveClass('tabs__item--active');
  });

  it('calls onCityChange when clicked', async () => {
    renderComponent('London', 'Paris');
    const link = screen.getByRole('link', { name: 'London' });
    await userEvent.click(link);
    expect(mockOnCityChange).toHaveBeenCalledTimes(1);
    expect(mockOnCityChange).toHaveBeenCalledWith('London');
  });
});
