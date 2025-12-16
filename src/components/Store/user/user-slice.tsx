import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserData, AuthorizationStatus } from '../../../api/types/auth';

export interface UserState {
  user: UserData | null;
  authorizationStatus: AuthorizationStatus;
}

export const initialUserState: UserState = {
  user: null,
  authorizationStatus: AuthorizationStatus.Unknown,
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
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
