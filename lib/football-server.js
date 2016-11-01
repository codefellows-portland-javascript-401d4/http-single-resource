const http = require('http');
const dataStore = require('./dataStore.js');
const footballStore = new dataStore;
// const url = require('url');
// const sander = require('sander');
// const indexHtml = sander.createReadStream('index.html');

const server = http.createServer((req, res) => {
    console.log(req.method);    

    if(req.url === '/teams' && req.method === 'GET') {
        footballStore.getList()
    }

    res.statusCode = 200;

    const parsedUrl = parseUrl(req.url, true);
    const verb = req.method;

    const fullPathName = parsedUrl.pathname;
    const splitPath = fullPathName.split('/');
    const dirName = '/' + splitPath[1];
    const fileName = splitPath[2];

    // if( url.pathname === '/')

    bodyReader(req, (err, body))
    console.log(req.url);
    if (err) {
        res.statusCode = 400;
        res.end(err.toString);
    }
    else {
        res.statusCode = 200;
        console.log();
    }




})