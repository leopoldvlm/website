import {PrismaClient} from '@prisma/client';
import {hash} from './accounts';
const prisma = new PrismaClient();

/**
 * This file is used to manage users. With db queries. With prisma.
 */

export async function createUser(obj: {
  login: string;
  password: string;
  name: string;
}) {
  try {
    Object.assign(obj, {password: await hash(obj.password)});
    const user = await prisma.user.create({
      data: obj,
    });
    return user;
  } catch (error) {
    return null;
  }
}

export async function getUser(obj: {login: string}) {
  const user = await prisma.user.findUnique({
    where: {
      login: obj.login,
    },
  });

  return user;
}

export async function modifyUser(customUser: {
  id: number;
  login?: string;
  password?: string;
  name?: string;
}) {
  // if a new password is provided, hash it beforehand.
  if (customUser.password)
    customUser.password = await hash(customUser.password);

  const user = await prisma.user.update({
    where: {
      id: customUser.id,
    },
    data: customUser,
  });

  return user;
}
