const http = require('http');
const fsep = require('fs-extra-promise');
const fs = require('fs');
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
    // console.log(req);
    // console.log('requested resource:', req.method, urlPath);
    // console.log('urlString',urlString);
    // console.log('urlPath', urlPath);
    // console.log('parsedPath', parsedPath);
    // console.log('query', query);
    // console.log('queryFormat', queryFormat);
    
    if (req.method === 'GET') {
        
        if (parsedPath.dir === '/cats' || parsedPath.base === 'cats') {
            sander
                .readdir('./resources')
                .then( data => {
                    // console.log(data.toString());
                    data = data.map(fileName => {
                        return fileName.split('.')[0];
                    });
                    // console.log(data);
                    var jsonData;
                    if (parsedPath.name === 'cats') {
                        res.status = 200;
                        res.setHeader('Content-Type', 'text/plain');
                        res.end(data.toString());
                    } else {
                        data = data.filter(files => {
                            if (files === parsedPath.name) {
                                return files;
                            }
                        });
                        // console.log('this is the filtered data : ', data);
                        if (data.length === 0) {
                            res.status = 400;
                            res.end('bad request');
                        } else {
                            return sander.readFile(`./resources/${data[0]}.json`, {'encoding': 'utf-8'})
                            .then(data => {
                                // console.log('data : ', data);
                                res.status = 200;
                                res.setHeader('Content-Type', 'application/json');
                                res.end(data);
                            });
                        }
                    };
                })
                .catch(null, (err => {
                    console.error(err);
                    res.end(err);
                })
            );
        } else {
            res.status = 400;
            res.end('bad request');
        };
        
    } else if (req.method === 'PUT') {
        res.end('PUT method');
    } else if (req.method === 'POST') {
        //res.end('POST METHOD');
        if (urlPath === '/cats') {
            var body = '';
            var dataId = '';
            req.on('data', data => {
                body += data.toString('utf-8');
            });
            req.on('end', () => {
                dataId = JSON.parse(body).id;
                fs.writeFile(`./resources/${dataId}.json`, body, (err) => {
                    if (err) res.end(err);
                    else res.end('post good');
                });
            });
        } else {
            res.status = 400;
            res.end('directory does not exist');
        };

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
            }
        });
    } else {
        res.status = 400;
        res.end('bad request');
    };
});

module.exports = server;