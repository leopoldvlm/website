import {component$, useResource$, Resource, useStore} from '@builder.io/qwik';
import AccountButton from '../account-button/account-button';

interface Note {
  id: number;
  title: string;
  emoji: string;
  create?: Date;
  author?: number;
  content: string;
}

interface SideBarProps {
  id: number;
}

export default component$((props: SideBarProps) => {
  const state = useStore({
    clicked: 0,
  });

  const noteResource = useResource$<Array<Partial<Note>>>(
    async ({track, cleanup}) => {
      track(() => state.clicked);
      const abortController = new AbortController();
      cleanup(() => abortController.abort('cleanup'));
      const res = await fetch(`/notes`, {
        signal: abortController.signal,
      });
      return res.json();
    }
  );

  return (
    <aside class="flex flex-col w-1/4 border border-black">
      <AccountButton />
      <button
        onClick$={() => console.error('not yet implemented')}
        class="w-3/4 mx-auto flex flex-row place-content-center justify-center text-3xl group"
      >
        <i class="fa-solid fa-plus mr-2 grid place-items-center group-hover:rotate-90"></i>
        Create a note
      </button>
      <ul class="before:content-['Notes:'] before:underline marker:content-['→'] p-4">
      <Resource
        value={noteResource}
        onPending={() => <li class="mx-5 my-2.5 break-words">🔃 Loading...</li>}
        onRejected={() => <li class="mx-5 my-2.5 break-words">❌ Failed to load notes</li>}
        onResolved={(notes: Array<Partial<Note>>) => {
          return (
            <>
              {notes.map((note) => (
                <li
                  key={note.id}
                  class="mx-5 my-2.5 break-words" // opacity-0 ease-in duration-100 transition-opacity
                  id={note.id?.toString()}
                  onClick$={(event) => console.log((event.target as HTMLElement).getAttribute('q:key'))}
                >
                  {(note.emoji === '' ? '❓' : note.emoji) +
                    ' ' +
                    (note.title === '' ? 'Unnamed note' : note.title)}
                </li>
              ))}
            </>
          );
        }}
      />
      </ul>
      <button onClick$={() => state.clicked++} class="group">
        Refresh data
        <i class="fa-solid fa-arrow-rotate-right ml-2 group-hover:animate-spin duration-[0ms]"></i>
      </button>
    </aside>
  );
});
