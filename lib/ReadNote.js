const NoteStore = require('./NoteStore');
const path = require('path');

module.exports = function readNote(res_type, res_id, resp) {
  
  const noteStore = new NoteStore(path.join(__dirname, `../${res_type}`));

  noteStore.get(res_id)
    .then((data) => {
      resp.statusCode = 200;
      resp.setHeader('Content-Type', 'application/json');
      resp.write(JSON.stringify(data));
      resp.end();
    })
    .catch((err) => {
      if (err.code === 'ENOENT') {
        resp.statusCode = 404;
        resp.end();
      }
      else {
        resp.statusCode = 500;
        resp.end();
      }
    });

};