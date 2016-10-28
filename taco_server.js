const sander = require('sander');
const http = require('http');
const Stream = require('stream');



function getList(dir) {
    sander.readdir(dir).then(function(data) {
        console.log(data);
    });
}

function getFile(file) {
    sander.readFile(file).then(function(data) {
        console.log(data);
    });
}


const server = http.createServer(function (request, response) {
    console.log(request.method);

    if (request.url === '/tacos') {
        getList('tacos');
        // response.write();
    } else if (request.url === '/tacos/carnitas') {
        getFile('tacos/carnitas.json');
        console.log('is response stream?', response instanceof Stream);
    } else {
        response.statusCode = 404;
        response.write('page not found');
    } response.end();

});


const port = 5000;
server.listen(port, err => {
    if(err) console.log('ERROR!', err);
    else console.log('http server listening on port', port);
});
