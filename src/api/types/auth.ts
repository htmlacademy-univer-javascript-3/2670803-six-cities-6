export type AuthorizationStatus = 'AUTH' | 'NO_AUTH' | 'UNKNOWN';

export interface LoginResponse {
  token: string;
  email: string;
  avatarUrl: string;
  name: string;
  isPro: boolean;
}

export interface UserData {
  email: string;
  avatarUrl: string;
  name: string;
  isPro: boolean;
}
