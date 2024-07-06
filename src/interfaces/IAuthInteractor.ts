import { Auth, LoginResponse } from "../entities/Auth";

export interface IAuthInteractor {
  login(email: string, password: string): Promise<LoginResponse>;
  register(email: string, password: string): Promise<Auth>;
}
