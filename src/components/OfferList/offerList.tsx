import { FC, useState } from 'react';
import { Offer } from '../../mocks/types/offer';
import PlaceCard from '../PlaceCard/placeCard';

type OfferListProps = {
  offers: Offer[];
}

const OfferList: FC<OfferListProps> = ({ offers }) => {
  const [activeOffer, setActiveOffer] = useState<string | null>(null);

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          onMouseEnter={() => setActiveOffer(offer.id)}
          onMouseLeave={() => setActiveOffer(null)}
          isActive={offer.id === activeOffer}
        />
      ))}
    </div>
  );
};

export default OfferList;
