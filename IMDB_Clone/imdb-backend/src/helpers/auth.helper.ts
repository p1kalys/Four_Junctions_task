import jwt from 'jsonwebtoken';
import { User } from "../models/user.model";

const JWT_SECRET = process.env.JWT_SECRET || "secret_password";

export const generateToken = async (user: User) => {
  return {
    token: await generateTokenWithExpiration(user, "1d")
  };
};

const generateTokenWithExpiration = async (user: User, expiresIn: string) => {
  try {
    return jwt.sign(
      {
        id: user.id,
        name: user.name,
        number: user.number
      },
      JWT_SECRET,
      {
        expiresIn: expiresIn,
      }
    );
  } catch (err) {
    console.error(err);
    throw new Error(`Failed to generate token with expiration ${expiresIn}`);
  }
};


export const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (err) {
    return null
  }
};


