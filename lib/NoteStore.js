const sander = require('sander');
// const path = require('path');

class NoteStore {
  constructor(dir) {
    this.dir = dir;
  }

  store(id, obj) {
    return sander.writeFile(this.dir, id, JSON.stringify(obj));
  }

  get(id) {
    return sander.readFile(this.dir, id);
  }

  getCollection() {

  }
}

module.exports = NoteStore;