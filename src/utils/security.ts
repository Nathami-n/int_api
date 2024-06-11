import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import dotenv from "dotenv";

dotenv.config({
  path: "./env",
});

export const verifyPassword = async (pass: string, hash: string) => {
  return bcrypt.compare(pass, hash);
};

export const createJWT = (payload: object) => {
  const access_token = jwt.sign(payload, process.env.ACCESS_TOKEN as string, {
    expiresIn: "15m",
  });
  const refresh_token = jwt.sign(payload, process.env.REFRESH_TOKEN as string, {
    expiresIn: "7d",
  });

  return {access_token, refresh_token};
};

export const deserializeJWT = (token: string, type: "access" | "refresh") => {
  const tokens = {
    access: process.env.ACCESS_TOKEN as string,
    refresh: process.env.REFRESH_TOKEN as string,
  };

  const chosen_token = tokens[type];

  try {
    return jwt.verify(token, chosen_token);
  } catch (error) {
    console.error(error);
    return null
  }
};

export const hashPassword = (password: string) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}
