const http = require('http');
const parseUrl = require('url').parse;
const path = require('path');
const NoteStore = require('./NoteStore');

const noteStore = new NoteStore(path.join(__dirname, '../notes'));

// Marty's body parser from 10/26/2016 class
function bodyParser(req, cb) {

  let body = '';

  req.on('data', (data) => {
    body += data;
  });

  req.on('end', () => {
    try {
      // console.log(JSON.parse(body));
      cb(null, JSON.parse(body));
    }
    catch (err) {
      cb(err);
    }
  });
}

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
      // console.log('Getting ', url.pathname);
      noteStore.get(url.pathname.split('/')[2])
        .then((data) => {
          // console.log('Sending data back ', data);
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

    bodyParser(req, (err, obj) => {
      if (err) {
        resp.statusCode = 400;
        resp.end(err.message);
      }
      else {
        resp.statusCode = 200;
        if (url.pathname === '/notes') {
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
      }
    });

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