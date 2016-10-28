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
const deleteHandler = require('./deleteHandler');
const putHandler = require('./putHandler');

const server = http.createServer((req, res) => {
    const urlString = urlParse(req.url);
    const urlPath = urlString.pathname;
    const parsedPath = path.parse(urlPath);
    const query = qstring.parse(url.query);
    const queryFormat = query.format;
    // console.log('req.url is',req.url);
    // console.log('requested resource:', req.method, urlPath);
    // console.log('urlString',urlString);
    // console.log('urlPath', urlPath);
    // console.log('parsedPath', parsedPath);
    // console.log('query', query);
    // console.log('queryFormat', queryFormat);
    
    if (req.method === 'GET') {
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
    } else if (req.method === 'PUT') {
        putHandler(parsedPath, req, (err, data) => {
            if (err) {
                res.status = 400;
                res.end(err);
            } else {
                res.status = 200;
                res.end(data);
            };
        });
    } else if (req.method === 'POST') {
        postHandler(parsedPath, req, (err, data) => {
            if (err) {
                res.status = 400;
                res.end(err);
            } else {
                res.status = 200;
                res.end(data);
            }
        });
    } else if (req.method === 'DELETE') {
        deleteHandler(parsedPath, (err, message) => {
            if (err) {
                res.status = 400;
                res.end(err);
            } else {
                res.status = 200;
                res.end(message);
            };
        });
    } else {
        res.status = 400;
        res.end('bad request');
    }
});

module.exports = server;