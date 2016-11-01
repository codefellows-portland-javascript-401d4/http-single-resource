const server = require('./lib/football-server');
const port = 8080;

server.listen(port, err => {
    if(err) {
        console.log('ERROR!', err);
    } else {
        console.log('http server listening on port', port);
    }
})
