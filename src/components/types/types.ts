import { Offer } from '../../api/types/types';

export interface MainPageProps {
  offers: Offer[];
  onOfferHover?: (offerId: string | null) => void;
}

export interface FavoritesPageProps {
  offers: Offer[];
  onOfferHover?: (offerId: string | null) => void;
}

export type ReviewType = {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  text: string;
  date: string;
  isPro?: boolean;
}

export type SortType = 'Popular' | 'Price: low to high' | 'Price: high to low' | 'Top rated first';

export interface SortOptionsProps {
  currentSort: SortType;
  onSortChange: (sortType: SortType) => void;
}

export const enum Sort {
  Popular = 'Popular',
  PriceLowToHigh = 'Price: low to high',
  PriceHighToLow = 'Price: high to low',
  TopRated = 'Top rated first',
}
