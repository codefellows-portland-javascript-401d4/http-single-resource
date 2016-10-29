const NoteStore = require('./NoteStore');
const path = require('path');

module.exports = function deleteNote(res_type, res_id, resp) {

  const noteStore = new NoteStore(path.join(__dirname, `../${res_type}`));

  noteStore.remove(res_id)
    .then((msg) => {
      resp.statusCode = 200;
      resp.write(msg);
      resp.end();
    })
    .catch((err) => {
      resp.statusCode = 500;
      resp.end(err.message);
    });
};