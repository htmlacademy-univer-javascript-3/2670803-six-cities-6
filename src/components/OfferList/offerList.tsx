import { FC } from 'react';
import { Offer } from '../../mocks/types/offer';
import PlaceCard from '../PlaceCard/placeCard';

type OfferListProps = {
  offers: Offer[];
}

const OfferList: FC<OfferListProps> = ({ offers }) => (
  <div className="cities__places-list places__list">
    {offers.map((offer) => (
      <PlaceCard key={offer.id} offer={offer} />
    ))}
  </div>
);

export default OfferList;
