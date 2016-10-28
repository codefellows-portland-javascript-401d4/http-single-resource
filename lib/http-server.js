// Node modules
const http = require('http');
const parserUrl = require('url').parse;
const qs = require('querystring');
const path = require('path');
// My modules
const ds = require('./datastore');
const resHandler = require('./responseHandler');


module.exports = http.createServer((request, response) => {

  var url = parserUrl(request.url);
  var query = qs.parse(url.query);
  response.statusCode = 200;

  // Call sanders for the GET one, GET all, POST new, DELETE one
  if (request.method === 'GET') {
    // check if it's one or many
    if (query.id) {
      //call sanders get one
      if (path.extname(query.id) === '.json') {
        let pathname = path.join('.', url.pathname);
        console.log('the path is ', url.pathname, query.id);
        let results = ds.getOne(pathname, query.id);

      }
    } else {
      console.log('Retrieving index of data files.');
      let pathname = path.join('.', url.pathname);
      ds.getMany(pathname);
    }
  } else if (request.method === 'POST') {
    // call ds method for post
  } else if (request.method === 'DELETE') {
    // call ds method for delete
  }
});