const http = require('http');
const fileStore = require('./dotaTeam');
const parseUrl = require('url').parse;
const qs = require('querystring');
const handlers = require('../handlers');

const server = http.createServer((req, res) => {
  console.log('Connection detected!');
  let method = req.method;
  let url = parseUrl(req.url);
  let queryStr = (url.query);
  let query = qs.parse(queryStr);
  let pathName = url.pathname;
  let paths = pathName.split('/');

  switch (true) {
  case pathName === '/teams' && method === 'GET':

    handlers.getAll(req, res);
    break;
  case method === 'GET':
    handlers.getSingle(req, res, paths[2]);
    break;
  case method === 'PUT':
    handlers.put(req, res, paths[2]);
    break;
  case method === 'DELETE' :
    handlers.destroy(req, res, paths[2]);
    break;
  case method === 'POST':
    handlers.post(req,res);
    break;
  default:
    handlers.notFound(res);
  };

  
});

module.exports = server;

