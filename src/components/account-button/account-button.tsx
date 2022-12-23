import {component$, useStore, $} from '@builder.io/qwik';

export default component$(() => {
  const state = useStore({
    clicked: false,
  });

  const login$ = $(async () => {
    const resp = await fetch('/users/login', {
      method: 'POST',
      body: JSON.stringify({
        login: 'leo',
        password: 'password',
      }),
    });
    const json = resp.json();
    json.then((data) => {
      console.log(data);
    });
  });

  return (
    <div
      class={
        'bg-black text-white mx-auto my-2 w-5/6 ' +
        (state.clicked ? 'h-56 ' : ' h-16 ')
      }
    >
      <p onClick$={() => (state.clicked = !state.clicked)}>account btn</p>
      <button onClick$={async () => login$()} class="bg-white">
        login
      </button>
    </div>
  );
});
