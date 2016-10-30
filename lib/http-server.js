const http = require('http');
const sander = require('sander');
const url = require('url').parse
const dataStore = require('./dataStore.js')

module.exports = http.createServer((req, res) => {
    const urlPath = url(req.url, true)
    res.statusCode = 200;

    // if(err) {
    //     res.statusCode = 400;
    // }

    if(req.method === 'GET' && urlPath.pathname === '/mainchar') {
        console.log('Requested a GET');
        dataStore.getAll()
        .then((fileNames)=> {
            console.log('What', fileNames);
            return Promise.all(fileNames.map((fn)=> {
                console.log(fn);
                return dataStore.getData(fn);
            }))
        })
        .then((data)=> {
            console.log('what 2', JSON.stringify(data));
            resp.setHeader('Content-Type', 'application/json');
            resp.write('Hello')
            resp.write(JSON.stringify(data));
            resp.end();
        })
        .catch((err)=> {
            resp.statusCode = 404;
            resp.write(err.message);
            resp.end
        })
    };
    

    if(req.method === 'POST'){
        console.log('Hello2')
        sander.writeFile('./data_store/test.json')
    }

});
