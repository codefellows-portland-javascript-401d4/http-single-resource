const server = require('./httpServer');
const port = 8080;

module.exports = server.listen(port, (err) => {
    console.log('server now listening on', server.address().port);
});

