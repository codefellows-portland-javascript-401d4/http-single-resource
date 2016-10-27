const http = require('http');
const fs = require('fs');
const parseUrl = require('url').parse;
const sander = require('sander');

module.exports = http.createServer((req, res) => {
    // console.log('req.url', req.url);
    res.statusCode = 200;
    const url = parseUrl(req.url);

    if(req.url === '/'){
        // console.log('page loaded successfully');
    }

    if(url.query === 'superhero=Wonderwoman'){
        sander.readFile('./lib/data.json')
        .then(data =>{
            res.end(data);
        })
        .catch(err =>{
            console.error('error', err.message);    
        });
        // console.log('test', sander.readFile('./lib/data.json'));
        // res.write(`You requested ${url.query}, a great superhero`);
        // res.end();
    }
});