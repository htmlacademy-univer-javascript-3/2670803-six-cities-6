import { FC, useCallback } from 'react';
import { Offer } from '../../api/types/offer';
import { MemoizedPlaceCard } from '../../hocs/memoized-component/memoized-component';

type NearPlacesListProps = {
  offers: Offer[];
  onOfferHover?: (offerId: string | null) => void;
}

const NearPlacesList: FC<NearPlacesListProps> = ({ offers, onOfferHover }) => {
  const handleMouseLeave = useCallback(
    () => onOfferHover?.(null),
    [onOfferHover]
  );

  return (
    <div className="near-places__list places__list">
      {offers.map((offer) => (
        <MemoizedPlaceCard
          key={offer.id}
          offer={offer}
          onMouseEnter={() => onOfferHover?.(offer.id)}
          onMouseLeave={handleMouseLeave}
        />
      ))}
    </div>
  );
};
export default NearPlacesList;
