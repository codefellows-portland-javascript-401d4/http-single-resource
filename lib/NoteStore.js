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
    // console.log('Getting id ', id);
    return sander.readFile(this.dir, id)
      .then((data) => {
        // console.log('got the data from the NoteStore ', data);
        return JSON.parse(data);
      })
      .catch((err) => {
        // console.log('had an error ', err);
        return Error(err);
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