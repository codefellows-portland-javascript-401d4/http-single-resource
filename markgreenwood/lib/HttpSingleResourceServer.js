const http = require('http');
const getHandler = require('./GetHandler');
const postHandler = require('./PostHandler');
const putHandler = require('./PutHandler');
const deleteHandler = require('./DeleteHandler');

module.exports = http.createServer((req, resp) => {

  const dispatchTable = {
    'GET': getHandler,
    'POST': postHandler,
    'PUT': putHandler,
    'DELETE': deleteHandler
  };

  if (dispatchTable.hasOwnProperty(req.method)) {
    dispatchTable[req.method](req, resp);
  }
  else {
    resp.statusCode = 400;
    resp.end('Bad request - should be one of GET, POST, PUT, or DELETE');
  }

});