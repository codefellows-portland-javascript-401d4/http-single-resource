const sander = require('sander');
// const path = require('path');

class NoteStore {
  constructor(dir) {
    this.dir = dir;
  }

  store(obj) {
    return sander.writeFile(this.dir, obj.id, JSON.stringify(obj))
      .then(() => { return obj.id; });
  }

  get(id) {
    return sander.readFile(this.dir, id)
      .then((data) => {
        return JSON.parse(data);
      });
  }

  remove(id) {
    return sander.unlink(this.dir, id)
      .then(() => {
        return `Deleted note ${id}`;
      });
  }

  getAll() {
    return sander.readdir(this.dir)
      .then((files) => {
        return Promise.all(files.map((f) => { return this.get(f); }));
      });
  }
}

module.exports = NoteStore;