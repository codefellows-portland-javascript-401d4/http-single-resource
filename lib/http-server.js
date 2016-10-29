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
        var array = dataStore.getAll();
        console.log(array)
    //     .then((data) => {
    //     console.log(data);
    // })
    // .catch((err) => {
    //     console.log(err);
    // });
    };
    

    if(req.method === 'POST'){
        console.log('Hello2')
        sander.writeFile('./data_store/test.json')
    }

});
