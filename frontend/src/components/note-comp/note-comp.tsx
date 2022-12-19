import {component$, PropFunction} from "@builder.io/qwik";

interface NoteHeadProps {
  title$: PropFunction<(title: string) => void>;
  emoji$: PropFunction<(emoji: string) => void>;
}

export const NoteHeader = component$((props: NoteHeadProps) => {
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
        onChange$={(event) => (props.title$(event.target.value))}
        type="text"
        maxLength={240}
        placeholder="Note title"
      />
      <input
        onChange$={(event) => (props.emoji$(event.target.value))}
        type="text"
        maxLength={2}
        placeholder={emojis[Math.floor(Math.random() * emojis.length)]}
      />
    </header>
  );
});

interface NoteTextProps {
  content$: PropFunction<(content: string) => void>;
}

export const NoteText = component$((props: NoteTextProps) => {
  return (
    <>
      <main class="flex-1 flex">
        <textarea
          onChange$={(event) => (props.content$(event.target.value))}
          class=" flex-1 resize-none focus:outline-none text-2xl p-6"
          placeholder="Note to self..."
        ></textarea>
      </main>
    </>
  );
});
