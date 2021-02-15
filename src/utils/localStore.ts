class localStore {
  version: string = "v0.1.0";
  name: string = "NoteStation";
  store: { __v?: string; [x: string]: any } = {};
  constructor(version?: string, name?: string) {
    if (version) this.version = version;
    if (name) this.name = name;
    if (global.localStorage) {
      this.store = JSON.parse(localStorage[this.name] || "{}");
      if (this.store && this.store.__v !== this.version) {
        localStorage[this.name] = `{"__v": "${this.version}"}`;
        this.store = { __v: this.version };
      }
    }
  }
  get(key: string) {
    if (global.localStorage) return this.store[key];
  }
  set(key: string, value: any) {
    this.store[key] = value;
    localStorage[this.name] = JSON.stringify(this.store);
  }
  clear(key: string) {
    delete this.store[key];
    localStorage[this.name] = JSON.stringify(this.store);
    return this.store[key];
  }
}

const _localStore = new localStore();

const queryStore = {
  set: (key: string, value: any) => _localStore.set(key, value),
  get: (key: string) => _localStore.get(key),
  clear: (key: string) => _localStore.clear(key),
};
export default queryStore;
