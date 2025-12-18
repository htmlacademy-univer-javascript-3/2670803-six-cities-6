import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { createAPI } from '../../api/api';
import { userReducer } from './user/user-slice';
import { commentsReducer } from './comments/comment-slice';
import { favoritesReducer } from './favorites/favorites-slice';
import { offerReducer } from './offers/offer-slice';

export const api = createAPI();
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const store = configureStore({
  reducer: {
    user: userReducer,
    comments: commentsReducer,
    favorites: favoritesReducer,
    offer: offerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
