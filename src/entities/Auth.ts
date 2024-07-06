export interface Auth {
  id?: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  id: string;
  email: string;
  token: string;
}

export interface User {
  userId: string;
  email: string;
}
