import { FC, useCallback } from 'react';
import { Offer } from '../../api/types/types';
import { MemoizedPlaceCard } from '../../hocs/memoized-component/memoized-component';

type OfferListProps = {
  offers: Offer[];
  onOfferHover?: (offerId: string | null) => void;
}

const OfferList: FC<OfferListProps> = ({ offers, onOfferHover }) => {
  const handleMouseEnter = useCallback(
    (id: string) => () => {
      onOfferHover?.(id);
    },
    [onOfferHover]
  );

  const handleMouseLeave = useCallback(
    () => {
      onOfferHover?.(null);
    },
    [onOfferHover]
  );

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <MemoizedPlaceCard
          key={offer.id}
          offer={offer}
          onMouseEnter={handleMouseEnter(offer.id)}
          onMouseLeave={handleMouseLeave}
        />
      ))}
    </div>
  );
};

export default OfferList;
