/*** Created by Gloria Anholt on 10/27/16. ***/

const server = require('./lib/http-server');
const port = process.env.PORT || 9999;

server.listen(port, err => {
  if (err) {
    console.error('Server error: ', err);
  } else {
    console.log('HTPP Server listening on port ', port);
  }
});