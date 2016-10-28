const http = require('http');
const parseUrl = require('url').parse;
const fs = require('fs');
const qs = require('querystring');
const sander = require('sander');
const bodyReader = require('./body-reader');
const Stream = require('stream');

let basedir = 'data/';
let filename = 'teams.json';

module.exports = http.createServer((req, res) => {

  const url = parseUrl(req.url);
  const queryData = url.parse(req.url, true).query;
  console.log('requested resource:', req.method, url.pathname);

  //catch attempt at non-existent page
  if (req.method === 'GET' && url.pathname !== '/' && url.pathname !== '/teams') {
    res.write('404 - Not Found');
    res.end();
  };

  //home page
  if (req.method === 'GET' && url.pathname === '/') {
    res.write('Home Page. Go to /teams for content');
    res.end();
  };
  
  //GET - List all teams
  if (req.method === 'GET' && url.pathname === '/teams' &&! queryData.team) {
    sander.readFile(basedir, filename).then(result => {
      var content = JSON.parse(result);
      res.writeHead(200, {'Content-Type': 'text/plain'});
      for ( var i=0; i<content.length; i++ ) {
        res.write(content[i].city + ' ' + content[i].name + '\n');
      }
      res.end();
    });
  }

  //GET - List a specific team via ?team=Cubs, for example
  if (queryData.team) {
    console.log(queryData.team);
    sander.readFile(basedir, filename).then(result => {
      var content = JSON.parse(result);
      res.writeHead(200, {'Content-Type': 'text/plain'});
      for ( var i=0; i<content.length; i++ ) {
        if (content[i].name === queryData.team) {
          res.write(content[i].city + ' ' + content[i].name);
          res.end();
        }
      }
    }
          );
  }

  // POST - add a new team in JSON format via body-reader.js
  if (req.method === 'POST'&& url.pathname === '/teams') {

    bodyReader(req, (err, team) => {
      if(err) {
        res.statusCode = 400;
        res.end(err.message);
      }
      else {
        res.statusCode = 200;
        res.write(`The ${team.name} have been added.`);
        sander.readFile(basedir, filename).then(result => {
          var content = JSON.parse(result);
          content.push(team);
          res.end();
          fs.writeFile(basedir + filename, JSON.stringify(content), function(err) {
            if(err) {
              return console.log(err);
            }
            console.log('Updated file has been saved');
          }); 
        });
      };
    });
  }

// PUT - edit an existing team's city in JSON format via body-reader.js and via ?team=Cubs, for example
  if (req.method === 'PUT' && queryData.team) {

    bodyReader(req, (err, team) => {
      if(err) {
        res.statusCode = 400;
        res.end(err.message);
      }
      else {
        res.statusCode = 200;
        res.write(`The ${team.name} have been edited.`);
        sander.readFile(basedir, filename).then(result => {
          var content = JSON.parse(result);

          for ( var i=0; i<content.length; i++ ) {
            if (content[i].name === queryData.team) {
              content.splice(i, 1, team);
              console.log(content);
            }
          }
          res.end();
          fs.writeFile(basedir + filename, JSON.stringify(content), function(err) {
            if(err) {
              return console.log(err);
            }
            console.log('Updated file has been saved');
          }); 
        });
      };
    });
  }

// DELETE - delete an existing team via ?team=Cubs, for example
  if (req.method === 'DELETE' && queryData.team) {

    res.statusCode = 200;
    res.write(`The ${queryData.team} have been deleted.`);
    sander.readFile(basedir, filename).then(result => {
      var content = JSON.parse(result);

      for ( var i=0; i<content.length; i++ ) {
        if (content[i].name === queryData.team) {
          content.splice(i, 1);
          console.log(content);
        }
      }
      res.end();
      fs.writeFile(basedir + filename, JSON.stringify(content), function(err) {
        if(err) {
          return console.log(err);
        }
        console.log('Updated file has been saved');
      }); 
    });
  };
  
});