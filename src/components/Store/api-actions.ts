import { createAsyncThunk } from '@reduxjs/toolkit';
import { setOffers } from './action';
import { API } from '../../api/Api';
import { AppDispatch } from './index';
import { Offer } from '../../api/types/offer';

export const fetchOffers = createAsyncThunk<
  void,
  void,
  {
    dispatch: AppDispatch;
    extra: typeof API;
  }
>('offers/fetchOffers', async (_, { dispatch, extra: api }) => {
  try {
    const response = await api.get<Offer[]>('/offers');
    dispatch(setOffers(response.data));
  } catch (error) {
    // Ошибка
  }
});
