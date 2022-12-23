import type {RequestHandler} from '@builder.io/qwik-city';
import {PrismaClient} from '@prisma/client';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

export const onPost: RequestHandler<
  {error: string} | {message: string}
> = async ({request, response, cookie}) => {
  const token = cookie.get('token');
  if (token) {
    response.error(400);
    return {error: 'Already logged in.'};
  }

  const prisma = new PrismaClient();

  const {login, password} = await request.json();
  const user = await prisma.user.findUnique({
    where: {
      login: login,
    },
  });

  if (!user) {
    response.error(400);
    return {error: 'This user does not exist.'};
  }
  if (!(await bcryptjs.compare(password, user?.password))) {
    response.error(400);
    return {error: 'Incorrect password.'};
  }

  dotenv.config();
  const SECRET_KEY = process.env.SECRET_KEY;

  try {
    const token = jwt.sign({id: user.id}, SECRET_KEY as string, {
      expiresIn: '1d',
    });
    cookie.set('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
    });
    return {message: 'Successfully logged in.'};
  } catch (error) {
    response.error(500);
    return {error: 'could not log you in.'};
  }
};
