import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const defaultNoteSelect = {
  id: true,
  title: true,
  emoji: true,
  content: true,
};

export async function getUserNotes(userId: number) {
  const notes = await prisma.note.findMany({
    where: {
      userId: userId,
    },
    select: defaultNoteSelect,
  });
  return notes;
}

async function getNote(id: number) {
  const note = await prisma.note.findUnique({
    where: {
      id: id,
    },
  });
  return note;
}

export async function getNoteIfUser(noteId: number, userId: number) {
  const note = await getNote(noteId);
  if (note?.userId !== userId) {
    return null;
  }
  return note;
}

export async function createNote(
  obj: {
    title: string;
    emoji: string;
    content: string;
  },
  userId: number
) {
  const note = await prisma.note.create({
    data: {
      title: obj.title,
      emoji: "📝",
      content: obj.content,
      userId: userId,
    },
    select: defaultNoteSelect,
  });
  return note;
}

export async function updateNote(
  id: number,
  userId: number,
  obj: {
    title?: string;
    emoji?: string;
    content?: string;
  }
) {
  const note = await getNoteIfUser(id, userId);
  if (!note) {
    return null;
  }
  try {
    const updatedNote = await prisma.note.update({
      where: {
        id: id,
      },
      data: obj,
      select: defaultNoteSelect,
    });
    return updatedNote;
  } catch (error) {
    return null;
  }
}

export async function deleteNote(id: number, userId: number) {
  // need to use deleteMany because i need to filter on userId.
  // if there's a better way to do this would be nice.
  // but i don't really need the note anyway so it's alright ig.
  const note = await prisma.note.deleteMany({
    where: {
      id: id,
      userId: userId,
    },
  });
  if (note.count === 0) {
    return null;
  }
  return note;
}
