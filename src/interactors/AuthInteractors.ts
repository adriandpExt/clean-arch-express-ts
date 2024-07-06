import { Auth, LoginResponse } from "../entities/Auth";
import { IAuthInteractor } from "../interfaces/IAuthInteractor";
import { IAuthRepository } from "../interfaces/IAuthRepository";
import { generateToken, hashedPassword } from "../utils/auth";

import bcrypt from "bcrypt";

export const AuthInterators = (
  repository: IAuthRepository
): IAuthInteractor => {
  const login = async (
    email: string,
    password: string
  ): Promise<LoginResponse> => {
    if (!email || !password) {
      throw { statusCode: 400, message: "Email and password are required!" };
    }

    const users = await repository.login(email, password);
    if (!users) {
      throw { statusCode: 404, message: "User not found!" };
    }

    const isPasswordValid = await hashedPassword(password, users.password);
    if (!isPasswordValid) {
      throw { statusCode: 400, message: "Invalid credentials!" };
    }

    const accessToken = generateToken(users.email);
    const data: LoginResponse = {
      token: accessToken,
      email: users.email,
    };

    return data;
  };

  const register = async (email: string, password: string): Promise<Auth> => {
    if (!email || !password) {
      throw { statusCode: 400, message: "Email and password are required!" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    if (!hashedPassword) {
      throw { statusCode: 404, message: "Invalid credentials!" };
    }

    const user = await repository.register(email, hashedPassword);
    if (!user) {
      throw { statusCode: 404, message: "Invalid credentials!" };
    }

    return user;
  };

  return { login, register };
};
