const http = require('http');
const parseUrl = require('url').parse;
const path = require('path');
const NoteStore = require('./NoteStore');

const noteStore = new NoteStore(path.join(__dirname, '../notes'));

module.exports = http.createServer((req, resp) => {

  const url = parseUrl(req.url, true); // true means parse the query string into key/value pairs
  // console.log('You requested ', url.pathname);

  if (req.method === 'GET') {
    if (url.pathname === '/notes') {
      noteStore.getAll()
        .then((data) => {
          resp.setHeader('Content-Type', 'application/json');
          resp.write(JSON.stringify(data));
          resp.end();
        })
        .catch((err) => {
          resp.statusCode = 404;
          resp.write(err);
          resp.end();
        });
    }
    else if (url.pathname.length > 6 && url.pathname.split('/')[1] === 'notes') {
      // url.pathname.split('/')[2] should be the identifier
      noteStore.get(url.pathname.split('/')[2])
        .then((data) => {
          resp.setHeader('Content-Type', 'application/json');
          resp.write(JSON.stringify(data));
          resp.end();
        })
        .catch((err) => {
          resp.statusCode = 404;
          resp.write(err);
          resp.end();
        });
    }
    else {
      resp.statusCode = 404;
      resp.end();
    }
  }
  else if (req.method === 'POST') {
    if (url.pathname === '/notes') {
      let obj = JSON.parse(req.body);
      noteStore.store(obj.id, obj.noteBody)
        .then(() => {
          resp.write(`Stored note as ${obj.id}`);
          resp.end();
        })
        .catch(() => {
          resp.statusCode = 500;
          resp.end();
        });
    }
  }
  // else if (req.method === 'PUT') {

  // }
  // else if (req.method === 'DELETE') {

  // }
  else {
    resp.statusCode = 404;
    resp.write('Not found');
    resp.end();
  }
  
});