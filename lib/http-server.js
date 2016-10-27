const http = require('http');
const qs = require('querystring');
const parseUrl = require('url').parse;
const sander = require('sander');

module.exports = http.createServer((req, res) => {
    // console.log('req.url', req.url);
    res.statusCode = 200;

    const url = parseUrl(req.url);
    const queryObj = qs.parse(url.query);
    // console.log(queryObj.superhero);
    var files = ['data-store','wonderwoman', 'flash', 'batman'];
    var validFile;
    if(req.url === '/'){
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
            console.error('errorhahhh', err.message);
        });
        });
    }
    files.forEach(i =>{
        if(i === queryObj.superhero){
            validFile = i;
            console.log('validfile', validFile);
        }
    });
    // if(validFile === 'data-store') {
    //     files.forEach(i => {
    //         if(i !== 'data-store') {
    //             sander.readFile('./lib/data-store/' + i + '.json')
    //             .then(data =>{
    //                 res.write(data);
    //             })
    //             .catch(err =>{
    //                 console.error('error', err.message);
    //             });    
    //         }
    //     });
    //     res.end();
    // } 
    if(validFile){
        sander.readFile('./lib/data-store/' + validFile + '.json')
        .then(data =>{
            res.end(data);
        })
        .catch(err =>{
            console.error('error', err.message);    
        });
    }
});