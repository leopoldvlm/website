import type {RequestHandler} from '@builder.io/qwik-city';
import {PrismaClient} from '@prisma/client';

export const onPost: RequestHandler<any> = async ({cookie}) => {
  // register a user.
  // sets token in thing.

  return {message: "This will log you in."}
};