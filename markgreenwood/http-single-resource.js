const server = require('./lib/HttpSingleResourceServer');

let port = process.argv[2] || 3000;
server.listen(port, err => {
  if (err) console.log('ERROR! ', err);
  else console.log('server listening on port ' + port);
});