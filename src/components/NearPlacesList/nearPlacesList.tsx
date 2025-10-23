import { FC } from 'react';
import { Offer } from '../../mocks/types/offer';
import PlaceCard from '../PlaceCard/placeCard';

type NearPlacesListProps = {
  offers: Offer[];
}

const NearPlacesList: FC<NearPlacesListProps> = ({ offers }) => (
  <div className="near-places__list places__list">
    {offers.map((offer) => (
      <PlaceCard
        key={offer.id}
        offer={offer}
      />
    ))}
  </div>
);

export default NearPlacesList;
