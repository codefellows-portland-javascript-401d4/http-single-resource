const http          = require('http');
const url           = require('url');
const urlParse      = url.parse;
const path          = require('path');
const getHandler    = require('./getHandler');
const postHandler   = require('./postHandler');
const deleteHandler = require('./deleteHandler');
const putHandler    = require('./putHandler');

const server = http.createServer((req, res) => {
    const urlString     = urlParse(req.url);
    const urlPath       = urlString.pathname;
    const parsedPath    = path.parse(urlPath);

    function resHandler(message, statusCode = 200, encoding = 'text/plain') {
        res.setHeader('Content-Type', encoding);
        res.status = statusCode;
        res.end(message);
    };

    if (req.method === 'GET') {
        getHandler(parsedPath, (err, data, encoding) => {
            if (err) resHandler(err, 400);
            else resHandler(data, null, encoding);                
        });
    } else if (req.method === 'PUT') {
        putHandler(parsedPath, req, (err, message) => {
            if (err) resHandler(err, 400);
            else resHandler(message);
        });
    } else if (req.method === 'POST') {
        postHandler(parsedPath, req, (err, message) => {
            if (err) resHandler(err, 400);
            else resHandler(message);
        });
    } else if (req.method === 'DELETE') {
        deleteHandler(parsedPath, (err, message) => {
            if (err) resHandler(err, 400);
            else resHandler(message);
        });
    } else {
        resHandler('not found', 404);
    };
});

module.exports = server;