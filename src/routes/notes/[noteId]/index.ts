import type {RequestHandler} from '@builder.io/qwik-city';
import {PrismaClient} from '@prisma/client';

export const onGet: RequestHandler<any> = async ({cookie, params}) => {
  return {message: `This will retrieve the note of id ${params.noteId}`};
};

export const onPut: RequestHandler<any> = async ({cookie, params}) => {
  return {message: `This will modify the note of id ${params.noteId}`};
};

export const onDelete: RequestHandler<any> = async ({cookie, params}) => {
    return {message: `This will delete the note of id ${params.noteId}`}
  };