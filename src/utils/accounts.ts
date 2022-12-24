import { Cookie } from "@builder.io/qwik-city";
import jwt from "jsonwebtoken"
import * as dotenv from "dotenv"

export default function verifyUser(cookie: Cookie): number | null {
  const token = cookie.get('token');
  if (!token) {
    return null;
  }
  let decoded;
  dotenv.config();
  const SECRET_KEY = process.env.SECRET_KEY;
  try {
    decoded = jwt.verify(token.value, SECRET_KEY as string);
  } catch (error) {
    return null;
  }
  if (!decoded) {
    return null;
  }
  return (decoded as any).id;
}