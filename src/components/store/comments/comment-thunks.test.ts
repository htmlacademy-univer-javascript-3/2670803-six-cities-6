import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { AxiosInstance, AxiosResponse } from 'axios';

import { fetchComments, postComment } from './comment-thunks';
import { setComments, setCommentsLoading } from './comment-slice';
import { setError } from '../offers/offer-slice';

import type { Comment, CommentData } from '../../../api/types/types';
import type { AppDispatch, RootState } from '..';
import { AxiosError } from 'axios';

describe('comment thunks', () => {
  let dispatch: AppDispatch;
  let apiMock: AxiosInstance;

  const mockComments: Comment[] = [
    {
      id: '1',
      comment: 'Nice',
      rating: 5,
      user: {
        name: 'Test',
        avatarUrl: 'https://example.com/avatar.jpg',
        isPro: false,
      },
      date: '2025-12-18',
    },
  ];

  const mockAxiosResponse = {
    data: mockComments,
    status: 200,
    statusText: 'OK',
  } as unknown as AxiosResponse<unknown>;

  const mockPostResponse = {
    data: {},
    status: 201,
    statusText: 'Created',
  } as unknown as AxiosResponse<unknown>;

  beforeEach(() => {
    dispatch = vi.fn() as AppDispatch;

    apiMock = {
      get: vi.fn<
        Parameters<AxiosInstance['get']>,
        ReturnType<AxiosInstance['get']>
      >(() => Promise.resolve(mockAxiosResponse)),

      post: vi.fn<
        Parameters<AxiosInstance['post']>,
        ReturnType<AxiosInstance['post']>
      >(() => Promise.resolve(mockPostResponse)),

      defaults: {},
      interceptors: {
        request: { use: vi.fn(), eject: vi.fn() },
        response: { use: vi.fn(), eject: vi.fn() },
      },

      request: vi.fn(),
      delete: vi.fn(),
      head: vi.fn(),
      options: vi.fn(),
      put: vi.fn(),
      patch: vi.fn(),
      getUri: vi.fn(),
    } as unknown as AxiosInstance;

    vi.clearAllMocks();
  });

  it('fetchComments: dispatches loading, sets comments and stops loading', async () => {
    const thunkAPI = {
      dispatch,
      getState: () => ({} as RootState),
      extra: apiMock,
    };

    await fetchComments('1')(
      thunkAPI.dispatch,
      thunkAPI.getState,
      thunkAPI.extra
    );

    expect(dispatch).toHaveBeenCalledWith(setCommentsLoading(true));
    expect(dispatch).toHaveBeenCalledWith(setComments(mockComments));
    expect(dispatch).toHaveBeenCalledWith(setCommentsLoading(false));
  });

  it('fetchComments: dispatches setError on API failure', async () => {
    apiMock.get = vi.fn(() => Promise.reject(new Error('API Error'))) as unknown as AxiosInstance['get'];

    const thunkAPI = {
      dispatch,
      getState: () => ({} as RootState),
      extra: apiMock,
    };

    await fetchComments('1')(
      thunkAPI.dispatch,
      thunkAPI.getState,
      thunkAPI.extra
    );

    expect(dispatch).toHaveBeenCalledWith(setCommentsLoading(true));
    expect(dispatch).toHaveBeenCalledWith(
      setError('Failed to load comments.')
    );
    expect(dispatch).toHaveBeenCalledWith(setCommentsLoading(false));
  });

  it('posts comment and triggers comments refetch', async () => {
    const commentData: CommentData = {
      comment: 'Test review that is long enough to pass validation',
      rating: 5,
    };

    const thunkAPI = {
      dispatch,
      getState: () => ({} as RootState),
      extra: apiMock,
    };

    await postComment({ offerId: '1', commentData })(
      thunkAPI.dispatch,
      thunkAPI.getState,
      thunkAPI.extra
    );

    expect(apiMock.post).toHaveBeenCalledWith('/comments/1', commentData);
  });

  it('postComment: dispatches auth error on 401', async () => {
    const commentData: CommentData = {
      comment: 'Valid comment with enough length to pass validation',
      rating: 5,
    };

    const axiosError = {
      response: { status: 401 },
    } as AxiosError;

    apiMock.post = vi.fn(() =>
      Promise.reject(axiosError)
    ) as unknown as AxiosInstance['post'];

    const thunkAPI = {
      dispatch,
      getState: () => ({} as RootState),
      extra: apiMock,
    };

    const result = await postComment({ offerId: '1', commentData })(
      thunkAPI.dispatch,
      thunkAPI.getState,
      thunkAPI.extra
    );

    expect(apiMock.post).toHaveBeenCalledWith('/comments/1', commentData);

    expect(dispatch).toHaveBeenCalledWith(
      setError('You need to be authorized to post a comment.')
    );

    expect(result.meta.requestStatus).toBe('rejected');
  });

  it('postComment: dispatches validation error on 400', async () => {
    const commentData: CommentData = {
      comment: 'Invalid',
      rating: 5,
    };

    const axiosError = {
      response: { status: 400 },
    } as AxiosError;

    apiMock.post = vi.fn(() =>
      Promise.reject(axiosError)
    ) as unknown as AxiosInstance['post'];

    const thunkAPI = {
      dispatch,
      getState: () => ({} as RootState),
      extra: apiMock,
    };

    const result = await postComment({ offerId: '1', commentData })(
      thunkAPI.dispatch,
      thunkAPI.getState,
      thunkAPI.extra
    );

    expect(apiMock.post).toHaveBeenCalledWith('/comments/1', commentData);

    expect(dispatch).toHaveBeenCalledWith(
      setError('Your review must be between 50 and 300 characters.')
    );

    expect(result.meta.requestStatus).toBe('rejected');
  });

  it('postComment: dispatches generic error on unknown failure', async () => {
    const commentData: CommentData = {
      comment: 'Valid comment with enough length to pass validation',
      rating: 5,
    };

    const axiosError = {} as AxiosError;

    apiMock.post = vi.fn(() =>
      Promise.reject(axiosError)
    ) as unknown as AxiosInstance['post'];

    const thunkAPI = {
      dispatch,
      getState: () => ({} as RootState),
      extra: apiMock,
    };

    const result = await postComment({ offerId: '1', commentData })(
      thunkAPI.dispatch,
      thunkAPI.getState,
      thunkAPI.extra
    );

    expect(apiMock.post).toHaveBeenCalledWith('/comments/1', commentData);

    expect(dispatch).toHaveBeenCalledWith(
      setError('Failed to post comment. Please try again.')
    );

    expect(result.meta.requestStatus).toBe('rejected');
  });
});
