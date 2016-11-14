const DataStore = require('./DataStore');
const path = require('path');
const parseUrl = require('url').parse;

module.exports = function getHandler(req, resp) {
  const url = parseUrl(req.url, true);
  const res_type = url.pathname.split('/')[1];
  const res_id = url.pathname.split('/')[2];
  
  if (res_type && res_id) readNote(res_type, res_id, resp);
  else if (res_type && !res_id) readAllNotes(res_type, resp);
  else {
    resp.statusCode = 400;
    resp.end('Specify resource type (e.g. /notes) to get all or additionally resource id (e.g. /notes/note1) to get a specific instance');
  }
};

function readNote(res_type, res_id, resp) {
  
  const dataStore = new DataStore(path.join(__dirname, `../${res_type}`));

  dataStore.get(res_id)
    .then((data) => {
      resp.statusCode = 200;
      resp.setHeader('Content-Type', 'application/json');
      resp.write(JSON.stringify(data));
      resp.end();
    })
    .catch((err) => {
      if (err.code === 'ENOENT') {
        resp.statusCode = 404;
        resp.end();
      }
      else {
        resp.statusCode = 500;
        resp.end();
      }
    });
}

function readAllNotes(res_type, resp) {
  
  const dataStore = new DataStore(path.join(__dirname, `../${res_type}`));
  
  dataStore.getAll()
    .then((data) => {
      resp.setHeader('Content-Type', 'application/json');
      resp.write(JSON.stringify(data));
      resp.end();
    })
    .catch((err) => {
      resp.statusCode = 404;
      resp.write(err.message);
      resp.end();
    });
}