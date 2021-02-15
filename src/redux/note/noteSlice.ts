import { NoteActionTypes } from "./types";
// Import Action Names
import { WRITE_NOTE } from "./types";

const initialState = {
  note: "",
};

// Actions

export const writeNote = (value: String) => {
  return {
    type: WRITE_NOTE,
    payload: value,
  };
};

// Reducer
const noteSlice = (state = initialState, action: NoteActionTypes) => {
  switch (action.type) {
    case WRITE_NOTE: {
      return {
        ...state,
        note: action.payload,
      };
    }
    default:
      return state;
  }
};

export default noteSlice;
