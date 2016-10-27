const http = require('http');
const fsep = require('fs-extra-promise');
const qstring = require('querystring');
const url = require('url');
const urlParse = url.parse;
const path = require('path');
const sander = require('sander');

const server = http.createServer((req, res) => {
    const urlString = urlParse(req.url);
    const urlPath = urlString.pathname;
    const parsedPath = path.parse(urlPath);
    const query = qstring.parse(url.query);
    const queryFormat = query.format;
    // console.log('requested resource:', req.method, urlPath);
    // console.log('urlString',urlString);
    // console.log('urlPath', urlPath);
    // console.log('parsedPath', parsedPath);
    // console.log('query', query);
    // console.log('queryFormat', queryFormat);
    
    if (req.method === 'GET') {
        
        if (parsedPath.dir === '/cats' || parsedPath.base === 'cats') {
            sander
                .readFile('./resources/cats.json', {encoding: 'utf-8'})
                .then( data => {
                    var jsonData;
                    if (parsedPath.name === 'cats') {
                        res.status = 200;
                        res.setHeader('Content-Type', 'application/json');
                        //res.setHeader('Content-Type', 'text/plain');
                        res.end(data);
                    } else {
                        jsonData = JSON.parse(data);
                        jsonData.forEach( (resource, index) => {
                            if (resource.id === parsedPath.name) {
                                res.status = 200;
                                res.setHeader('Content-Type', 'application/json');
                                res.end(JSON.stringify(resource));
                            };
                            if (index === (jsonData.length - 1)) {
                                res.status = 400;
                                res.end();
                            };
                        });
                    };
                })
                .catch(null, (err => {
                    console.error(err);
                })
            );
        } else {
            res.status = 400;
            res.end('bad request');
        };
        
    } else if (req.method === 'PUT') {
        res.end('PUT method');
    } else if (req.method === 'POST') {
        res.end('POST METHOD');
    } else if (req.method === 'DELETE') {
        res.end('DELETE METHOD');
    } else {
        res.status = 400;
        res.end('bad request');
    };
});

module.exports = server;