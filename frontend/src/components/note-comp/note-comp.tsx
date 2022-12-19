import {component$, PropFunction} from "@builder.io/qwik";

interface NoteProps {
  change$: PropFunction<(obj: Object) => void>;
}

export const NoteHeader = component$((props: NoteProps) => {
  const emojis: string[] = [
    "🎄",
    "🐴",
    "🐞",
    "💨",
    "🈴",
    "✌️",
    "🏅",
    "💶",
    "🌭",
    "🍱",
  ];

  return (
    <header class=" h-20 border border-sky-600">
      <input
        onChange$={(event) => (props.change$({title: event.target.value}))}
        type="text"
        maxLength={240}
        placeholder="Note title"
      />
      <input
        onChange$={(event) => (props.change$({emoji: event.target.value}))}
        type="text"
        maxLength={2}
        placeholder={emojis[Math.floor(Math.random() * emojis.length)]}
      />
    </header>
  );
});

export const NoteText = component$((props: NoteProps) => {
  return (
    <>
      <main class="flex-1 flex">
        <textarea
          onChange$={(event) => (props.change$({content: event.target.value}))}
          class=" flex-1 resize-none focus:outline-none text-2xl p-6"
          placeholder="Note to self..."
        ></textarea>
      </main>
    </>
  );
});
