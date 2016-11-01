const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = require('chai').expect;
const assert = require('chai').assert;
const server = require('../lib/football-server');
const port = 8080;

describe('server', () => {
    before(done => {
        server.listen(port, done);
    });
});

describe('test http server resource', () => {
    let request = chai.request(server);

    it('sends back a response text', done => {
        request
            .get('/teams')
            .end((err, response) => {
                if(err) return done(err);
                assert.deepEqual(response.text, 'broncos.json ' + 'seahawks.json ');
                expect(response).to.have.status(200);
                done();
            });
    });

    it('request for resource in /teams', done => {
        request
          .get('/teams/seahawks')
          .end((err, response) => {
              if(err) return done(err);
              assert.deepEqual(response.text, '{"city":"seattle","conference":"nfc"}\n');
              expect(response).to.have.status(200);
              done();
          });
    });
});
