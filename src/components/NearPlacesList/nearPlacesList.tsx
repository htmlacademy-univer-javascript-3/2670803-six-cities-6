import { FC } from 'react';
import { Offer } from '../../mocks/types/offer';
import PlaceCard from '../PlaceCard/placeCard';

type NearPlacesListProps = {
  offers: Offer[];
  onOfferHover?: (offerId: string | null) => void;
}

const NearPlacesList: FC<NearPlacesListProps> = ({ offers, onOfferHover }) => (
  <div className="near-places__list places__list">
    {offers.map((offer) => (
      <PlaceCard
        key={offer.id}
        offer={offer}
        onMouseEnter={() => onOfferHover?.(offer.id)}
        onMouseLeave={() => onOfferHover?.(null)}
      />
    ))}
  </div>
);

export default NearPlacesList;
