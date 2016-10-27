const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const assert = chai.assert;
const server = require('../lib/httpServer');
const fs = require('fs');
const sander = require('sander');

describe('http single resource promise server', () => {
    
    let request = chai.request(server);
    const port = 8999;

    before(done => {
        server.listen({port, port}, done);
    });
    
    it('just console logs some stuff', () => {
        console.log('some stuff');
    });

    it('wants to see if get works', done => {
        request
            .get('/cats/felix')
            .end((err, res) => {
                if (err) return done(err);
                else {
                    console.log(res.body);
                    assert.deepEqual(res.body, {'id':'felix','age':19,'color':'black and white'});
                    done();
                };
            });
    });

    it('wants to see if get works', done => {
        request
            .get('/cats')
            .end((err, res) => {
                if (err) return done(err);
                else {
                    // console.log(res);
                    //console.log('typeof',res);
                    assert.deepEqual(res.text.split(','), ['cats', 'felix', 'nyan', 'tardar']);
                    done();
                };
            });
    });

    // it('wants to check sander data', done => {
    //     sander
    //         .readFile('./resources/cats.json', {encoding: 'utf-8'})
    //         .then(data => {
    //             console.log(data);
    //             done();
    //         })
    //         .catch(err => {
    //             done(err);
    //         });
    // });

    // it('wants to see if PUT works', done => {
    //     request
    //         .put('/cat/felix')
    //         .end((err, res) => {
    //             if (err) return done(err);
    //             else {
    //                 done();
    //             };
    //         });
    // });

    it('wants to see if POST works', done => {
        request
            .post('/cats')
            .set('Content-Type', 'application/json')
            .send('{"id":"carl","age":10,"color":"gray"}')
            .end((err, res) => {
                if (err) return done(err);
                else {
                    console.log(res);
                    assert.equal(res.text, 'post good');
                    done();
                };
            });
    });

    // it('wants to see if DELETE works', done => {
    //     request
    //         .del('/cat/felix')
    //         .end((err, res) => {
    //             if (err) return done(err);
    //             else {
    //                 done();
    //             };
    //         });
    // });
    
});