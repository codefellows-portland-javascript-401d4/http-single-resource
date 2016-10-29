const NoteStore = require('./NoteStore');
const path = require('path');

module.exports = function readAllNotes(res_type, resp) {
  
  const noteStore = new NoteStore(path.join(__dirname, `../${res_type}`));
  
  noteStore.getAll()
    .then((data) => {
      resp.setHeader('Content-Type', 'application/json');
      resp.write(JSON.stringify(data));
      resp.end();
    })
    .catch((err) => {
      resp.statusCode = 404;
      resp.write(err.message);
      resp.end();
    });
};