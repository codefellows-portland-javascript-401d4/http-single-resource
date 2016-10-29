const http = require('http');
const getHandler = require('./GetHandler');
const postHandler = require('./PostHandler');
const putHandler = require('./PutHandler');
const deleteHandler = require('./DeleteHandler');

module.exports = http.createServer((req, resp) => {

  if (req.method === 'GET') {
    getHandler(req, resp);
  }
  else if (req.method === 'POST') {
    postHandler(req, resp);
  }
  else if (req.method === 'PUT') {
    putHandler(req, resp);
  } 
  else if (req.method === 'DELETE') {
    deleteHandler(req, resp);
  }
  else {
    resp.statusCode = 404;
    resp.end();
  }
  
});