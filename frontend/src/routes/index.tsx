import {component$, $, useStore} from "@builder.io/qwik";
import type {DocumentHead} from "@builder.io/qwik-city";
import Sidebar from "../components/sidebar/sidebar";
import {NoteHeader, NoteText} from "../components/note-comp/note-comp";

export interface NoteState {
  title: string;
  emoji: string;
  body: string;
  id?: number;
  notes: Array<Note>;
}

export interface Note {
  id: number;
  title: string;
  emoji: string;
  create?: Date;
  author?: number;
  body: string;
}

export default component$(() => {
  const baseNotes: Array<Note> = [
    {id: 1, title: "First note", emoji: "1️⃣", body: "First note ever!"},
    {id: 2, title: "Groceries", emoji: "🥛", body: "Buy milk"},
    {id: 3, title: "To do", emoji: "🤾‍♂️", body: "Do sport"},
    {id: 4, title: "What I like", emoji: "🍅", body: "I like tomatoes"},
    {
      id: 5,
      title: "DON'T FORGET",
      emoji: "",
      body: "Go to the moon on thursday",
    },
    {id: 6, title: "", emoji: "💢", body: "Unnamed notes are the worst."},
  ];

  const state = useStore<NoteState>({
    title: "Test note when coming on the page",
    emoji: "🥼",
    body: "This is the body of the note to test if I can do something.",
    id: undefined,
    notes: baseNotes,
  });

  const fetchNotes$ = $(
    async (
      url: string = "http://localhost:8000/api/notes/",
      options: Object = {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        referrerPolicy: "no-referrer",
      }
    ) => {
      const resp = await fetch(url, options);
      const json = resp.json();
      json.then((data: Array<Note>) => {
        const newNotes: Array<Note> = [];
        data.forEach((note) => {
          newNotes.push(note);
        });
        state.notes = newNotes;
      });
      console.log("successfully fetched notes!")
    }
  );

  const createEmptyNote$ = $(async (url: string) => {
    const body = {
      title: "New note",
      emoji: "🚀",
      body: "This is a brand new note.",
    };
    const options: Object = {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      referrerPolicy: "no-referrer",
    };
    const opt = {...options, body: JSON.stringify(body)};

    const resp = await fetch(url, opt);

    if (resp.status !== 201) {
      console.log("Could not create note...");
    } else {
      fetchNotes$();
    }
  });

  const updateInputContent$ = $((input: HTMLElement, content: string) => {
    input.textContent = content;
  });

  return (
    <section class="flex flex-1 flex-row min-h-full">
      <Sidebar
        notes={state.notes}
        refresh$={fetchNotes$}
        create$={createEmptyNote$}
      />
      <div class="flex flex-col w-3/4">
        <NoteHeader currentNote={state} updateNote$={updateInputContent$} />
        <NoteText currentNote={state} updateNote$={updateInputContent$} />
      </div>
    </section>
  );
});

export const head: DocumentHead = {
  title: "Welcome to notes",
  meta: [
    {
      name: "description",
      content: "The note app",
    },
  ],
};
