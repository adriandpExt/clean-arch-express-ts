import { Request, Response, NextFunction } from "express";
import { IAuthInteractor } from "../interfaces/IAuthInteractor";

export const AuthController = (interactor: IAuthInteractor) => {
  const onLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body as {
        email: string;
        password: string;
      };

      const data = await interactor.login(email, password);

      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };

  const onRegister = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { email, password } = req.body as {
        email: string;
        password: string;
      };

      const data = await interactor.register(email, password);

      return res.status(200).json({
        data,
        message: "Successfully registered!",
      });
    } catch (error) {
      next(error);
    }
  };

  return { onLogin, onRegister };
};
