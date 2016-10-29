const http = require('http');
const parseUrl = require('url').parse;
const path = require('path');
const NoteStore = require('./NoteStore');
const bodyParser = require('./BodyParser');
const readAllNotes = require('./ReadAllNotes');
const readNote = require('./ReadNote');
const createNote = require('./createNote');

const noteStore = new NoteStore(path.join(__dirname, '../notes'));

module.exports = http.createServer((req, resp) => {

  const url = parseUrl(req.url, true); // true means parse the query string into key/value pairs

  if (req.method === 'GET') {
    if (url.pathname === '/notes') {
      // TODO: break out into readAllNotes() handler
      readAllNotes('notes', resp);
    }
    else if (url.pathname.length > 6 && url.pathname.split('/')[1] === 'notes') {
      // TODO: break out into readNote(id) handler
      // url.pathname.split('/')[2] should be the identifier
      let res_type = url.pathname.split('/')[1];
      let res_id = url.pathname.split('/')[2];
      readNote(res_type, res_id, resp);
    }
    else {
      resp.statusCode = 404;
      resp.end();
    }
  }
  else if (req.method === 'POST') {
    // TODO: break out into createNote() handler
    createNote(url.pathname, req, resp);
  }

  else if (req.method === 'PUT') {
    // TODO: break out into updateNote(id) handler
    bodyParser(req, (err, objdata) => {
      if (err) {
        resp.statusCode = 400;
        resp.end(err.message);
      }
      else {
        resp.statusCode = 200;
        const url_pathname_arr = url.pathname.split('/');
        url_pathname_arr.shift();
        if (url_pathname_arr[0] === 'notes') {
          const id = url_pathname_arr[1];
          if (id) {
            noteStore.get(id)
              .then((obj) => {
                for (let key in objdata) {
                  obj[key] = objdata[key];
                }
                noteStore.store(obj)
                  .then(() => {
                    resp.write(`Stored note as ${id}`);
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
      }
    });

  } 
  else if (req.method === 'DELETE') {
    // TODO: break out into deleteNote(id) handler
    const url_pathname_arr = url.pathname.split('/');
    url_pathname_arr.shift();
    if (url_pathname_arr[0] === 'notes') {
      const id = url_pathname_arr[1];
      noteStore.remove(id)
        .then((msg) => {
          resp.statusCode = 200;
          resp.write(msg);
          resp.end();
        })
        .catch((err) => {
          resp.statusCode = 500;
          resp.end(err.message);
        });
    }
  }
  else {
    // TODO: break out into handleError() handler
    resp.statusCode = 404;
    resp.end();
  }
  
});