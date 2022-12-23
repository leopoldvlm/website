import {component$, $, useStore} from '@builder.io/qwik';
import type {DocumentHead} from '@builder.io/qwik-city';
import Sidebar from '../components/sidebar/sidebar';
import {NoteHeader, NoteText} from '../components/note-comp/note-comp';

export interface NoteState {
  title: string;
  emoji: string;
  content: string;
  id?: number;
}

export interface Note {
  id: number;
  title: string;
  emoji: string;
  content: string;
}

export default component$(() => {
  const state = useStore<NoteState>({
    title: 'Test note when coming on the page',
    emoji: '🥼',
    content: 'This is the body of the note to test if I can do something.',
    id: undefined,
  });

  const updateInputContent$ = $((input: HTMLElement, content: string) => {
    input.textContent = content;
  });

  return (
    <>
      <section class="flex flex-1 flex-row min-h-full">
        <Sidebar id={state.id}/>
        <div class="flex flex-col w-3/4">
          <NoteHeader currentNote={state} updateNote$={updateInputContent$} />
          <NoteText currentNote={state} updateNote$={updateInputContent$} />
        </div>
      </section>
      <button onClick$={() => {}}>THIS IS FOR TESTING</button>
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
