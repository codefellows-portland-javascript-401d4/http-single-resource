const NoteStore = require('./NoteStore');
const bodyParser = require('./BodyParser');
const path = require('path');

module.exports = function updateNote(res_type, res_id, req, resp) {

  const noteStore = new NoteStore(path.join(__dirname, `../${res_type}`));

  bodyParser(req, (err, objdata) => {
    if (err) {
      resp.statusCode = 400;
      resp.end(err.message);
    }
    else {
      resp.statusCode = 200;
      if (res_id) {
        noteStore.get(res_id)
          .then((obj) => {
            for (let key in objdata) {
              obj[key] = objdata[key];
            }
            noteStore.store(obj)
              .then(() => {
                resp.write(`Stored note as ${res_id}`);
                resp.end();
              })
              .catch((err) => {
                resp.statusCode = 500;
                resp.end(err.message);
              });
          })
          .catch((err) => {
            resp.statusCode = 500;
            resp.end(err.message);
          });
      }
    }
  });
};