import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

declare global {
  namespace Express {
    interface Request {
      user?: { id: string };
    }
  }
}

export const tokenValidate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (typeof authHeader === "string" && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.SECRET_TOKEN as string, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Token verification failed" });
      }

      req.user = decoded as { id: string };
      next();
    });
  } else {
    return res.status(401).json({ message: "User not authorized" });
  }
};

export default tokenValidate;
