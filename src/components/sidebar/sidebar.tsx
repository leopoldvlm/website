import {component$, PropFunction} from "@builder.io/qwik";
import AccountButton from "../account-button/account-button";

interface Note {
  id: number;
  title: string;
  emoji: string;
  create?: Date;
  author?: number;
  content: string;
}

interface SideBarProps {
  notes: Array<Note>;
  refresh$: PropFunction<(url?: string, options?: Object) => void>;
  create$: PropFunction<(url: string) => void>;
}

export default component$((props: SideBarProps) => {
  const {notes} = props;

  return (
    <aside class="flex flex-col w-1/4 border border-black">
      <AccountButton />
      <button
        onClick$={async () => props.create$("http://localhost:3000/notes")}
        class="w-3/4 mx-auto flex flex-row place-content-center justify-center text-3xl group"
      >
        <i class="fa-solid fa-plus mr-2 grid place-items-center group-hover:rotate-90"></i>
        Create a note
      </button>
      <ul class="before:content-['Notes:'] before:underline marker:content-['→'] p-4">
        {notes.map((note) => (
          <li
            key={note.id}
            class="mx-5 my-2.5 break-words" // opacity-0 ease-in duration-100 transition-opacity
          >
            {(note.emoji === "" ? "❓" : note.emoji) +
              " " +
              (note.title === "" ? "Unnamed note" : note.title)}
          </li>
        ))}
      </ul>
      <button onClick$={async () => props.refresh$()} class="group">
        Refresh data
        <i class="fa-solid fa-arrow-rotate-right ml-2 group-hover:animate-spin duration-[0ms]"></i>
      </button>
    </aside>
  );
});
