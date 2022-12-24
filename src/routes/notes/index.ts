import type {RequestHandler} from '@builder.io/qwik-city';
import {Note} from '@prisma/client';
import verifyUser from '../../utils/accounts';
import {prisma} from '~/utils/database';

export const onGet: RequestHandler<
  Array<Partial<Note>> | {error: string}
> = async ({cookie, response}) => {
  const id = verifyUser(cookie);
  if (!id) {
    response.error(401);
    return {error: 'Unauthorized.'};
  }

  const notes = await prisma.note.findMany({
    where: {
      userId: id,
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

  return notes;
};

export const onPost: RequestHandler<Partial<Note> | {error: string}> = async ({
  request,
  response,
  cookie,
}) => {
  const id = verifyUser(cookie);
  if (!id) {
    response.error(401);
    return {error: 'Unauthorized'};
  }
  const {title = '', emoji = '', content = ''} = await request.json();

  const note = await prisma.note.create({
    data: {
      title: title,
      emoji: emoji,
      content: content,
      userId: id,
    },
    select: {
      title: true,
      emoji: true,
      content: true,
      userId: false,
    },
  });
  response.status = 201;

  return note;
};
