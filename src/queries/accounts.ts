import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

export async function hash(clearPassword: string) {
  const hashedPassword = await bcryptjs.hash(clearPassword, 10);
  return hashedPassword;
}

export async function compare(password: string, hash: string) {
  const isPasswordValid = await bcryptjs.compare(password, hash);
  return isPasswordValid;
}

export async function signUser(id: number) {
  const token = jwt.sign({ id }, SECRET_KEY as string, {
    expiresIn: "1d",
  });
  return token;
}

export async function verifyUser(token: string) {
  if (!token) {
    return null;
  }
  let decoded;
  try {
    decoded = jwt.verify(token, SECRET_KEY as string);
  } catch (error) {
    return null;
  }
  if (!decoded) {
    return null;
  }
  return (decoded as any).id;
}