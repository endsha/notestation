import { combineReducers } from "redux";

import noteReducer from "./note/noteSlice";
import userReducer from "./user/userSlice";

const rootReducer = combineReducers({
  note: noteReducer,
  user: userReducer,
});

export default rootReducer;
