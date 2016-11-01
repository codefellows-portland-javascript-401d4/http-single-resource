const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = require('chai').expect;
const assert = require('chai').assert;
const server = require('../lib/http-server');
const port = 8080;

describe('server', () => {
    before(done => {
        server.listen(port, done);
    });
});

describe('test http server', () => {
    let request = chai.request(server);

    it('sends back a response text', done => {
        request
            .get('/')
            .end((err, response) => {
                if(err) return done(err);
                assert.deepEqual(response.text, )
            })
    })

})