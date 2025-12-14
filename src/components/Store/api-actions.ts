import { createAsyncThunk } from '@reduxjs/toolkit';
import { setOffers, setError, setAuthorizationStatus, setUser, setOfferDetails, setNearbyOffers, setComments, setCommentsLoading, setFavoriteOffers } from './action';
import { API, saveToken, dropToken } from '../../api/Api';
import { AppDispatch, RootState } from './index';
import { UserData, LoginResponse } from '../../api/types/auth';
import { Offer } from '../../api/types/offer';
import { Comment, CommentData } from '../../api/types/comment';
import { AxiosError } from 'axios';
import { toggleFavorite } from '../../api/Api';

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

export const fetchComments = createAsyncThunk<
  void,
  string,
  { dispatch: AppDispatch; extra: typeof API }
>('offer/fetchComments', async (offerId, { dispatch, extra: api }) => {
  dispatch(setCommentsLoading(true));
  try {
    const response = await api.get<Comment[]>(`/comments/${offerId}`);
    dispatch(setComments(response.data));
  } catch (error) {
    dispatch(setError('Failed to load comments.'));
  } finally {
    dispatch(setCommentsLoading(false));
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

export const postComment = createAsyncThunk<
  void,
  { offerId: string; commentData: CommentData },
  { dispatch: AppDispatch; extra: typeof API }
>('offer/postComment', async ({ offerId, commentData }, { dispatch, extra: api }) => {
  try {
    await api.post(`/comments/${offerId}`, commentData);
    dispatch(fetchComments(offerId));
  } catch (err) {
    const error = err as AxiosError;
    if (error.response?.status === 401) {
      dispatch(setError('You need to be authorized to post a comment.'));
    } else if (error.response?.status === 400) {
      dispatch(setError('Your review must be between 50 and 300 characters.'));
    } else {
      dispatch(setError('Failed to post comment. Please try again.'));
    }
    throw error;
  }
});

export const toggleFavoriteOffer = createAsyncThunk<
  void,
  { offerId: string; isFavorite: boolean },
  { dispatch: AppDispatch; state: RootState; extra: typeof API }
>(
  'offer/toggleFavorite',
  async ({ offerId, isFavorite }, { dispatch, getState }) => {
    try {
      const updatedOffer = await toggleFavorite(offerId, isFavorite);

      const { offers, offerDetails } = getState();
      const newOffers = offers.map((o) => o.id === updatedOffer.id ? updatedOffer : o);
      dispatch(setOffers(newOffers));

      if (offerDetails?.id === updatedOffer.id) {
        dispatch(setOfferDetails(updatedOffer));
      }

      const favoriteOffers = updatedOffer.isFavorite
        ? [...getState().favoriteOffers, updatedOffer]
        : getState().favoriteOffers.filter((o) => o.id !== updatedOffer.id);

      dispatch(setFavoriteOffers(favoriteOffers));

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
