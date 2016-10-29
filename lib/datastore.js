const sander = require('sander');
const path = require('path');


function write( data ) {
  return sander.writeFile( basedir, filename, data)
    .then(console.log('done'));
}

function getMany( dirname ) {
  return sander.readdir( dirname )
    .then(function(results){
      let message = '<h2>The data store contains the following files: </h2><ul>\n\n';
      results.map(function(cur, i, arr) {
        message += `<li>${cur}</li>`;
      });
      message += '</ul>';
      message += 'To retrieve a file, please query the file name';

      return message;
    })
}

function getOne( pathname, filename ) {
  console.log(path.resolve(pathname, filename));
  return sander.readFile(pathname, filename) // {encoding: 'application/json'}
    .then(function(results) { return results })
}

function deleteOne( filename ) {
  return sander.unlink( filename ).then(function(results) {
    console.log(result);
  });
}

function deleteAll( filename ) {
  return sander.rimraf( pathtodir ).then(function(results) {
    console.log(result);
  });
}

exports.write = write;
exports.getMany = getMany;
exports.getOne = getOne;
exports.deleteOne = deleteOne;