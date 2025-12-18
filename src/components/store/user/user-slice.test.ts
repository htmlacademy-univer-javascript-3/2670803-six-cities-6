import { userReducer, setUser, setAuthorizationStatus, INITIAL_USER_STATE, UserState } from './user-slice';
import { AuthorizationStatus, UserData } from '../../../api/types/types';

describe('userSlice', () => {
  const mockUser: UserData = {
    name: 'Alice',
    email: 'alice@test.com',
    avatarUrl: 'url',
    isPro: true,
  };

  it('should return the initial state', () => {
    expect(userReducer(undefined, { type: undefined })).toEqual(INITIAL_USER_STATE);
  });

  it('should handle setUser', () => {
    const state: UserState = userReducer(INITIAL_USER_STATE, setUser(mockUser));
    expect(state.user).toEqual(mockUser);

    const stateNull: UserState = userReducer(state, setUser(null));
    expect(stateNull.user).toBeNull();
  });

  it('should handle setAuthorizationStatus', () => {
    const state: UserState = userReducer(INITIAL_USER_STATE, setAuthorizationStatus(AuthorizationStatus.Auth));
    expect(state.authorizationStatus).toBe(AuthorizationStatus.Auth);

    const stateNoAuth: UserState = userReducer(state, setAuthorizationStatus(AuthorizationStatus.NoAuth));
    expect(stateNoAuth.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
  });
});
