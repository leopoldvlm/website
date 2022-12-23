import type {RequestHandler} from '@builder.io/qwik-city';
import {PrismaClient, Note} from '@prisma/client';

export const onGet: RequestHandler<Array<Partial<Note>>> = async ({cookie}) => {
  const prisma = new PrismaClient();

  const notes = await prisma.note.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      emoji: true,
      creation: false,
      userId: false,
  }});
  cookie.set('hello', 'value', {sameSite: "strict", secure: true});

  // close the database connection
  prisma.$disconnect();

  return notes;
};

export const onPost: RequestHandler<any> = async () => {
  // create a note.
  return {message: "this will create a note and return it."}
}