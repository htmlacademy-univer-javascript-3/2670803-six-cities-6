import { render, screen } from '@testing-library/react';
import Footer from './footer';
import { BrowserRouter } from 'react-router-dom';

describe('Footer component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );

    const footerElement = screen.getByRole('contentinfo');
    expect(footerElement).toBeInTheDocument();

    const logoLink = screen.getByRole('link', { name: /6 cities logo/i });
    expect(logoLink).toHaveAttribute('href', '/');

    const logoImg = screen.getByAltText('6 cities logo');
    expect(logoImg).toBeInTheDocument();
    expect(logoImg).toHaveAttribute('src', 'img/logo.svg');
  });
});
