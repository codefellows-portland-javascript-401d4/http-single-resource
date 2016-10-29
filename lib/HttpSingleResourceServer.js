const http = require('http');
const parseUrl = require('url').parse;
const readAllNotes = require('./ReadAllNotes');
const readNote = require('./ReadNote');
const createNote = require('./createNote');
const updateNote = require('./updateNote');
const deleteNote = require('./deleteNote');

module.exports = http.createServer((req, resp) => {

  /* When handling a request, look at the method, the url, and the headers */

  const url = parseUrl(req.url, true); // true means parse the query string into key/value pairs
  const res_type = url.pathname.split('/')[1];
  const res_id = url.pathname.split('/')[2];

  if (req.method === 'GET') {
    if (res_type && !res_id) {
      readAllNotes(res_type, resp);
    }
    else if (res_type && res_id) {
      readNote(res_type, res_id, resp);
    }
    else {
      resp.statusCode = 404;
      resp.end();
    }
  }
  else if (req.method === 'POST' && res_type && !res_id) {
    createNote(res_type, req, resp);
  }
  else if (req.method === 'PUT' && res_type && res_id) {
    updateNote(res_type, res_id, req, resp);
  } 
  else if (req.method === 'DELETE' && res_type && res_id) {
    deleteNote(res_type, res_id, resp);
  }
  else {
    resp.statusCode = 404;
    resp.end();
  }
});