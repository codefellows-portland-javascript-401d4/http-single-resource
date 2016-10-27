const http = require('http');
const fileStore = require('./dotaTeam');
const parseUrl = require('url').parse;
const qs = require('querystring');

const server = http.createServer((req, res) => {
  let method = req.method;
  let url = parseUrl(req.url);
  let queryStr = (url.query);
  let query = qs.parse(queryStr);
  // console.log(query);
  if (method === 'POST') {
    res.writeHead(200, {
      'Content-Type': 'application/json' 
    });
    // console.log('body', req.body);
    res.write(JSON.stringify(query));
    res.end();
  }

});

module.exports = server;