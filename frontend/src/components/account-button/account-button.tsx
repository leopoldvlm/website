import {component$, useStore} from "@builder.io/qwik";

export default component$(() => {
  const state = useStore({
    clicked: false,
  });

  return (
    <div
      onClick$={() => (state.clicked = !state.clicked)}
      class={
        "bg-black text-white mx-auto my-2 w-5/6 " +
        (state.clicked ? "h-56 " : " h-16 ")
      }
    >
      account btn
    </div>
  );
});
