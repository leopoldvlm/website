import {RequestHandler} from '@builder.io/qwik-city';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import {prisma} from '~/utils/database';

export const onPost: RequestHandler<
  {error: string} | {message: string; user: string}
> = async ({request, response, cookie}) => {
  

  const {login, password} = await request.json();
  const user = await prisma.user.findUnique({
    where: {
      login: login,
    },
  });

  if (!user) {
    response.status = 400;
    return {error: 'This user does not exist.'};
  }
  if (!(await bcryptjs.compare(password, user?.password))) {
    response.status = 400;
    return {error: 'Incorrect password.'};
  }

  const token = cookie.get('token');
  if (token) {
    return {message: 'Already logged in.', user: user.login};
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
    return {message: 'Successfully logged in.', user: user.login};
  } catch (error) {
    response.status = 500;
    return {error: 'could not log you in.'};
  }
};
