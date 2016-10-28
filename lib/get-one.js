const sander = require('sander');
const path = require('path');


module.exports = function( pathname, filename, response ) {
  console.log(path.resolve(pathname, filename));
  sander.readFile(pathname, filename) // {encoding: 'application/json'}
    .then(function(results) {
      console.log(results.toString())
    }).catch((err) => {
    if (err) {
      console.error('File retrieval error.', err);
      response.statusCode = 500;
      response.status = 'Oops, Internal Server Error';
      response.write('Sorry, we got an internal error. Please try again.');
      response.end();
    }
  });
};
