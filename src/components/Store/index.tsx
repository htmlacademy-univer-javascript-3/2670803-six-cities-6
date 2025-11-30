import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { reducer } from './reducer';
import { createAPI } from '../../api/Api';

export const api = createAPI();
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
