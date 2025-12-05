import type { LoginResponse } from "./user";

export interface AuthContextType {
  user:  LoginResponse["user"] | null;
  token: string | null;
  login: (data: LoginResponse) => void;
  logout: () => void;
}
