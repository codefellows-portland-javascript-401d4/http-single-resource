// Node modules
const http = require('http');
const parserUrl = require('url').parse;
const qs = require('querystring');
const path = require('path');
// My modules
const getOne = require('./get-one');
const getMany = require('./get-many');
const deleteOne = require('./delete-one');
const deleteAll = require('./delete-all');
const writeNew = require('./write-new');

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
        results = getOne(pathname, query.id, response);

      }

    } else {
      //call sanders get many
      console.log('Retrieving index of data files.');
      let pathname = path.join('.', url.pathname);
      getMany(pathname, response);
    }
  } else if (request.method === 'POST') {
    // call the sanders for post
  } else if (request.method === 'DELETE') {
    // call the sanders for delete
  }
});