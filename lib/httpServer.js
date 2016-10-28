const http = require('http');
const fsep = require('fs-extra-promise');
const fs = require('fs');
const qstring = require('querystring');
const url = require('url');
const urlParse = url.parse;
const path = require('path');
const sander = require('sander');
const getHandler = require('./getHandler');
const postHandler = require('./postHandler');

const server = http.createServer((req, res) => {
    const urlString = urlParse(req.url);
    const urlPath = urlString.pathname;
    const parsedPath = path.parse(urlPath);
    const query = qstring.parse(url.query);
    const queryFormat = query.format;
    // console.log(req);
    // console.log('requested resource:', req.method, urlPath);
    // console.log('urlString',urlString);
    // console.log('urlPath', urlPath);
    console.log('parsedPath', parsedPath);
    // console.log('query', query);
    // console.log('queryFormat', queryFormat);
    
    if (req.method === 'GET') {
        if (parsedPath.dir === '/cats' || parsedPath.base === 'cats') {
            getHandler(parsedPath, (err, data, encoding) => {
                if (err) {
                    res.status = 400;
                    res.end(err);
                } else {
                    res.status = 200;
                    res.setHeader('Content-Type', encoding);
                    res.end(data);
                };
            });
        } else {
            res.status = 400;
            res.end('bad request');
        };
    } else if (req.method === 'PUT') {
        res.end('PUT method');
    } else if (req.method === 'POST') {
        postHandler(parsedPath, req, (err, data) => {
            if (err) {
                res.status = 400;
                res.end(err);
            } else {
                res.status = 200;
                res.end(data);
            };
        });
    } else if (req.method === 'DELETE') {
        req.url = '.' + req.url + '.json';
        fs.access(req.url, err => {
            if (err && err.code === 'ENOENT') {
                res.end('No such file exists');
            } else {
                fs.unlink(req.url, err => {
                    if (err) res.end(err);
                    else res.end('Carl was deleted');
                });
            };
        });
    } else {
        res.status = 400;
        res.end('bad request');
    };
});

module.exports = server;