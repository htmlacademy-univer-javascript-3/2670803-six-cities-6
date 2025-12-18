import { render, screen } from '@testing-library/react';
import MainEmpty from './main-empty';

describe('MainEmpty component', () => {
  it('renders correctly with city name', () => {
    const cityName = 'Test City';
    render(<MainEmpty city={cityName} />);
    const main = screen.getByTestId('main-empty');
    expect(main).toHaveClass('page__main page__main--index page__main--index-empty');
    expect(screen.getByText(/Cities/i)).toBeInTheDocument();
    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        `We could not find any property available at the moment in ${cityName}`
      )
    ).toBeInTheDocument();
  });
});
