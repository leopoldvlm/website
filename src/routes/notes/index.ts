import type {RequestHandler} from '@builder.io/qwik-city';
import {PrismaClient, Note} from '@prisma/client';

export const onGet: RequestHandler<Array<Partial<Note>>> = async ({params}) => {
  const prisma = new PrismaClient();
  // create a user
  const user = await prisma.user.create({
    data: {
      name: 'Alice',
      login: 'alice',
      password: 'password',
    },
  });

  const notes = await prisma.note.findMany();

  return notes;
};
