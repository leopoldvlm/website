import type {RequestHandler} from '@builder.io/qwik-city';
import {PrismaClient, Note} from '@prisma/client';
import verifyUser from '../../account/accounts';

export const onGet: RequestHandler<
  Array<Partial<Note>> | {error: string}
> = async ({cookie, response}) => {
  const id = verifyUser(cookie);
  if (!id) {
    response.error(401);
    return {error: 'Unauthorized.'};
  }

  const prisma = new PrismaClient();
  const notes = await prisma.note.findMany({
    where: {
      userId: id
    },
    select: {
      id: true,
      title: true,
      content: true,
      emoji: true,
      creation: false,
      userId: false,
    },
  });

  // close the database connection
  prisma.$disconnect();

  return notes;
};

export const onPost: RequestHandler<any> = async () => {
  // create a note.
  return {message: 'this will create a note and return it.'};
};
