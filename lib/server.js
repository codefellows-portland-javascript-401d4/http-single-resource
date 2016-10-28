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
      bodyReader(req, (err, team) => {
        if(err) {
          res.statusCode = 400;
          console.log('POST 400 error');
          res.end(err.message);
        } else {
          res.writeHead(200, {
            'Content-Type': 'application/json' 
          });
          fileStore.createFile(team).then(data => {
            res.write(data);
            res.end();
          })
          .catch(err => {
            console.log('POST catch error');
            res.end(err);
          });
        }
      });
    } else if (method === 'GET') {
      fileStore.readDir(fileStore.path)
        .then(idArr => fileStore.getAll(idArr))
        .then(allData => {
          res.writeHead(200, {
            'Content-Type': 'application/json' 
          });
          res.write(JSON.stringify(allData));
          res.end();
        })
        .catch(err => {
          res.end(err);
        });
    }
  } else {
    let paths = pathName.split('/');
    if (paths[1] !== 'teams') {
      res.statusCode = 404;
      res.end('not found');    
    }
    let teamName = paths[2];
    fileStore.getFile('/' + teamName)
      .then(team => {
        if (method === 'GET') {
          res.writeHead(200, {
            'Content-Type': 'application/json'
          });
          res.end(team);
        } else if (method === 'PUT') {
          bodyReader(req, (err, team) => {
            if (err) {
              res.statusCode = 400;
              console.log('body reader error in server');
              res.end(err.message);
            } else {
              res.writeHead(200, {
                'Content-Type': 'application/json' 
              });
              fileStore.createFile(team)
              .then(data => {
                res.write(data);
                res.end();
              })
            .catch(err => {
              console.log('put catch error');
              res.end(err);
            });
            }

          });

        }
      })
      .catch(err => {
        console.log('what error is this');
        res.end(err);
      });

  }

});

module.exports = server;