import {component$, Slot} from "@builder.io/qwik";
import Header from "../components/header/header";

export default component$(() => {
  return (
    <>
      <Header />
      <main class="flex-1 flex flex-col min-h-full">
        <Slot />
      </main>
      <footer>hi!</footer>
    </>
  );
});
