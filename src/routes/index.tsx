import {component$, $, useStore, useTask$} from '@builder.io/qwik';
import type {DocumentHead} from '@builder.io/qwik-city';
import Sidebar from '../components/sidebar/sidebar';
import {NoteHeader, NoteText} from '../components/note-comp/note-comp';

export interface NoteState {
  title: string;
  emoji: string;
  content: string;
  id: number;
}

export interface Note {
  id: number;
  title: string;
  emoji: string;
  content: string;
}

export default component$(() => {
  const store = useStore<NoteState>({
    title: 'Test note when coming on the page',
    emoji: '🥼',
    content: 'This is the body of the note to test if I can do something.',
    id: 0,
  });

  const updateInputContent$ = $((input: HTMLElement, content: string) => {
    input.textContent = content;
  });

  useTask$(({ track }) => {
    const id = track(() => store.id);
    console.log("clicked and id changed: " + id);
  });
  

  return (
    <>
      <section class="flex flex-1 flex-row min-h-full">
        <Sidebar state={store} />
        <div class="flex flex-col w-3/4">
          <NoteHeader store={store} updateNote$={updateInputContent$} />
          <NoteText store={store} updateNote$={updateInputContent$} />
        </div>
      </section>
    </>
  );
});

export const head: DocumentHead = {
  title: 'Welcome to notes',
  meta: [
    {
      name: 'description',
      content: 'The note app',
    },
  ],
};
