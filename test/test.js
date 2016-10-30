const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const assert = require('chai').assert;
const expect = require('chai').expect;
const server = require('../lib/taco_server');
const port = 5000;


describe('server', () => {

    before(done => {
        server.listen(port, done);
    });
});

describe('test http server', () => {

    let request = chai.request(server);

    it('sends back response text, list of resources in directory', done => {
        request
          .get('/tacos')
          .end((err, response) => {
              if(err) return done(err);
              assert.deepEqual(response.text, 'carnitas.json ' + 'pollo.json ');
              expect(response).to.have.status(200);
              done();
          });
    });

    it('sends back response text, contents of file', done => {
        request
          .get('/tacos/pollo')
          .end((err, response) => {
              if(err) return done(err);
              assert.deepEqual(response.text, '{"tortilla":"flour","filling":"chicken"}\n');
              expect(response).to.have.status(200);
              done();
          });
    });

    it('posts file', done => {
        request
          .post('/tacos/pescado')
          .send({"tortilla":"corn","filling":"fish"})
          .end((err, response) => {
              if(err) return done(err);
              assert.deepEqual(response.text, 'data has been posted');
              expect(response).to.have.status(200);
              done();
          });
    });

    it('deletes file', done => {
        request
          .delete('/tacos/pescado')
          .end((err, response) => {
              if(err) return done(err);
              assert.deepEqual(response.text, 'file removed');
              done();
          });
    });

    // it('adds file', done => {
    //     request
    //       .post('/tacos/junk')
    //       .end((err, response) => {
    //           if(err) return done(err);
    //           assert.deepEqual(response.text, 'file created');
    //           done();
    //       });
    // });



    // it('204 - no content', done => {
    //     request
    //       .get('/noContent')
    //       .end((err, response) => {
    //           if(err) return done(err);
    //           expect(response).to.have.status(204);
    //           done();
    //       });
    // });
    //
    // it('query - ?foo=bar', done => {
    //     request
    //         .get('/?foo=bar')
    //         .end((err, response) => {
    //             if (err) return done(err);
                // expect(response).to.have.status(200);
    //             assert.deepEqual(response.text, 'foo bar!');
    //             done();
    //         });
    // });

});
