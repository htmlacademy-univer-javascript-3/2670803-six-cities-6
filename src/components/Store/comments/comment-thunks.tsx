
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setComments, setCommentsLoading } from './comment-slice';
import { setError } from '../offers/offer-slice';
import { Comment, CommentData } from '../../../api/types/comment';
import { AxiosError } from 'axios';
import { API } from '../../../api/Api';
import { AppDispatch } from '..';

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
