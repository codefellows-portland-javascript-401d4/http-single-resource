const http = require('http');
const parseUrl = require('url').parse;
const getHandler = require('./GetHandler');
const postHandler = require('./PostHandler');
const putHandler = require('./PutHandler');
const deleteNote = require('./DeleteNote');

module.exports = http.createServer((req, resp) => {

  /* When handling a request, look at the method, the url, and the headers */

  const url = parseUrl(req.url, true); // true means parse the query string into key/value pairs
  const res_type = url.pathname.split('/')[1];
  const res_id = url.pathname.split('/')[2];

  if (req.method === 'GET') {
    getHandler(req, resp);
  }
  else if (req.method === 'POST') {
    postHandler(req, resp);
  }
  else if (req.method === 'PUT') {
    putHandler(req, resp);
  } 
  else if (req.method === 'DELETE' && res_type && res_id) {
    deleteNote(res_type, res_id, resp);
  }
  else {
    resp.statusCode = 404;
    resp.end();
  }
});