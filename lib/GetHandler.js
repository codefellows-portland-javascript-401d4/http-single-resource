const NoteStore = require('./NoteStore');
const path = require('path');
const parseUrl = require('url').parse;

module.exports = function getHandler(req, resp) {
  const url = parseUrl(req.url, true);
  const res_type = url.pathname.split('/')[1];
  const res_id = url.pathname.split('/')[2];
  
  if (res_id) readNote(res_type, res_id, resp);
  else readAllNotes(res_type, resp);
};

function readNote(res_type, res_id, resp) {
  
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
}

function readAllNotes(res_type, resp) {
  
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
}