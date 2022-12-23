import type {RequestHandler} from '@builder.io/qwik-city';
import {Prisma, PrismaClient, User} from '@prisma/client';
import bcryptjs from 'bcryptjs';

export const onPost: RequestHandler<Partial<User> | {error: string}> = async ({
  request,
  response,
}) => {
  const prisma = new PrismaClient();
  const {login, password, name} = await request.json();
  try {
    const user = await prisma.user.create({
      data: {
        login: login,
        password: await bcryptjs.hash(password, 10),
        name: name,
      },
      select: {
        login: true,
        name: true,
        password: false,
        id: false,
      },
    });
    return user;
  } catch (error) {
    let message;
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      message = `This ${error.meta?.target} is already in use. Please pick another.`;
    } else {
      message = 'Error, please try again.';
    }
    response.error(400);
    return {error: message};
  }
};
