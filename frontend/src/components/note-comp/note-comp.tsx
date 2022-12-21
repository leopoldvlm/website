import {component$, PropFunction} from "@builder.io/qwik";
import { NoteState } from "../../routes/index";

interface NoteProps {
  currentNote: NoteState;
  updateNote$: PropFunction<(input: HTMLElement, content: string) => void>;
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
    <header class=" h-20 border border-sky-600 flex flex-col place-content-evenly p-1">
      <input
        onChange$={(event) => Object.assign(props.currentNote, {title: event.target.value})}
        type="text"
        maxLength={240}
        placeholder="Note title"
        class="focus:outline-none focus:border-b focus:border-black h-1/2 text-2xl"
      />
      <div class="w-fit flex flex-row">
        <input
          onChange$={(event) => Object.assign(props.currentNote, {emoji: event.target.value})}
          type="text"
          maxLength={2}
          placeholder={emojis[Math.floor(Math.random() * emojis.length)]}
          class="focus:outline-none focus:border-b focus:border-black h-full w-6 placeholder:text-opacity-50"
        />
        <div class="mx-3 hover:cursor-pointer" onClick$={()=>console.log("saving...")}>
          <i class="fa-solid fa-floppy-disk h-full hover:cursor-pointer mr-1"></i>
          Save
        </div>
        <div class="hover:cursor-pointer" onClick$={()=>console.log("deleting...")}>
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
          onChange$={(event) => Object.assign(props.currentNote, {content: event.target.value})}
          class=" flex-1 resize-none focus:outline-none text-2xl p-6"
          placeholder="Note to self..."
        ></textarea>
      </main>
    </>
  );
});
