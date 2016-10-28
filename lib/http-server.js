const http = require('http');
const sander = require('sander');

module.exports = http.createServer((req, res) => {
    res.statusCode = 200;

    // if(err) {
    //     res.statusCode = 400;
    // }

    if(req.method === 'GET') {
        console.log('Hello');
    }

    if(req.method === 'POST'){
        console.log('Hello2')
        sander.writeFile('./data_store/test.json')
    }

});
