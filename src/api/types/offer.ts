export interface Offer {
  id: string;
  title: string;
  type: string;
  price: number;
  city: {
    name: string;
    location: {
      latitude: number;
      longitude: number;
      zoom: number;
    };
  };
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;

  previewImage?: string;
  images?: string[];
  description?: string;
  bedrooms?: number;
  goods?: string[];
  host?: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
  maxAdults?: number;
}
