import { setOffers, setOfferDetails, setNearbyOffers, setError } from './offer-slice';
import { fetchComments } from '../comments/comment-thunks';

import { createAsyncThunk } from '@reduxjs/toolkit';
import { API } from '../../../api/api';
import { AppDispatch } from '..';
import { Offer } from '../../../api/types/types';

export const fetchOffers = createAsyncThunk<
  void,
  void,
  { dispatch: AppDispatch; extra: typeof API }
>('offers/fetchOffers', async (_, { dispatch, extra: api }) => {
  try {
    const response = await api.get<Offer[]>('/offers');
    dispatch(setOffers(response.data));
  } catch (error) {
    dispatch(setError('Please try again later.'));
  }
});

export const fetchOfferData = createAsyncThunk<
  void,
  string,
  { dispatch: AppDispatch; extra: typeof API }
>('offer/fetchOfferData', async (offerId, { dispatch, extra: api }) => {
  try {
    const offerResponse = await api.get<Offer>(`/offers/${offerId}`);
    dispatch(setOfferDetails(offerResponse.data));
    const nearbyResponse = await api.get<Offer[]>(`/offers/${offerId}/nearby`);
    dispatch(setNearbyOffers(nearbyResponse.data));
    dispatch(fetchComments(offerId));
  } catch (error) {
    dispatch(setError('Failed offer data. Please try again later.'));
  }
});
