const http = require('http');
const parseUrl = require('url').parse;
const path = require('path');
const NoteStore = require('./NoteStore');
const bodyParser = require('./BodyParser');
const noteStore = new NoteStore(path.join(__dirname, '../notes'));

module.exports = http.createServer((req, resp) => {

  const url = parseUrl(req.url, true); // true means parse the query string into key/value pairs

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
          resp.write(err.message);
          resp.end();
        });
    }
    else if (url.pathname.length > 6 && url.pathname.split('/')[1] === 'notes') {
      // url.pathname.split('/')[2] should be the identifier
      noteStore.get(url.pathname.split('/')[2])
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

  else if (req.method === 'PUT') {

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
    resp.statusCode = 404;
    resp.end();
  }
  
});