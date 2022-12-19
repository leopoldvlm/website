import {component$, $, useStore} from "@builder.io/qwik";
import type {DocumentHead} from "@builder.io/qwik-city";
import Sidebar from "../components/sidebar/sidebar";
import {NoteHeader, NoteText} from "../components/note-comp/note-comp";

interface NoteState {
  title: string;
  emoji: string;
  content: string;
  id?: number
}

export default component$(() => {
  const notes = [
    {id: 1, title: "First note", emoji: "1️⃣", content: "First note ever!"},
    {id: 2, title: "Groceries", emoji: "🥛", content: "Buy milk"},
    {id: 3, title: "To do", emoji: "🤾‍♂️", content: "Do sport"},
    {id: 4, title: "What I like", emoji: "🍅", content: "I like tomatoes"},
    {
      id: 5,
      title: "DON'T FORGET",
      emoji: "",
      content: "Go to the moon on thursday",
    },
    {id: 6, title: "", emoji: "💢", content: "Unnamed notes are the worst."},
  ];

  const state = useStore<NoteState>({
    title: "",
    emoji: "",
    content: "",
    id: undefined
  });

  const stateChange$ = $((obj: Object) => {
    Object.assign(state, obj);
  })

  return (
    <section class="flex flex-1 flex-row min-h-full">
      <Sidebar notes={notes} />
      <div class="flex flex-col w-3/4">
        <NoteHeader change$={stateChange$} />
        <NoteText change$={stateChange$}/>
      </div>
      <button onClick$={() => console.log(state)}>Log note as json!</button>
    </section>
  );
});

export const head: DocumentHead = {
  title: "Welcome to notes",
  meta: [
    {
      name: "description",
      content: "The note app",
    },
  ],
};
