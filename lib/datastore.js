const sander = require('sander');


function write( data ) {
  sander.writeFile( basedir, filename, data)
    .then(console.log('done'));
}

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

const path = require('path');


function getOne( pathname, filename, response ) {
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
}

function deleteOne( filename ) {
  sander.unlink( filename ).then(function(results) {
    console.log(result);
  });
}

function deleteAll( filename ) {
  sander.rimraf( pathtodir ).then(function(results) {
    console.log(result);
  });
}

exports.write = write;
exports.getMany = getMany;
exports.getOne = getOne;
exports.deleteOne = deleteOne;