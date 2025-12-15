import { FC, useCallback } from 'react';
import { Offer } from '../../api/types/offer';
import PlaceCard from '../PlaceCard/placeCard';

type NearPlacesListProps = {
  offers: Offer[];
  onOfferHover?: (offerId: string | null) => void;
}

const NearPlacesList: FC<NearPlacesListProps> = ({ offers, onOfferHover }) => {
  const handleMouseEnter = useCallback(
    (id: string) => () => onOfferHover?.(id),
    [onOfferHover]
  );

  const handleMouseLeave = useCallback(
    () => onOfferHover?.(null),
    [onOfferHover]
  );

  return (
    <div className="near-places__list places__list">
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          onMouseEnter={handleMouseEnter(offer.id)}
          onMouseLeave={handleMouseLeave}
        />
      ))}
    </div>
  );
};
export default NearPlacesList;
