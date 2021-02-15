interface NoteStore {
  note: String;
}

interface UserStore {
  isAuthenticated: boolean;
}

interface RootStore {
  user: UserStore;
  note: NoteStore;
}

export type RootStoreType = RootStore;
