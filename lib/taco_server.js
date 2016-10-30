const http = require('http');
const TacoStore = require('./taco_store');
const tacoStore = new TacoStore;
// const Stream = require('stream');
const bodyReader = require('./body_reader');


const server = http.createServer(function (request, response) {
    console.log(request.method);

    if (request.url === '/tacos' && request.method === 'GET') {
        tacoStore.getList('tacos').then(data => {
            console.log(data);
            response.setHeader('Content-Type', 'text/html; charset=utf-8');
            response.statusCode = 200;
            for (var i=0; i < data.length; i++) {
                response.write(data[i] + ' ', function(){
                    response.end();
                });
            }
        })
        .catch(function(err) {
            console.log(err);
        });
    } else if (request.url === '/tacos/pollo' && request.method === 'GET') {
        tacoStore.getFile('tacos/pollo.json').then(data => {
            console.log(data);
            response.setHeader('Content-Type', 'application/json');
            response.statusCode = 200;
            response.write(data);
            response.end();
        })
            .catch(function(err) {
                console.log(err);
            });
    } else if (request.url === '/tacos/pescado' && request.method === 'POST') {
        bodyReader(request, (err, data) => {
            if(err) {
                response.statusCode = 400;
                response.end(err.message);
            }
            else {
                response.write('data has been posted');
                tacoStore.writeFile('tacos/pescado.json', data).then(data => {
                    console.log(data);
                    response.statusCode = 200;
                    response.end();
                })
                    .catch(function(err) {
                        console.log(err);
                    });
            }
        });
    } else if (request.url === '/tacos/pescado' && request.method === 'PUT') {
        bodyReader(request, (err, data) => {
            if(err) {
                response.statusCode = 400;
                response.end(err.message);
            }
            else {
                response.write('your data has been updated');
                tacoStore.writeFile('tacos/pescado.json', data).then(data => {
                    console.log(data);
                    response.statusCode = 200;
                    response.end();
                })
                    .catch(function(err) {
                        console.log(err);
                    });
            }
        });
    } else if (request.url === '/tacos/pescado' && request.method === 'DELETE') {
        tacoStore.removeFile('tacos/pescado.json').then(data => {
            console.log(data);
            response.statusCode = 200;
            response.write('file removed');
            response.end();
        })
            .catch(function(err) {
                console.log(err);
            });
        // } else if (request.url === '/tacos/junk' && request.method === 'POST') {
        //     tacoStore.openFile('tacos/junk.json', 'a').then(data => {
        //         console.log(data);
        //         response.statusCode = 200;
        //         response.write('file created');
        //         response.end();
        //     })
        //         .catch(function(err) {
        //             console.log(err);
        //         });

    } else {
        response.statusCode = 404;
        response.write('page not found');
        response.end();
    }

});

module.exports = server;
