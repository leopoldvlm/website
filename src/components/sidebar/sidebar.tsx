import {component$, useResource$, Resource, useStore} from '@builder.io/qwik';
import AccountButton from '../account-button/account-button';
import {Note} from '../../routes/index';

interface SideBarProps {
  store: Note;
}

export default component$((props: SideBarProps) => {
  const store = useStore({
    clicked: 0,
  });

  const noteResource = useResource$<Array<Partial<Note>>>(
    async ({track, cleanup}) => {
      track(() => store.clicked);
      track(() => props.store.id);
      const abortController = new AbortController();
      cleanup(() => abortController.abort('cleanup'));
      const res = await fetch(`/notes`, {
        signal: abortController.signal,
      });
      return res.json();
    }
  );

  return (
    <aside class="flex flex-col w-1/4 border border-black flex-1 max-h-screen overflow-x-scroll">
      <AccountButton />
      <button
        onClick$={() =>
          fetch('/notes', {
            method: 'POST',
            body: JSON.stringify({title: 'New note', emoji: '', content: ''}),
          }).then((resp) => {
            if (resp.status !== 201) throw Error;
            else
              resp.json().then((data: Note) => {
                props.store.id = data.id;
                store.clicked = store.clicked + 1;
              });
          })
        }
        class="w-3/4 mx-auto flex flex-row place-content-center justify-center text-3xl group"
      >
        <i class="fa-solid fa-plus mr-2 grid place-items-center group-hover:rotate-90"></i>
        Create a note
      </button>
      <button
        onClick$={() => (store.clicked = store.clicked + 1)}
        class="group pt-4"
      >
        Refresh data
        <i class="fa-solid fa-arrow-rotate-right ml-2 group-hover:animate-spin duration-[0ms]"></i>
      </button>
      <ul class="before:content-['Notes:'] before:underline marker:content-['→'] p-4">
        <Resource
          value={noteResource}
          // onPending={() => (
          //   <li class="mx-5 my-2.5 break-words">🔃 Loading...</li>
          // )}
          onRejected={() => (
            <li class="mx-5 my-2.5 break-words">❌ Failed to load notes</li>
          )}
          onResolved={(notes: Array<Partial<Note>>) => {
            return (
              <>
                {notes.map((note) => (
                  <li
                    key={note.id}
                    class="mx-5 my-2.5 break-words w-fit hover:cursor-pointer" // opacity-0 ease-in duration-100 transition-opacity
                    id={note.id?.toString()}
                    onClick$={(event) =>
                      (props.store.id = Number(
                        (event.target as HTMLElement).getAttribute('id')
                      ))
                    }
                  >
                    {(['', ' ', '  ', undefined].includes(note.emoji)
                      ? '❓'
                      : note.emoji) +
                      ' ' +
                      (note.title === '' ? 'Unnamed note' : note.title)}
                  </li>
                ))}
              </>
            );
          }}
        />
      </ul>
    </aside>
  );
});
