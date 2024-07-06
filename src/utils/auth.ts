import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../entities/Auth";

export const generateToken = (user: User) => {
  return jwt.sign(
    { id: user.userId, email: user.email },
    process.env.SECRET_TOKEN as string,
    {
      expiresIn: "20m",
    }
  );
};

export const hashedPassword = async (
  password: string,
  hashPassword: string
) => {
  if (!password) {
    throw new Error("Password cannot be empty!");
  }

  try {
    return await bcrypt.compare(password, hashPassword);
  } catch (error) {
    console.error("Error while comparing passwords:", error);
    throw new Error("Internal server error");
  }
};
