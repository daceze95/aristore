import bcrypt from "bcryptjs";
import Jwt, { JwtPayload } from 'jsonwebtoken';
import { APP_SECRET } from "../config/appConfig";

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt();
  return bcrypt.hash(password, salt);
};

export const decryptPassword = async (
  enteredPassword: string,
  hashedPassword: string
) => {
  return await bcrypt.compare(enteredPassword, hashedPassword);
};

export const signToken = (payload:JwtPayload) => {
    return Jwt.sign(payload, APP_SECRET as string, {expiresIn: '1d'})
}

export const verifyJwt = (token: string) => {
    return Jwt.verify(token, APP_SECRET as string)
}