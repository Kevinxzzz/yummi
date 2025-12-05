export interface CreateUser {
  userName: string;
  name: string;
  email: string;
  password: string;
}

export type LoginResponse = {
  token: string;
  user: {
    id: number;
    userName: string;
    email: string;
  };
};

export interface UserType {
  id: number;
  userName: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
}
