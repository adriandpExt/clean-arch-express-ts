import { Auth } from "../entities/Auth";

export interface IAuthRepository {
  login(email: string, password: string): Promise<Auth>;
  register(email: string, password: string): Promise<Auth>;
}
