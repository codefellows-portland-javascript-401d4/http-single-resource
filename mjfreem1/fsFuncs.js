const sander = require('sander');
const parseUrl = require('url').parse;
const qsParse = require('querystring').parse;

function getFileList(req, res) {
    let pathname = parseUrl(req.url).pathname;
    sander.readdir(`.${pathname}`)
        .then((result) => {
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.write(`${result}`);
            res.end();
        })
        .catch((err) => {
            res.writeHead(400, {'Content-Type': 'text/plain'});
            res.write(err.message);
            res.end();
        });
}

function getOneFile(req, res) {
    let url = parseUrl(req.url);
    let pathname = parseUrl(req.url).pathname;
    let query = qsParse(url.query);
    sander.readFile(`.${pathname}/${query.name}`)
        .then((result) => {
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.write(`${result}`);
            res.end();
        })
        .catch((err) => {
            res.writeHead(400, {'Content-Type': 'text/plain'});
            res.write(err.message);
            res.end();
        });
}

function createFile(req, res, filename, data) {
    sander.writeFile('./cities', filename, data)
        .then(() => {
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.write(`Successfully created file ${filename} in \'cities\' directory.`);
            res.end();
        })
        .catch((err) => {
            res.writeHead(400, {'Content-Type': 'text/plain'});
            res.write(err.message);
            res.end();
        });
}

function replaceFile(req, res, filename, data) {
    sander.writeFile('./cities', filename, data + ' second copy')
        .then(() => {
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.write(`File ${filename} was successfully replaced.`);
            res.end();
        })
        .catch((err) => {
            res.writeHead(400, {'Content-Type': 'text/plain'});
            res.write(err.message);
            res.end();
        });
}

function deleteFile(req, res) {
    let url = parseUrl(req.url);
    let pathname = parseUrl(req.url).pathname;
    let query = qsParse(url.query);
    sander.unlink(`.${pathname}/${query.name}`)
        .then(() => {
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.write(`File ${query.name} successfully deleted.`);
            res.end();
        })
        .catch((err) => {
            res.writeHead(400, {'Content-Type': 'text/plain'});
            res.write(err.message);
            res.end();
        });
}

module.exports = {getFileList, getOneFile, createFile, replaceFile, deleteFile};