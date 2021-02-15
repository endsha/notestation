export const WRITE_NOTE = "WRITE_NOTE";

interface WriteNoteAction {
  type: typeof WRITE_NOTE;
  payload: String;
}

export type NoteActionTypes = WriteNoteAction;
