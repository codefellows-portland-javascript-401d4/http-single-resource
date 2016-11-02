const server = require('./lib/taco_server');

const port = 5000;

server.listen(port, err => {
    if(err) console.log('ERROR!', err);
    else console.log('http server listening on port', port);
});
