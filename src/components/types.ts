import { Offer } from '../mocks/types/offer';

export interface MainPageProps {
  offers: Offer[];
  onOfferHover?: (offerId: string | null) => void;
}

export interface FavoritesPageProps {
  offers: Offer[];
  onOfferHover?: (offerId: string | null) => void;
}
