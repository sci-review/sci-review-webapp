import { User } from "./user.model";

export interface LoginForm {
  email: string;
  password: string;
}

export interface TokenResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface LogoutForm {
  refreshToken: string;
}
