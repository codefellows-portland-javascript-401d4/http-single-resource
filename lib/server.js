const http = require('http');
const url = require('url');
const sander = require('sander');
//const Stream = require('stream');

const dataStore = require('./dataStore.js');
const indexHtml = sander.createReadStream('index.html');

const server = http.createServer((req, res) => {
  res.statusCode = 200;

  const parsedUrl = url.parse(req.url, true);
  //const queryObj = parsedUrl.query;
  const httpVerb = req.method;

  const fullPath = parsedUrl.pathname;
  const splitPath = fullPath.split('/');

  const dirName = '/' + splitPath[1];
  const filename = splitPath[2];


  //server decides what CRUD method then dataStore handles the fs operation
  if (dirName === '/') {
    indexHtml.pipe(res);
  }else if(dirName === '/notes' && (filename) && httpVerb === 'POST') {
    readBody(req, (err, body) => {
      if (err) console.log(err);
      console.log(body);
      dataStore.stash(fullPath, body, (err, data) => {
        if (err) {
          res.write(JSON.stringify(err));
          console.log(err);
        }else{
          res.write(JSON.stringify(data));
        }
        res.end();
      });
    });
  }else if(dirName === '/notes' && httpVerb === 'PUT') {
    readBody(req, (err, body) => {
      if (err) console.log(err);
      console.log(body);
      dataStore.stash(fullPath, body, (err, data) => {
        if (err) {
          res.write(JSON.stringify(err));
          console.log(err);
        }else{
          res.write(JSON.stringify(data));
        }
        res.end();
      });
    });
  }else if(dirName === '/notes' && httpVerb === 'DELETE') {
    dataStore.remove(fullPath, (err, data) => {
      if (err) {
        res.write(JSON.stringify(err));
        console.log(err);
      }else{
        res.write(JSON.stringify(data));
      }
      res.end();
    });
  }else if(dirName === '/notes' && (filename) && httpVerb === 'GET') {
    dataStore.retrieveFile(fullPath, filename, (err, data) => {
      if (err) {
        res.write(JSON.stringify(err));
        console.log(err);
        //if no data in the note part
      }else if (!JSON.parse(data)['text']) {
        res.write('That note is empty. Perhaps you meant to update the note');
      }else{
        res.write(data);
      }
      res.end();
    });
  }else if(dirName === '/notes' && httpVerb === 'GET') {
    dataStore.retrieveDir(fullPath, (err, data) => {
      if (err) {
        res.write(JSON.stringify(err));
        console.log(err);
      }else if (data.length === 0) {
        res.write('There are no notes, add some!');
      }else{
        data.forEach((file) => {
          res.write(file);
          res.write('\n');
        });
      }
      res.end();
    });
  }else{
    res.statusCode = 404;
    console.log(res.statusCode);
    res.write(`there is no path at ${fullPath} please check your map`);
    res.end();
  }
});

const port = 8080;
server.listen(port, err => {
  if (err) console.log('ERROR!', err);
  else console.log('http server listening on port', port);
});

function readBody(req, cb) {
  let body = '';

  req.on('data', (data) => {
    body += data;
  });

  req.on('end', () => {
    try {
      cb(null, body);
    }
    catch (err) {
      cb(err);
    }
  });
}

//use promises in place of callbacks in the server - affects dataStore.js
//take functionality inside each case in server and encapsulate into separate functions
//make readBody a separate file and require it in
//revisit separated case functions and maybe make them methods on a object that is in a separate file
//create a separate index.js file for the server listener
//differntiate functionality for put & post