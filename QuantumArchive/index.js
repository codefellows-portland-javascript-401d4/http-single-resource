const server = require('./lib/httpServer');
const port = process.env.PORT || 8999;

server.listen(port, err => {
    if (err) console.log('ERROR! ', err);
    else console.log('server listening to port', port);
});