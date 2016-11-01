const sander = require('sander');

//methods on dataStore correspond to CRUD operations
const dataStore = {};

dataStore.retrieveDir = function(fullPath, cb) {
  let relPath = '.' + fullPath;
  sander.readdir(relPath)
    .then((data) => {
      cb(null, data);
    })
    .catch(() => {
      cb({err: '404 - Directory not found'});
    });
};

//any errors thrown in a callback jump to the catch
//retrieveFile could return a promise return before the sander
//returning sander is the same thing as returning promise
dataStore.retrieveFile = function(fullPath, filename, cb) {
  let relPath = '.' + fullPath;
  sander.readFile(relPath)
    .then((data) => {
      cb(null, data);
    })
    .catch(() => {
      cb({err: '404 - File not found', relPath});
    });
};

dataStore.stash = function(fullPath, body, cb) {
  let relPath = '.' + fullPath;
  sander.writeFile(relPath, body)
    .then(() => {
      cb(null, {text: 'Your file has been written'});
    })
    .catch(() => {
      cb({err: '500 - Internal Server Error'});
    });
};

dataStore.update = function(fullPath, body, cb) {
  let relPath = '.' + fullPath;
  sander.writeFile(relPath, body)
    .then(() => {
      cb(null, {text: 'Your file has been updated'});
    })
    .catch(() => {
      cb({err: '500 - Internal Server Error'});
    });
};

dataStore.remove = function(fullPath, cb) {
  let relPath = '.' + fullPath;
  sander.unlink(relPath)
    .then(() => {
      cb(null, {text: 'Your file has been deleted'});
    })
    .catch(() => {
      cb({err: '500 - Internal Server Error'});
    });
};








module.exports = dataStore;