const http = require('http');
const parseUrl = require('url').parse;
// const path = require('path');
// const NoteStore = require('./NoteStore');
// const bodyParser = require('./BodyParser');
const readAllNotes = require('./ReadAllNotes');
const readNote = require('./ReadNote');
const createNote = require('./createNote');
const updateNote = require('./updateNote');
const deleteNote = require('./deleteNote');

// const noteStore = new NoteStore(path.join(__dirname, '../notes'));

module.exports = http.createServer((req, resp) => {

  const url = parseUrl(req.url, true); // true means parse the query string into key/value pairs

  if (req.method === 'GET') {
    if (url.pathname === '/notes') {
      readAllNotes('notes', resp);
    }
    else if (url.pathname.length > 6 && url.pathname.split('/')[1] === 'notes') {
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
    createNote(url.pathname, req, resp);
  }
  else if (req.method === 'PUT') {
    let res_type = url.pathname.split('/')[1];
    let res_id = url.pathname.split('/')[2];
    updateNote(res_type, res_id, req, resp);
  } 
  else if (req.method === 'DELETE') {
    // TODO: break out into deleteNote(id) handler
    let res_type = url.pathname.split('/')[1];
    let res_id = url.pathname.split('/')[2];
    deleteNote(res_type, res_id, resp);
  }
  else {
    // TODO: break out into handleError() handler
    resp.statusCode = 404;
    resp.end();
  }
  
});