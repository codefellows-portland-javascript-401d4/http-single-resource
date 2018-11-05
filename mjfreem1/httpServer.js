const http = require('http');
const bodyReader = require('./bodyReader');
const fs = require('./fsFuncs');
const parseUrl = require('url').parse;
const qsParse = require('querystring').parse;

module.exports = http.createServer((req, res) => {
    let url = parseUrl(req.url);
    let pathname = parseUrl(req.url).pathname;
    let query = qsParse(url.query);
    switch(req.method) {
    case 'GET':
        if (query.name) {
            fs.getOneFile(req, res);
        } else if (pathname === '/cities') {
            fs.getFileList(req, res);
        }
        break;

    case 'POST':
        bodyReader(req, (err, data) => {
            fs.createFile(req, res, data.name + '.txt', data.name);
        });
        break;

    case 'PUT':
        bodyReader(req, (err, data) => {
            fs.replaceFile(req, res, data.name + '.txt', data.name);
        });
        break;

    case 'DELETE':
        fs.deleteFile(req, res);
        break;

    default:
        (err) => {
            console.log(err);
        };
        break;
    }
});