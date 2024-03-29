import type {RequestHandler} from '@builder.io/qwik-city';
import {PrismaClient, Note} from '@prisma/client';
import verifyUser from '../../../utils/accounts';
import {prisma} from '~/utils/database';

export const onGet: RequestHandler<Partial<Note> | {error: string}> = async ({
  response,
  cookie,
  params,
}) => {
  const id = verifyUser(cookie);
  if (!id) {
    response.error(401);
    return {error: 'Unauthorized'};
  }
  const noteId: number = Number(params.noteId);

  // get note, then check its userId.
  const note = await getNote(prisma, noteId);

  if (note?.userId !== id) {
    response.error(401);
    return {error: 'Unauthorized (you do not own this note)'};
  }

  return note;
};

export const onPut: RequestHandler<Partial<Note> | {error: string}> = async ({
  request,
  response,
  cookie,
  params,
}) => {
  const id = verifyUser(cookie);
  if (!id) {
    response.error(401);
    return {error: 'Unauthorized'};
  }

  const noteId: number = Number(params.noteId);
  const note = await getNote(prisma, noteId);
  if (note?.userId !== id) {
    response.error(401);
    return {error: 'Unauthorized (you do not own this note)'};
  }

  // destructuring the request body into optional variables
  const {
    title = undefined,
    emoji = undefined,
    content = undefined,
  } = await request.json();

  try {
    const updatedNote = await prisma.note.update({
      where: {
        id: noteId,
      },
      data: {
        title,
        emoji,
        content,
      },
      select: {
        title: true,
        emoji: true,
        content: true,
        userId: true,
        id: true,
      },
    });
    return updatedNote;
  } catch (error) {
    response.error(500);
    return {error: 'Could not update the note.'};
  }
};

export const onDelete: RequestHandler<
  {message: string} | {error: string}
> = async ({cookie, params, response}) => {
  const id = verifyUser(cookie);
  if (!id) {
    response.error(401);
    return {error: 'Unauthorized'};
  }

  const noteId: number = Number(params.noteId);
  const note = await getNote(prisma, noteId);
  if (note?.userId !== id) {
    response.error(401);
    return {error: 'Unauthorized (you do not own this note)'};
  }

  const deletedNote = await prisma.note.delete({
    where: {
      id: noteId,
    },
  });
  if (!deletedNote) {
    response.error(500);
    return {error: 'Could not delete the note.'};
  }
  return {message: 'Note deleted.'};
};

async function getNote(prisma: PrismaClient, noteId: number) {
  return await prisma.note.findUnique({
    where: {
      id: noteId,
    },
    select: {
      title: true,
      emoji: true,
      content: true,
      id: true,
      userId: true,
      creation: false,
    },
  });
}
