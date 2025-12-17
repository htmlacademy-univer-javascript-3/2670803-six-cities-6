import { createAsyncThunk } from '@reduxjs/toolkit';
import { setUser, setAuthorizationStatus } from './user-slice';
import { API, saveToken, dropToken } from '../../../api/api';
import { AppDispatch } from '..';
import { UserData, LoginResponse, AuthorizationStatus } from '../../../api/types/types';
import { setError } from '../offers/offer-slice';

export const checkAuth = createAsyncThunk<
  void,
  void,
  { dispatch: AppDispatch; extra: typeof API }
>('auth/checkAuth', async (_, { dispatch, extra: api }) => {
  try {
    const response = await api.get<UserData>('/login');
    dispatch(setUser(response.data));
    dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
  } catch {
    dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
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
    dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
    dispatch(setUser(userData));
    dispatch(setError(null));
  } catch (error) {
    dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    dispatch(setUser(null));
    dispatch(setError('Login failed.'));
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
  dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
  dispatch(setUser(null));
  dispatch({ type: 'favorites/setFavoriteOffers', payload: [] });

});
