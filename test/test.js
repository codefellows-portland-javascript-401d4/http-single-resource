const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const assert = chai.assert;
const server = require('../lib/http-server');
const sander = require('sander');

describe('testing server.js', () =>{
    let request = chai.request(server);
    const port = 8080;

    before(done => {
        server.listen({port: port}, done);
    });

    it('serves up an index page', done =>{
        request.get('/').end((err, res) =>{
            if (err) return done (err);
            assert.include(res.text, 'Welcome to our home page');
            done();
        });
    });

    it('GETs a single item', done => {
        request.get('/?1477695490435').end((err, res) => {
            if (err) return done (err);
            assert.include(res.text, '"hero":"Wonder Woman"');
            done();
        });
    });

    it.skip('POSTs an item and then DELETEs it', done => {
        request.post().end((err, res) => {
            console.log(res);
            if (err) return done(err);
            sander.readdir('../lib/data-store')
            .then(assert.include(res.text, ''));
            done();
        });
    });
});