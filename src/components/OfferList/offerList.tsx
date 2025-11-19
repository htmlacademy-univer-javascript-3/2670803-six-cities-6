import { FC } from 'react';
import { Offer } from '../../mocks/types/offer';
import PlaceCard from '../PlaceCard/placeCard';

type OfferListProps = {
  offers: Offer[];
  onOfferHover?: (offerId: string | null) => void;
}

const OfferList: FC<OfferListProps> = ({ offers, onOfferHover }) => (
  <div className="cities__places-list places__list tabs__content">
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

export default OfferList;
