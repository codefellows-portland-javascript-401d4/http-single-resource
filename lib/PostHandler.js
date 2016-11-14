const DataStore = require('./DataStore');
const bodyParser = require('./BodyParser');
const path = require('path');
const parseUrl = require('url').parse;

module.exports = function postHandler(req, resp) {
  const url = parseUrl(req.url, true);
  const res_type = url.pathname.split('/')[1];
  // const res_id = url.pathname.split('/')[2];

  createNote(res_type, req, resp);
};

function createNote(res_type, req, resp) {

  const dataStore = new DataStore(path.join(__dirname, `../${res_type}`));

  bodyParser(req, (err, obj) => {
    if (err) {
      resp.statusCode = 400;
      resp.end(err.message);
    }
    else {
      resp.statusCode = 200;
      dataStore.store(obj)
        .then((id) => {
          resp.write(`Stored note as ${id}`);
          resp.end();
        })
        .catch((err) => {
          resp.statusCode = 500;
          resp.end(err.message);
        });
    }
  });
}
