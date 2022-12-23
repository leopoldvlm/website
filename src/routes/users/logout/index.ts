import type {RequestHandler} from '@builder.io/qwik-city';

export const onPost: RequestHandler<
  {message: string} | {error: string}
> = async ({response, cookie}) => {
  const token = cookie.get('token');
  if (!token) {
    response.error(400);
    return {error: 'You were not logged in.'};
  }
  cookie.delete('token', {path: '/'});
  return {message: 'Successfully logged off.'};
};
