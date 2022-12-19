import {component$} from "@builder.io/qwik";
import AccountButton from "../account-button/account-button";

interface SideBarProps {
  notes: {id: number; title: string; emoji: string}[];
}

export default component$((props: SideBarProps) => {
  const {notes} = props;

  return (
    <aside class="flex flex-col w-1/4 border border-black">
      <AccountButton />
      <button class="w-3/4 mx-auto flex flex-row place-content-center justify-center text-3xl group">
        <i class="fa-solid fa-plus mr-2 grid place-items-center group-hover:rotate-90"></i>
        Create a note
      </button>
      <ul class="before:content-['Notes:'] before:underline marker:content-['→'] marker:ba p-4">
        {notes.map((note) => (
          <li key={note.id} class="mx-5 my-2.5 break-words">
            {note.emoji +
              " " +
              (note.title === "" ? "Unnamed note" : note.title)}
          </li>
        ))}
      </ul>
    </aside>
  );
});
