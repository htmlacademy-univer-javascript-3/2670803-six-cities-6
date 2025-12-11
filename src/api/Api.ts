import axios, { AxiosError, AxiosResponse } from 'axios';
import { Offer } from './types/offer';
import { Comment, CommentData } from './types/comment';

const BASE_URL = 'https://14.design.htmlacademy.pro/six-cities';
const TIMEOUT = 5000;
const AUTH_TOKEN_KEY = 'six-cities-token';

export const saveToken = (token: string): void => {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
};

export const dropToken = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
};

export const getToken = (): string => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  return token || '';
};

export const createAPI = () => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
  });

  api.interceptors.request.use(
    (config) => {
      const token = getToken();
      if (token) {
        config.headers['X-Token'] = token;
      }
      return config;
    },
  );

  api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        dropToken();
      }
      return Promise.reject(error);
    }
  );

  return api;
};

export const API = createAPI();

export const getOffers = async (): Promise<Offer[]> => {
  const response = await API.get<Offer[]>('/offers');
  return response.data;
};

export const getOffer = async (offerId: string): Promise<Offer> => {
  const response = await API.get<Offer>(`/offers/${offerId}`);
  return response.data;
};

export const getNearbyOffers = async (offerId: string): Promise<Offer[]> => {
  const response = await API.get<Offer[]>(`/offers/${offerId}/nearby`);
  return response.data;
};

export const getComments = async (offerId: string): Promise<Comment[]> => {
  const response = await API.get<Comment[]>(`/comments/${offerId}`);
  return response.data;
};

export const sendComment = async (offerId: string, commentData: CommentData): Promise<Comment> => {
  const response = await API.post<Comment>(`/comments/${offerId}`, commentData);
  return response.data;
};
