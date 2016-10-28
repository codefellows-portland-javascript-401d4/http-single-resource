


function serverError( err, response ) {
  console.error('File retrieval error.', err);
  response.statusCode = 500;
  response.status = 'Oops, Internal Server Error';
  response.write('Sorry, we got an internal error. Please try again.');
  response.end();
}

function aOk( message, response ) {
  console.log(message);
  response.statusCode = 200;
  response.status = 'A-Ok';
  response.write(message);
  response.end();
}