import {component$, useStore, useResource$, Resource} from '@builder.io/qwik';
import {LoginForm, LogoutForm} from '../forms/forms';

export interface AccountStore {
  opened: boolean;
  user?: string;
  submit: number;
  login?: string;
  password?: string;
}

export default component$(() => {
  const store = useStore<AccountStore>({
    opened: false,
    user: '',
    submit: 0,
    login: undefined,
    password: undefined,
  });

  const login = useResource$<{error: string} | {message: string; user: string}>(
    async ({track, cleanup}) => {
      track(() => store.submit);
      if (!store.login || !store.password) return Promise.reject({error: ''});
      const abortController = new AbortController();
      cleanup(() => abortController.abort('cleanup'));
      const res = await fetch(`/users/login`, {
        signal: abortController.signal,
        method: 'POST',
        body: JSON.stringify({
          login: store.login,
          password: store.password,
        }),
      });

      if (res.status !== 200) {
        return Promise.reject(await res.json());
      }
      return res.json();
    }
  );

  return (
    <div
      class={
        'border border-black mx-auto my-2 w-5/6 overflow-hidden ' +
        (store.opened ? ' h-fit ' : ' h-10 ')
      }
    >
      <div
        class="flex flex-row p-2"
        onClick$={() => (store.opened = !store.opened)}
      >
        <Resource
          value={login}
          onPending={() => <p class=" w-full">Loading...</p>}
          onRejected={() => <p class="w-full">Unknown</p>}
          onResolved={(data) => {
            if ('user' in data) {
              store.user = data.user;
            } else {
              store.user = 'Error';
            }
            return <p class="w-full">{store.user}</p>;
          }}
        />
        <i
          class={
            'fa-solid fa-play w-5 h-5 aspect-square grid place-items-center' +
            (store.opened ? ' rotate-180 ' : ' rotate-90 ')
          }
        ></i>
      </div>
      <Resource
        value={login}
        onPending={() => <div>Login in...</div>}
        onRejected={(reason: {error: string}) => {
          return <LoginForm store={store} warning={reason.error} />;
        }}
        onResolved={() => {
          store.login = undefined;
          store.password = undefined;
          return <LogoutForm store={store} />;
        }}
      />
    </div>
  );
});
