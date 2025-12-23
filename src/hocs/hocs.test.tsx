import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { FC } from 'react';

import { withMemo } from './hocs';

describe('withMemo HOC', () => {
  it('prevents re-render when props are the same', () => {
    const renderSpy = vi.fn();

    const TestComponent: FC<{ value: number }> = ({ value }) => {
      renderSpy(value);
      return <div>{value}</div>;
    };

    const MemoizedComponent = withMemo(TestComponent);

    const { rerender } = render(<MemoizedComponent value={1} />);

    expect(renderSpy).toHaveBeenCalledTimes(1);

    rerender(<MemoizedComponent value={1} />);

    expect(renderSpy).toHaveBeenCalledTimes(1);
  });

  it('re-renders when props change', () => {
    const renderSpy = vi.fn();

    const TestComponent: FC<{ value: number }> = ({ value }) => {
      renderSpy(value);
      return <div>{value}</div>;
    };

    const MemoizedComponent = withMemo(TestComponent);

    const { rerender } = render(<MemoizedComponent value={1} />);

    rerender(<MemoizedComponent value={2} />);

    expect(renderSpy).toHaveBeenCalledTimes(2);
  });
});
