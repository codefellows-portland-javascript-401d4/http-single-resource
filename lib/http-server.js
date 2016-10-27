const http = require('http');
const getOne = require('./get-one');
const getMany = require('./get-many');
const deleteOne = require('./delete-one');
const deleteAll = require('./delete-all');
const writeNew = require('./write-new');

module.exports = http.createServer((request, response) => {

  response.statusCode = 200;
  // Call sanders for the GET one, GET all, POST new, DELETE one
  if (request.method === 'GET') {
    // check if it's one or many
  } else if (request.method === 'POST') {
    // call the sanders for post
  } else if (request.method === 'DELETE') {
    // call the sanders for delete
  }

});