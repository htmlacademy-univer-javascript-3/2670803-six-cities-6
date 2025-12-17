import { memo } from 'react';
import type { FC } from 'react';

export function withMemo<T>(Component: FC<T>): FC<T> {
  return memo(Component) as FC<T>;
}
