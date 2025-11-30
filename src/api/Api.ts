import axios from 'axios';
import { Offer } from './types/offer';

const BASE_URL = 'https://14.design.htmlacademy.pro/six-cities';
const TIMEOUT = 5000;
const AUTH_TOKEN_KEY = 'six-cities-token';

export const createAPI = () => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
  });

  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem(AUTH_TOKEN_KEY);
      if (token) {
        config.headers['X-Token'] = token;
      }
      return config;
    },
  );

  return api;
};

export const API = createAPI();

export const getOffers = async (): Promise<Offer[]> => {
  const response = await API.get<Offer[]>('/offers');
  return response.data;
};
