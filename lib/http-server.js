const http = require('http');
const qs = require('querystring');
const parseUrl = require('url').parse;
const sander = require('sander');
const bodyreader = require('./bodyreader');

module.exports = http.createServer((req, res) => {
    // console.log('req.url', req.url);
    res.statusCode = 200;

    const url = parseUrl(req.url);
    const queryObj = qs.parse(url.query);
    // console.log(queryObj.superhero);
    var files = ['data-store','wonderwoman', 'flash', 'batman'];
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
            console.log('validfile', validFile);
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
        bodyreader(req, (err,data) => {
            console.log('data', queryObj.superhero);
            sander.writeFile('./lib/data-store/', queryObj.superhero + '.json', JSON.stringify(data))
            .catch(err =>{
                console.error('error', err.message);
            });
        });
      
        
    }
    if (req.method === 'DELETE'){
        console.log(queryObj.superhero);
        sander.unlink('./lib/data-store/' + queryObj.superhero + '.json')
        .catch(err =>{
            console.error('error', err.message);
        });
    }
});