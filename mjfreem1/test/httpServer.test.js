const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const assert = chai.assert;
const expect = require('chai').expect;
const server = require('../runServer');
const path = require('path');
const rimraf = require('rimraf');
const mkdirp = require('mkdirp');

const citiesDir = path.resolve(__dirname, '../cities');

describe('http server functionality', () => {
    let req = chai.request(server);

    before(() => {
        rimraf.sync(citiesDir);
        mkdirp.sync(citiesDir);
    });

    it('posts new files to the server', done => {
        req
            .post('/cities')
            .set('Content-Type', 'application/json')
            .send('{"name": "tbilisi"}')
            .end((err, res) => {
                if (err) return done(err);
                expect(res).status(200);
                assert.equal(res.text, 'Successfully created file tbilisi.txt in \'cities\' directory.');
                done();
            });
    });
    
    it('gets entire directory', done => {
        req
            .get('/cities')
            .end((err, res) => {
                if (err) return done(err);
                expect(res).status(200);
                assert.equal(res.text, 'tbilisi.txt');
                done();
            });
    });

    it('gets a single file', done => {
        req
            .get('/cities?name=tbilisi.txt')
            .end((err, res) => {
                if (err) return done(err);
                expect(res).status(200);
                assert.equal(res.text, 'tbilisi');
                done();
            });
    });

    it('replaces a file', done => {
        req
            .put('/cities')
            .set('Content-Type', 'application/json')
            .send('{"name" : "tbilisi"}')
            .end((err, res) => {
                if (err) return done(err);
                expect(res).status(200);
                assert.equal(res.text, 'File tbilisi.txt was successfully replaced.');
                done();
            });
    });

    it('deletes a file', done => {
        req
            .del('/cities?name=tbilisi.txt')
            .end((err, res) => {
                if (err) return done(err);
                expect(res).status(200);
                assert.equal(res.text, 'File tbilisi.txt successfully deleted.');
                done();
            });
    });
    
});