const http = require('http');
const bodyReader = require('./body-reader');
const Stream = require('stream');
const sander = require('sander');

module.exports = http.createServer((req, res) => {

    bodyReader(req, (err, body))
    console.log(req.url);
    if (err) {
        res.statusCode = 400;
        res.end(err.toString);
    }
    else {
        res.statusCode = 200;
        console.log
    }
})