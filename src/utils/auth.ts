import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const generateToken = (email: string) => {
  return jwt.sign({ email: email }, "SECRET_KEY", { expiresIn: "20m" });
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
