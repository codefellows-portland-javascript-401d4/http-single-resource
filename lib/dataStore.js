const sander = require('sander');

//methods on dataStore correspond to CRUD operations
const dataStore = {};

//any errors thrown in a callback jump to the catch
//returning sander is the same thing as returning promise
dataStore.retrieveDir = (relPath) => {
  return sander.readdir(relPath);
};

dataStore.retrieveFile = (relPath) => {
  return sander.readFile(relPath);
};

dataStore.stash = (relPath, body) => {
  sander.writeFile(relPath, body);
};

dataStore.update = (relPath, body) => {
  return sander.writeFile(relPath, body);
};

dataStore.remove = (relPath) => {
  return sander.unlink(relPath);
};

module.exports = dataStore;