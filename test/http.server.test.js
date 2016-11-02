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
                assert.deepEqual(response.text, 'bears.json' + 'broncos.json ' + 'seahawks.json ');
                expect(response).to.have.status(200);
                done();
            });
    });

    it('request for resource in /teams', done => {
        request
        //   .get('/teams/seahawks')
          .get('/teams/broncos')
          .end((err, response) => {
              if(err) return done(err);
              assert.deepEqual(response.text, '{"city":"denver","conference":"afc"}');
              expect(response).to.have.status(200);
              done();
          });
    });

        it('POST request to /teams/bears', (done) => {
        request
          .post('/teams/bears')
          .send({"city":"chicago","conference":"nfc"})
        //   .end((err, response) => {
        //       if(err) return done(err);
        //       assert.deepEqual(response.text, 'data has been written');
        //       expect(response).to.have.status(200);
        //       done();
        //   })
        //   .catch(err => {
        //       done(err);
        //   });
            .then(response => {
                assert.deepEqual(response.text, 'data has been written');
                done();
            })
            .catch(err => {
                console.log('POST err')
                done(err);
            })
    });

    it('PUT request to teams/bears', done => {
        request
          .put('/teams/bears')
          .send({"division":"north"})
          .end((err, response) => {
              if(err) return done(err);
              assert.deepEqual(response.text, 'data has been updated');
              expect(response).to.have.status(200);
              done();
          });
    });

    it('DELETE request to teams/bears, deletes the resource', done => {
        request
          .delete('/teams/bears')
          .end((err, response) => {
              if(err) return done(err);
              assert.deepEqual(response.text, 'file has been removed');
              done();
          });
    });
});
