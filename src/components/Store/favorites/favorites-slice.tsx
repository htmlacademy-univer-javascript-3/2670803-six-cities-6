import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Offer } from '../../../api/types/offer';

export interface FavoritesState {
  favoriteOffers: Offer[];
  isFavoriteLoading: boolean;
}

export const initialFavoritesState: FavoritesState = {
  favoriteOffers: [],
  isFavoriteLoading: false,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: initialFavoritesState,
  reducers: {
    setFavoriteOffers: (state, action: PayloadAction<Offer[]>) => {
      state.favoriteOffers = action.payload;
    },
    setFavoriteLoading: (state, action: PayloadAction<boolean>) => {
      state.isFavoriteLoading = action.payload;
    },
  },
});

export const { setFavoriteOffers, setFavoriteLoading } = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;
