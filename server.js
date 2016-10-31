const server = require('./lib/http-server');
const port = process.env.PORT || 8080;

server.listen(port, () => {
    console.log('server listening on port', 
        server.address().port);
});