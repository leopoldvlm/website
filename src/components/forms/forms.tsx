import {component$} from '@builder.io/qwik';
import {AccountStore} from '../account-button/account-button';

interface FormProps {
  store: AccountStore;
  warning?: string;
}

export const LoginForm = component$((props: FormProps) => {

  return (
    <div class="p-2">
      <form>
        <input
          type="text"
          name="login"
          id="login"
          class=" w-full border border-black"
          onChange$={(event) => (props.store.login = event.target.value)}
        />
        <input
          type="password"
          name="password"
          id="password"
          class=" w-full border border-black"
          onChange$={(event) => (props.store.password = event.target.value)}
        />
      </form>
      <button onClick$={() => props.store.submit++}>
        Login
      </button>
      <p>
        {props.warning}
      </p>
    </div>
  );
});

export const RegisterForm = component$((props: FormProps) => {
  return <div></div>;
});

export const LogoutForm = component$((props: FormProps) => {
  return (
    <button onClick$={() => {
      fetch('/users/logout', {method: 'POST'}).then((resp) => {
        if (resp.status !== 200) return;
        else props.store.submit = 0;
      })
    }}>
      Log out
    </button>
  );
})