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

  // Call sanders for the GET one, GET all, PUT, POST new, DELETE one
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

  } else if (request.method === 'PUT') {
    if (query.id) {
      console.log(`Updating ${query.id} file.`);
      let body = '';
      request.on('data', data => {
        body += data;
      });
      request.on('end', () => {
        const bodyObj = JSON.parse(body);
        const pathname = path.resolve(url.pathname.replace('/', ''));
        if (query.id.slice(-5) === '.json') {
          var filename = bodyObj['City'].toString().toLowerCase().replace(' ', '_') + '.json';
        } else {
          filename = bodyObj['City'].toString().toLowerCase().replace(' ', '_') + '.json';
        }
        const filepath = path.resolve(pathname, filename);
        ds.deleteOne(filepath)
          .catch((err) => {
            console.log('fs delete error');
          })
          .then(() => {
            ds.write(pathname, filename, body)
          })
          .then(() => {
            resHandler.aOk( `File ${filename} saved.`, response, 'text/plain');
          }).catch((err) => {
            resHandler.serverError(err);
          })
      })
    } else {
      resHandler.serverError('Please specify a file to update', response);
    }

  } else if (request.method === 'POST') {
    console.log('Writing new file.');
    let body = '';
    request.on('data', data => {
      body += data;
    });
    request.on('end', () => {
      const bodyObj = JSON.parse(body);
      const pathname = path.resolve(url.pathname.replace('/', ''));
      const filename = bodyObj['City'].toString().toLowerCase().replace(' ', '_') + '.json';

      ds.write(pathname, filename, body)
        .then(() => {
          resHandler.aOk( `File ${filename} saved.`, response, 'text/plain');
        })
        .catch((err) => {
          resHandler.serverError(err);
        })
    });

  } else if (request.method === 'DELETE') {
    // call ds method for delete
    if (query.id) {
      console.log(`Deleting ${query.id} file.`);
      const filename = query.id + '.json';
      let pathname = path.resolve(url.pathname.replace('/', ''), filename);
      ds.deleteOne(pathname)
        .then(() => {
          resHandler.aOk(`${filename} deleted successfully.`, response, type)
        }).catch((err) => {
          resHandler.serverError(err);
        })
      }
  }


});