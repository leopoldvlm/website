import {component$, useStore, useTask$} from '@builder.io/qwik';
import type {DocumentHead} from '@builder.io/qwik-city';
import Sidebar from '../components/sidebar/sidebar';
import {NoteHeader, NoteText} from '../components/note-comp/note-comp';

export interface Note {
  id?: number;
  title: string;
  emoji: string;
  content: string;
}

export default component$(() => {
  const store = useStore<Note>({
    title: '',
    emoji: '',
    content: '',
    id: undefined,
  });

  useTask$(({track}) => {
    const id = track(() => store.id);
    if (id === undefined) {
      return;
    }
    fetch(`/notes/${id}`, {
      method: 'GET',
    })
      .then((res) =>
        res.json().then((data: Partial<Note>) => {
          store.title = data.title ?? '';
          store.emoji = data.emoji ?? '';
          store.content = data.content ?? '';
        })
      )
      .catch((error) => console.log(error));
  });

  return (
    <>
      <section class="flex flex-1 flex-row min-h-full">
        <Sidebar store={store} />
        <div class="flex flex-col w-3/4">
          <NoteHeader store={store} />
          <NoteText store={store} />
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
