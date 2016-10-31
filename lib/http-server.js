const http = require('http');
const sander = require('sander');
const url = require('url').parse
const dataStore = require('./dataStore.js')

module.exports = http.createServer((req, res) => {
    const urlPath = url(req.url, true)
    res.statusCode = 200;

function bodyParser(req, cb) {
    let body = '';

    req.on('data', (data) => {
        body += data;
    });

    req.on('end', () => {
        try {
            cb(null, JSON.parse(body));
        }
        catch (err) {
            cb(err);
        }
    });
};

    if(req.method === 'GET'){ 
        if( urlPath.pathname === '/mainchar') {
            dataStore.getAll()
            .then((fileNames)=> {
                return Promise.all(fileNames.map((fn)=> {
                    return dataStore.getData(fn);
                }))
            })
            .then((data)=> {
                res.setHeader('Content-Type', 'application/json');
                res.write(JSON.stringify(data));
                res.end();
            })
            .catch((err)=> {
                res.statusCode = 404;
                res.write(err.message);
                res.end();
            })
        }

        else if(urlPath.pathname.length > 9 && urlPath.pathname.split('/')[1] === 'mainchar') {
            let selected = urlPath.pathname.replace('/mainchar/', '').split(',');
            Promise.all(selected.map((fn) => {
                return dataStore.getData(fn + '.json')
            }))
            .then((data)=> {
                console.log('grabbed', data);
                res.setHeader('Content-Type', 'application/json');
                res.write(JSON.stringify(data));
                res.end();
            })
            .catch((err)=> {
                res.statusCode = 404;
                res.write(err.message);
                res.end();
            })
        }
    }

    else if(req.method === 'POST') {
        bodyParser(req, (err, obj) => {
            if(err){
                res.statusCode = 400;
                res.end(err.message);
            }
            else {
                if(urlPath.pathname === '/mainchar') {
                    dataStore.store(obj)
                    .then((data) => {
                        console.log('data', data);
                        res.write('Stored!')
                        res.write(data);
                        res.end();
                    })
                    .catch((err) => {
                        res.statusCode = 500;
                        res.end(err.message);
                    })
                }
            }
        })
    }

});
