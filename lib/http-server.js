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
  var type = request.headers['content-type'] ? request.headers['content-type'] : 'text/plain';
  response.statusCode = 200;

  // Call sanders for the GET one, GET all, POST new, DELETE one
  if (request.method === 'GET') {
    // check if it's one or many
    if (query.id) {
      //call sanders get one
      console.log(`Retrieving ${query.id} file. Content type: ${type}`);
      if (path.extname(query.id) === '.json') {
        let pathname = path.join('.', url.pathname);
        ds.getOne(pathname, query.id)
          .then((results) => {
            resHandler.aOk(results, response, type)
          }).catch((err) => {
            resHandler.serverError(err);
        })
      }
    } else {
      console.log('Retrieving index of data files.');
      let pathname = path.join('.', url.pathname);
      ds.getMany(pathname)
        .then((results) => {
          resHandler.aOk(results, response, type)
        }).catch((err) => {
        resHandler.serverError(err);
      })
    }
  } else if (request.method === 'POST') {
    // call ds method for post
    console.log('Writing new file.');
    let body = '';
    request.on('data', data => {
      body += data;
    });
    request.on('end', () => {
      const bodyObj = JSON.parse(body);
      const filename = bodyObj['City'].toString().toLowerCase().replace(' ', '_') + '.json';
      const pathname = path.resolve('data', filename);
      console.log('parameters are ', pathname, filename, bodyObj);
      ds.write(pathname, filename, bodyObj)
        .then(() => {
          resHandler.aOk( 'File saved.', response, 'text/plain')
        })
        .catch((err) => {
          resHandler.serverError(err);
        })
    });

  } else if (request.method === 'DELETE') {
    // call ds method for delete
  }


});