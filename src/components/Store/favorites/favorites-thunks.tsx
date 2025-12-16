import { createAsyncThunk } from '@reduxjs/toolkit';
import { API, toggleFavorite } from '../../../api/Api';
import { AppDispatch, RootState } from '../index';

import { setFavoriteOffers } from './favorites-slice';
import { setError } from '../offers/offer-slice';
import { setOfferDetails, setOffers } from '../offers/offer-slice';

import { Offer } from '../../../api/types/offer';

export const toggleFavoriteOffer = createAsyncThunk<
  void,
  { offerId: string; isFavorite: boolean },
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: typeof API;
  }
>(
  'favorites/toggleFavorite',
  async ({ offerId, isFavorite }, { dispatch, getState }) => {
    try {
      const updatedOffer = await toggleFavorite(offerId, isFavorite);

      const state = getState();
      const { offers, offerDetails } = state.offer;
      const { favoriteOffers } = state.favorites;

      dispatch(
        setOffers(
          offers.map((offer) =>
            offer.id === updatedOffer.id ? updatedOffer : offer
          )
        )
      );

      if (offerDetails?.id === updatedOffer.id) {
        dispatch(setOfferDetails(updatedOffer));
      }

      const updatedFavorites = updatedOffer.isFavorite
        ? [...favoriteOffers, updatedOffer]
        : favoriteOffers.filter(
          (offer) => offer.id !== updatedOffer.id
        );

      dispatch(setFavoriteOffers(updatedFavorites));
    } catch {
      dispatch(setError('Failed to update favorite. Please try again.'));
    }
  }
);

export const fetchFavoriteOffers = createAsyncThunk<
  void,
  void,
  { dispatch: AppDispatch; extra: typeof API }
>(
  'offers/fetchFavoriteOffers',
  async (_, { dispatch, extra: api }) => {
    try {
      const response = await api.get<Offer[]>('/favorite');
      dispatch(setFavoriteOffers(response.data));
    } catch {
      dispatch(setError('Failed to load favorite offers. Please try again.'));
    }
  }
);
