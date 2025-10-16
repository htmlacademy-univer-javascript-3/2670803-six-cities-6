import { Offer } from '../mocks/types/offer';

export interface MainPageProps {
  offerCount: number;
  offers: Offer[];
}

export interface FavoritesPageProps {
  offers: Offer[];
}
