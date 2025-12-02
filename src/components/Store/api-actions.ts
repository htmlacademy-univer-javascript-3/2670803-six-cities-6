import { createAsyncThunk } from '@reduxjs/toolkit';
import { setOffers, setError, setAuthorizationStatus } from './action';
import { API, saveToken } from '../../api/Api';
import { AppDispatch } from './index';
import { Offer } from '../../api/types/offer';
import { LoginResponse } from '../../api/types/auth';

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

export const checkAuth = createAsyncThunk<
  void,
  void,
  { dispatch: AppDispatch; extra: typeof API }
>('auth/checkAuth', async (_, { dispatch, extra: api }) => {
  try {
    await api.get('/login');
    dispatch(setAuthorizationStatus('AUTH'));
  } catch {
    dispatch(setAuthorizationStatus('NO_AUTH'));
  }
});

export const login = createAsyncThunk<
  void,
  { email: string; password: string },
  { dispatch: AppDispatch; extra: typeof API }
>('auth/login', async ({ email, password }, { dispatch, extra: api }) => {
  try {
    const response = await api.post<LoginResponse>('/login', { email, password });
    const token = response.data.token;
    saveToken(token);
    dispatch(setAuthorizationStatus('AUTH'));
  } catch (error) {
    dispatch(setAuthorizationStatus('NO_AUTH'));
    dispatch(setError('Login failed.'));
    throw error;
  }
});
