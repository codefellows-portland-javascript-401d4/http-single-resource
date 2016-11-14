const http = require('http');
const sander = require('sander');
const path = require('path');

const readBody = require('./readBody.js');
const dataStore = require('./dataStore.js');
const resHandler = require('./resHandler.js');

const indexHtml = sander.createReadStream('index.html');

const server = http.createServer((req, res) => {
  res.statusCode = 200;

  const httpVerb = req.method;

  const pathObj = path.parse(req.url);

  const relPath = '.' + req.url;
  const dirName = pathObj.dir;
  const relDirName = '.' + dirName;
  const filename = pathObj.base;

  //server detemines CRUD method
  //then sends body to dataStore to handle fs operation
  //then sends response to resHandler to handle the response
  if (dirName === '/') {
    indexHtml.pipe(res);
  }else if(dirName === '/notes' && (filename) && httpVerb === 'POST') {
    readBody(req)
      .then((body) => {
        dataStore.stash(relPath, body, filename, relDirName);
      })
      .then((data) => {
        resHandler.writeStashMsg(res, data);
      })
    .catch((err) => {
      res.statusCode = 500;
      resHandler.errHandler(res);
      console.log(err);
    });
  }else if(dirName === '/notes' && (filename) && httpVerb === 'PUT') {
    readBody(req) 
      .then((body) => {
        dataStore.update(relPath, body);
      })
      .then(() => {
        resHandler.writeUpdateMsg(res);
      })
      .catch((err) => {
        res.statusCode = 500;
        resHandler.errHandler(res);
        console.log(err);
      });
  }else if(dirName === '/notes' && httpVerb === 'DELETE') {
    dataStore.remove(relPath)
      .then(() => {
        resHandler.writeDeleteMsg(res);
      })
      .catch((err) => {
        res.statusCode = 404;
        resHandler.errHandler(res);
        console.log(err);
      });
  }else if(dirName === '/notes' && (filename) && httpVerb === 'GET') {
    dataStore.retrieveFile(relPath)
      .then((data) => {
        resHandler.writeFile(data, res);
      })
      .catch((err, data) => {
        if (!data) {
          res.statusCode = 410;
          resHandler.errHandler(res);
          console.log(err);
        }else{
          res.statusCode = 500;
          resHandler.errHandler(res);
          console.log(err);
        }
        res.end();
      });
  }else if(dirName === '/notes' && httpVerb === 'GET') {
    dataStore.retrieveDir(relPath)
      .then((data) => {
        resHandler.writeDir(data, res);
      })
      .catch((err) => {
        res.statusCode = 500;
        resHandler.errHandler(res);
        console.log(err);
      });
  }else{
    res.statusCode = 400;
    resHandler.errHandler(res);
    console.log(res.statusCode, 'not valid path');
  }
});

module.exports = server;