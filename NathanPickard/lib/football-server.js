const http = require('http');
const TeamStore = require('./team-store');
const footballStore = new TeamStore;
const bodyReader = require('./body-reader');
// const url = require('url');
// const sander = require('sander');
// const indexHtml = sander.createReadStream('index.html');

const server = http.createServer((req, res) => {
    console.log(req.method);    

    if(req.url === '/teams' && req.method === 'GET') {
        footballStore.getList('teams').then(data => {
            console.log(data);
            res.setHeader('Content-Type', 'text/html; charset=utf-8');

            res.statusCode = 200;
            for (var i = 0; i < data.length; i++) {
                res.write(data[i] + ' ', function() {
                    res.end();                    
                });
            }
        })

        .catch(function(err) {
            console.log(err);
        });
    }   else if (req.url === '/teams/broncos' && req.method === 'GET') {
            footballStore.getFile('teams/broncos.json').then(data => {
                console.log(data);
                res.setHeader('Content-Type', 'application/json');

                res.statusCode = 200;
                res.write(data);
                res.end();                
            })
                .catch(function(err) {
                    console.log(err);
                });
    } else if (req.url === '/teams/bears' && req.method === 'POST') { //POST
        bodyReader(req, (err, data) => {
            if(err) {
                res.statusCode = 400;
                res.end(err.message);
            } else {
                // footballStore.writeFile('teams', 'bears.json', data).then(data => {
                   footballStore.writeFile('teams/bears.json', data).then(data => { 
                    console.log(data);
                    res.statusCode = 200;
                    res.write('data has been written');
                    res.end();
                })
                .catch(function(err) {
                    console.log(err);
                });
            }
        });
    } else if (req.url === '/teams/bears' && req.method === 'PUT') { 
        // else if (req.url === 'teams/steelers' && req.method === 'PUT') {
        bodyReader(req, (err, data) => {
            if(err) {
                res.statusCode = 400;
                res.end(err.message);
            }
            else {
                footballStore.writeFile('teams/bears.json', data).then(data => {
                // footballStore.writeFile('/teams', 'bears.json', data).then(data => {
                    console.log(data);
                    res.statusCode = 200;
                    res.write('data has been updated');
                    res.end();
                })
                    .catch(function(err) {
                        console.log(err);
                    });
            }
        });
    } else if (req.url === '/teams/bears' && req.method === 'DELETE') {
        footballStore.removeFile('teams/bears.json').then(data => {
            console.log(data);
            res.statusCode = 200;
            res.write('file has been removed');
            res.end();
        })
            .catch(function(err) {
                console.log(err);
            });
    } else {
        res.statusCode = 404;
        res.write('page not found');
        res.end();
    }

});

module.exports = server;
    
    // res.statusCode = 200;

    // const parsedUrl = parseUrl(req.url, true);

    // bodyReader(req, (err, body))
    // console.log(req.url);
    // if (err) {
    //     res.statusCode = 400;
    //     res.end(err.toString);
    // }
    // else {
    //     res.statusCode = 200;
    //     console.log();
    // }

