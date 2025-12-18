import { render, screen } from '@testing-library/react';
import Spinner from './spinner';

describe('Spinner component', () => {
  it('renders with default text when isLoading is true', () => {
    render(<Spinner isLoading />);

    expect(screen.getByText('Loading')).toBeInTheDocument();
    expect(screen.getByText('Loading').closest('div')).not.toBeNull();
  });

  it('renders with custom text', () => {
    render(<Spinner isLoading text="Please wait..." />);

    expect(screen.getByText('Please wait...')).toBeInTheDocument();
  });

  it('does not render when isLoading is false', () => {
    render(<Spinner isLoading={false} />);

    expect(screen.queryByText('Loading')).not.toBeInTheDocument();
  });
});
