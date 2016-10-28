const http = require('http');
const qs = require('querystring');
const parseUrl = require('url').parse;
const sander = require('sander');
const bodyreader = require('./bodyreader');

module.exports = http.createServer((req, res) => {
    res.statusCode = 200;

    const url = parseUrl(req.url);
    const queryObj = qs.parse(url.query);
    var files = ['data-store'];
    var validFile;
    
    if(req.url === '/'){
        res.write('Welcome to our home page! \n');
        sander.readdir('./lib/data-store')
        .then(fileData => {
            var fileArray = fileData.map((fileName) => {
                var fileNameComplete = 'lib/data-store/' + fileName;
                return sander.readFile(fileNameComplete);
            });
            Promise.all(fileArray)
        .then(data => {
            res.end(data.join(','));
        })
        .catch(err =>{
            console.error('error', err.message);
        });
        });
    }
    files.forEach(i =>{
        if(i === queryObj.superhero){
            validFile = i;
        }
    });
    if(validFile){
        sander.readFile('./lib/data-store/' + validFile + '.json')
        .then(data =>{
            res.end(data);
        })
        .catch(err =>{
            console.error('error', err.message);    
        });
    }
    if (req.method === 'POST') {
        var id = Date.now();
        bodyreader(req, (err,data) => {
            console.log('id', id);
            sander.writeFile('./lib/data-store/', id + '.json', JSON.stringify(data))
            .catch(err =>{
                console.error('error', err.message);
            });
        });
        res.end(id.toString());
    }
    if (req.method === 'PUT') {
        if(url.query === null) {
            url.query = Date.now();
        }
        bodyreader(req, (err,data) => {
            sander.writeFile('./lib/data-store/', url.query + '.json', JSON.stringify(data))
            .catch(err => {
                console.error('error', err.message);
            });
        });
        res.end(id.toString());
    }
    if (req.method === 'DELETE') {
        sander.unlink('./lib/data-store/' + url.query + '.json')
        .catch(err => {
            console.error('error', err.message);
        });
        res.end(id.toString());
    }
});