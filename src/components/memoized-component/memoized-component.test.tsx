import { describe, it, expect } from 'vitest';
import { memo } from 'react';

import {
  MemoizedCitiesList,
  MemoizedCityItem,
  MemoizedOfferList,
  MemoizedPlaceCard,
  MemoizedOfferMap,
  MemoizedNearPlacesList,
  MemoizedSortOptions,
  MemoizedReviewForm,
  MemoizedReview,
  MemoizedHeader,
  MemoizedReviewList,
} from './memoized-component';

describe('memoized components', () => {
  const DummyComponent = () => null;
  DummyComponent.displayName = 'DummyComponent';

  const memoType = (memo(DummyComponent) as unknown as { $$typeof: symbol }).$$typeof;

  const components = [
    MemoizedCitiesList,
    MemoizedCityItem,
    MemoizedOfferList,
    MemoizedPlaceCard,
    MemoizedOfferMap,
    MemoizedNearPlacesList,
    MemoizedSortOptions,
    MemoizedReviewForm,
    MemoizedReview,
    MemoizedHeader,
    MemoizedReviewList,
  ];

  it('all components are wrapped with React.memo', () => {
    components.forEach((Component) => {
      const memoized = Component as unknown as { $$typeof: symbol };
      expect(memoized.$$typeof).toBe(memoType);
    });
  });
});
