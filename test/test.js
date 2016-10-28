const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const assert = chai.assert;
const server = require('../lib/http-server');

describe('testing server.js', () =>{
    let request = chai.request(server);

    it('should serve up an index page', done =>{
        request.get('/').end((err, res) =>{
            if (err) return done (err);
            assert.include(res.text, 'Welcome to our home page');
            done();
        });
    });

    // it('should bring up a single file', done => {
    //     request.get('/')
    // })
});
