const NoteStore = require('./NoteStore');
const bodyParser = require('./BodyParser');
const path = require('path');

module.exports = function createNote(res_type, req, resp) {

  const noteStore = new NoteStore(path.join(__dirname, `../${res_type}`));

  bodyParser(req, (err, obj) => {
    if (err) {
      resp.statusCode = 400;
      resp.end(err.message);
    }
    else {
      resp.statusCode = 200;
      noteStore.store(obj)
        .then((id) => {
          resp.write(`Stored note as ${id}`);
          resp.end();
        })
        .catch((err) => {
          resp.statusCode = 500;
          resp.end(err.message);
        });
    }
  });
};
