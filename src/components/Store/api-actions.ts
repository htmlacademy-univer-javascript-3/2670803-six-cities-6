import { createAsyncThunk } from '@reduxjs/toolkit';
import { setOffers, setError, setAuthorizationStatus, setUser} from './action';
import { API, saveToken, dropToken } from '../../api/Api';
import { AppDispatch } from './index';
import { UserData, LoginResponse } from '../../api/types/auth';
import { Offer } from '../../api/types/offer';

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
    const response = await api.get<UserData>('/login');
    dispatch(setUser(response.data));
    dispatch(setAuthorizationStatus('AUTH'));
  } catch {
    dispatch(setAuthorizationStatus('NO_AUTH'));
    dispatch(setUser(null));
  }
});

export const login = createAsyncThunk<
  void,
  { email: string; password: string },
  { dispatch: AppDispatch; extra: typeof API }
>('auth/login', async ({ email, password }, { dispatch, extra: api }) => {
  try {
    const response = await api.post<LoginResponse>('/login', { email, password });
    const { token, ...userData } = response.data;
    saveToken(token);
    dispatch(setAuthorizationStatus('AUTH'));
    dispatch(setUser(userData));
    dispatch(setError(null));
  } catch (error) {
    dispatch(setAuthorizationStatus('NO_AUTH'));
    dispatch(setUser(null));
    dispatch(setError('Login failed.'));
    throw error;
  }
});

export const logout = createAsyncThunk<
  void,
  void,
  { dispatch: AppDispatch; extra: typeof API }
>('auth/logout', async (_, { dispatch, extra: api }) => {
  try {
    await api.delete('/logout');
  } catch {
    dispatch(setError('Please try again later.'));
  }
  dropToken();
  dispatch(setAuthorizationStatus('NO_AUTH'));
  dispatch(setUser(null));
  dispatch(setError(null));
});
