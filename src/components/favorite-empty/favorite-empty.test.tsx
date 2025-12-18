import { render, screen } from '@testing-library/react';
import FavoritesEmpty from './favorite-empty';
describe('FavoritesEmpty component', () => {
  it('renders correctly', () => {
    render(<FavoritesEmpty />);
    const section = screen.getByTestId('favorites-empty');
    expect(section).toHaveClass('favorites favorites--empty');
    expect(screen.getByText(/Favorites \(empty\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Nothing yet saved\./i)).toBeInTheDocument();
    expect(
      screen.getByText(/Save properties to narrow down search or plan your future trips\./i)
    ).toBeInTheDocument();
  });
});
