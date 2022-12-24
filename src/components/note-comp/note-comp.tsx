import {component$, $} from '@builder.io/qwik';
import {Note} from '../../routes/index';

interface NoteProps {
  store: Note;
}

export const NoteHeader = component$((props: NoteProps) => {
  const emojis: string[] = [
    '🎄',
    '🐴',
    '🐞',
    '💨',
    '🈴',
    '✌️',
    '🏅',
    '💶',
    '🌭',
    '🍱',
  ];

  const resetStore$ = $(() => {
    props.store.content = '';
    props.store.title = '';
    props.store.emoji = '';
    props.store.id = undefined;
  });

  return (
    <header class=" h-20 border border-sky-600 flex flex-col place-content-evenly p-1">
      <input
        onChange$={(event) =>
          Object.assign(props.store, {title: event.target.value})
        }
        type="text"
        maxLength={240}
        value={props.store.title}
        placeholder="Title"
        class="focus:outline-none focus:border-b focus:border-black h-1/2 text-2xl placeholder:italic"
      />
      <div class="w-fit flex flex-row">
        <input
          onChange$={(event) =>
            Object.assign(props.store, {emoji: event.target.value})
          }
          type="text"
          maxLength={2}
          value={props.store.emoji}
          placeholder={emojis[Math.floor(Math.random() * emojis.length)]}
          class="focus:outline-none focus:border-b focus:border-black h-full w-6 placeholder:text-opacity-50"
        />
        <div
          class="mx-3 hover:cursor-pointer"
          onClick$={() => {
            fetch(`/notes/${props.store.id}`, {
              method: 'PUT',
              body: JSON.stringify(props.store),
            }).then((resp) => {
              if (resp.status !== 200) return;
              else
                resp.json().then((data) => {
                  props.store.id = undefined;
                  props.store.id = data.id;
                  // really not great but idk what else for now.
                });
            });
          }}
        >
          <i class="fa-solid fa-floppy-disk h-full hover:cursor-pointer mr-1"></i>
          Save
        </div>
        <div
          class="hover:cursor-pointer"
          onClick$={() => {
            fetch(`/notes/${props.store.id}`, {
              method: 'DELETE',
            }).then((resp) => {
              if (resp.status !== 200) return;
              else resetStore$();
            });
          }}
        >
          <i class="fa-solid fa-trash h-full hover:cursor-pointer mr-1"></i>
          Delete
        </div>
      </div>
    </header>
  );
});

export const NoteText = component$((props: NoteProps) => {
  return (
    <>
      <main class="flex-1 flex">
        <textarea
          onChange$={(event) =>
            Object.assign(props.store, {content: event.target.value})
          }
          class=" flex-1 resize-none focus:outline-none text-2xl p-6 placeholder:italic"
          placeholder="Start writing your note here"
          value={props.store.content}
        ></textarea>
      </main>
    </>
  );
});
