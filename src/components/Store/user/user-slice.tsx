import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserData, AuthorizationStatus } from '../../../api/types/types';

export interface UserState {
  user: UserData | null;
  authorizationStatus: AuthorizationStatus;
}

export const INITIAL_USER_STATE: UserState = {
  user: null,
  authorizationStatus: AuthorizationStatus.Unknown,
};

const userSlice = createSlice({
  name: 'user',
  initialState: INITIAL_USER_STATE,
  reducers: {
    setUser: (state, action: PayloadAction<UserData | null>) => {
      state.user = action.payload;
    },
    setAuthorizationStatus: (state, action: PayloadAction<AuthorizationStatus>) => {
      state.authorizationStatus = action.payload;
    },
  },
});

export const { setUser, setAuthorizationStatus } = userSlice.actions;
export const userReducer = userSlice.reducer;
