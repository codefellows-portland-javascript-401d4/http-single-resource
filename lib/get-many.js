const sander = require('sander');


function getMany( dirname, response ) {
  sander.readdir( dirname )
    .then(function(results){
      let message = '<h2>The data store contains the following files: </h2><ul>\n\n';
      results.map(function(cur, i, arr) {
        message += `<li>${cur}</li>`;
      });
      message += '</ul>';
      message += 'To retrieve a file, please query the file name';

      response.statusCode = 200;
      response.status = 'A-Ok';
      response.write(message);
      response.end();
  }).catch((err) => {
    if (err) {
      console.error('Directory retrieval error.', err);
      response.statusCode = 500;
      response.status = 'Oops, Internal Server Error';
      response.write('Sorry, we got an internal error. Please try again.');
      response.end();
    }
  })
}

module.exports = getMany;