import { Offer } from '../api/types/offer';

export interface MainPageProps {
  offers: Offer[];
  onOfferHover?: (offerId: string | null) => void;
}

export interface FavoritesPageProps {
  offers: Offer[];
  onOfferHover?: (offerId: string | null) => void;
}
