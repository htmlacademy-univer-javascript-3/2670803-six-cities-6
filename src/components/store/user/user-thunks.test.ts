import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';
import { checkAuth, login, logout } from './user-thunks';
import { setUser, setAuthorizationStatus } from './user-slice';
import { setError } from '../offers/offer-slice';
import { saveToken, dropToken } from '../../../api/api';
import type { AppDispatch, RootState } from '..';
import { AuthorizationStatus, UserData, LoginResponse } from '../../../api/types/types';
import type * as ApiModule from '../../../api/api';
import type { MockedFunction } from 'vitest';

// Мокаем saveToken и dropToken строго
vi.mock('../../../api/api', async (): Promise<Partial<typeof import('../../../api/api')>> => {
  const actual: typeof ApiModule = await vi.importActual('../../../api/api');
  return {
    ...actual,
    saveToken: vi.fn(),
    dropToken: vi.fn(),
  };
});

describe('user thunks', () => {
  let dispatch: AppDispatch;
  let apiMock: AxiosInstance;

  const mockUser: UserData = {
    name: 'Test User',
    email: 'test@example.com',
    avatarUrl: '',
    isPro: false,
  };

  const mockLoginResponse: LoginResponse = {
    token: 'mock-token',
    ...mockUser,
  };

  beforeEach(() => {
    dispatch = vi.fn() as AppDispatch;

    // Строго типизированный мок Axios
    apiMock = {
      get: vi.fn<[string, AxiosRequestConfig?], Promise<AxiosResponse<UserData>>>(),
      post: vi.fn<[string, unknown, AxiosRequestConfig?], Promise<AxiosResponse<LoginResponse>>>(),
      delete: vi.fn<[string, AxiosRequestConfig?], Promise<AxiosResponse<void>>>(),
      request: vi.fn(),
      put: vi.fn(),
      patch: vi.fn(),
      head: vi.fn(),
      options: vi.fn(),
      getUri: vi.fn(),
      defaults: {},
      interceptors: { request: { use: vi.fn(), eject: vi.fn() }, response: { use: vi.fn(), eject: vi.fn() } },
    } as unknown as AxiosInstance;

    vi.clearAllMocks();
  });

  it('checkAuth: sets user and auth status on success', async () => {
    (apiMock.get as MockedFunction<AxiosInstance['get']>).mockResolvedValue({
      data: mockUser,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
      request: {},
    });

    const thunkAPI = { dispatch, getState: () => ({} as RootState), extra: apiMock };
    await checkAuth()(thunkAPI.dispatch, thunkAPI.getState, thunkAPI.extra);

    expect(apiMock.get).toHaveBeenCalledWith('/login');
    expect(dispatch).toHaveBeenCalledWith(setUser(mockUser));
    expect(dispatch).toHaveBeenCalledWith(setAuthorizationStatus(AuthorizationStatus.Auth));
  });

  it('checkAuth: sets NoAuth and null user on failure', async () => {
    (apiMock.get as MockedFunction<AxiosInstance['get']>).mockRejectedValue(new Error('API Error'));
    const thunkAPI = { dispatch, getState: () => ({} as RootState), extra: apiMock };

    await checkAuth()(thunkAPI.dispatch, thunkAPI.getState, thunkAPI.extra);

    expect(dispatch).toHaveBeenCalledWith(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    expect(dispatch).toHaveBeenCalledWith(setUser(null));
  });

  it('login: saves token, sets user and clears error on success', async () => {
    (apiMock.post as MockedFunction<AxiosInstance['post']>).mockResolvedValue({
      data: mockLoginResponse,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
      request: {},
    });

    const thunkAPI = { dispatch, getState: () => ({} as RootState), extra: apiMock };
    await login({ email: 'test@example.com', password: '1234' })(thunkAPI.dispatch, thunkAPI.getState, thunkAPI.extra);

    expect(apiMock.post).toHaveBeenCalledWith('/login', { email: 'test@example.com', password: '1234' });
    expect(saveToken).toHaveBeenCalledWith('mock-token');
    expect(dispatch).toHaveBeenCalledWith(setAuthorizationStatus(AuthorizationStatus.Auth));
    expect(dispatch).toHaveBeenCalledWith(setUser(mockUser));
    expect(dispatch).toHaveBeenCalledWith(setError(null));
  });

  it('login: sets NoAuth and error on failure', async () => {
    (apiMock.post as MockedFunction<AxiosInstance['post']>).mockRejectedValue(new Error('API Error'));
    const thunkAPI = { dispatch, getState: () => ({} as RootState), extra: apiMock };

    await login({ email: 'test@example.com', password: '1234' })(thunkAPI.dispatch, thunkAPI.getState, thunkAPI.extra);

    expect(dispatch).toHaveBeenCalledWith(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    expect(dispatch).toHaveBeenCalledWith(setUser(null));
    expect(dispatch).toHaveBeenCalledWith(setError('Login failed.'));
  });

  it('logout: drops token and sets NoAuth', async () => {
    (apiMock.delete as MockedFunction<AxiosInstance['delete']>).mockResolvedValue({
      data: undefined,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
      request: {},
    });

    const thunkAPI = { dispatch, getState: () => ({} as RootState), extra: apiMock };
    await logout()(thunkAPI.dispatch, thunkAPI.getState, thunkAPI.extra);

    expect(apiMock.delete).toHaveBeenCalledWith('/logout');
    expect(dropToken).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    expect(dispatch).toHaveBeenCalledWith(setUser(null));
    expect(dispatch).toHaveBeenCalledWith({ type: 'favorites/setFavoriteOffers', payload: [] });
  });
});
