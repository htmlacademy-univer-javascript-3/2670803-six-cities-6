export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

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
