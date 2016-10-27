const http = require('http');
const fsep = require('fs-extra-promise');
const qstring = require('querystring');
const url = require('url');
const urlParse = url.parse;
const path = require('path');

const server = http.createServer((req, res) => {
    const urlString = urlParse(req.url);
    const urlPath = urlString.pathname;
    const parsedPath = path.parse(urlPath);
    const query = qstring.parse(url.query);
    const queryFormat = query.format;
    console.log('requested resource:', req.method, urlPath);
    console.log('urlString',urlString);
    console.log('urlPath', urlPath);
    console.log('parsedPath', parsedPath);
    console.log('query', query);
    console.log('queryFormat', queryFormat);

    res.end('alls well');
});

module.exports = server;