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

  

  if (pathName === '/teams') {
    if (method === 'POST') {
      bodyReader(req, (err, team, fileName) => {
        if(err) {
          res.statusCode = 400;
          res.end(err.message);
        }
        else {
          fileStore.readDir('./lib/dotaTeams').then(dirContents => {
            if(dirContents.indexOf(fileName) !== -1) {
              res.statusCode = 400;
              res.end('Resource already exists.');
            } else {
              res.writeHead(200, {
                'Content-Type': 'application/json' 
              });
              fileStore.createFile(team).then(data => {
                res.write(data);
                res.end();
              })
              .catch(err => {
                res.end(err);
              });
            }
          });
        }
      });
    } else if (method === 'GET') {
      fileStore.readDir('./lib/dotaTeams').then(dirContents => {
        res.writeHead(200, {
          'Content-Type': 'application/json' 
        });
        res.write(JSON.stringify(dirContents));
        res.end();
      });
    }
  } else {
    console.log('not /teams');
  }

});

module.exports = server;