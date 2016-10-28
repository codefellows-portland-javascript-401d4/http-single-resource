const server = require('./lib/http-server');

const port = 9000;
server.listen(port, err => {
    if (err) console.log('Error', err);
    else console.log('http server listening on port ', port);
}) 