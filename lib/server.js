const http = require('http');
const fileStore = require('./dotaTeam');
const parseUrl = require('url').parse;
const qs = require('querystring');
const bodyReader = require('./bodyReader');

const server = http.createServer((req, res) => {
  let method = req.method;
  let url = parseUrl(req.url);
  let queryStr = (url.query);
  let query = qs.parse(queryStr);
  let pathName = url.pathname;

  if (pathName === '/teams' && method === 'POST') {

    bodyReader(req, (err, team) => {
      if(err) {
        res.statusCode = 400;
        res.end(err.message);
      }
      else {
        res.writeHead(200, {
          'Content-Type': 'application/json' 
        });
        fileStore.createFile(query);
        res.write(JSON.stringify(query));
        res.end();
      }
    });
  }

});

module.exports = server;