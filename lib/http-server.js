const http = require('http');
const parserUrl = require('url').parse;
const qs = require('querystring');
const getOne = require('./get-one');
const get = require('./get-many');
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
    if (qs.id) {
      //call sanders get one
    } else {
      //call sanders get many
      console.log('Retrieving index of data files.');
      get.getMany('./data', response);
    }
  } else if (request.method === 'POST') {
    // call the sanders for post
  } else if (request.method === 'DELETE') {
    // call the sanders for delete
  }
});