const chai      = require('chai');
const chaiHttp  = require('chai-http');
const assert    = chai.assert;
const server    = require('../lib/httpServer');
chai.use(chaiHttp);

describe('http single resource promise server', () => {
    
    let request = chai.request(server);
    const port = 8999;

    before(done => {
        server.listen({port, port}, done);
    });

    it('checks to see that we can retrieve a given cat with GET', done => {
        request
            .get('/cats/1')
            .end((err, res) => {
                if (err) return done(err);
                else {
                    assert.deepEqual(res.body, {'id':'nyan','age':5,'color':'gray and poptart'});
                    done();
                };
            });
    });

    it('wants to see if we get a list of all resources', done => {
        request
            .get('/cats')
            .end((err, res) => {
                if (err) return done(err);
                else {
                    assert.deepEqual(res.text.split(','), ['0.json', '1.json', '2.json']);
                    done();
                };
            });
    });

    it('wants to see if PUT will update a given file', done => {
        request
            .put('/cats/0')
            .set('Content-Type', 'application/json')
            .send('{"id":"felix","age":8,"color":"orange"}')
            .end((err, res) => {
                if (err) return done(err);
                else {
                    assert.equal(res.text, 'put good, your resource id is 0');
                    done();
                }
            });
    });

    it('checks to see that the last file was updated during PUT operation', done => {
        request
            .get('/cats/0')
            .end((err, res) => {
                if (err) return done(err);
                else {
                    assert.deepEqual(res.body, {'id':'felix','age':8,'color':'orange'});
                    done();
                };
            });
    });

    it('wants to see if POST works', done => {
        request
            .post('/cats')
            .set('Content-Type', 'application/json')
            .send('{"id":"carl","age":10,"color":"gray"}')
            .end((err, res) => {
                if (err) return done(err);
                else {
                    assert.equal(res.text, 'post good, your resource id is 3');
                    done();
                };
            });
    });

    it('wants to see if PUT will act like POST if file is not present', done => {
        request
            .put('/cats/8')
            .set('Content-Type', 'application/json')
            .send('{"id":"felix","age":8,"color":"orange"}')
            .end((err, res) => {
                if (err) return done(err);
                else {
                    assert.equal(res.text, 'put good, your resource id is 8');
                    done();
                }
            });
    });

    it('wants to see if DELETE will delete the last thing we PUT in', done => {
        request
            .del('/cats/8')
            .end((err, res) => {
                if (err) return done(err);
                else {
                    assert.equal(res.text, 'File was deleted');
                    done();
                }
            });
    });

    it('wants to see if DELETE works on what we POSTED', done => {
        request
            .del('/cats/3')
            .end((err, res) => {
                if (err) return done(err);
                else {
                    assert.equal(res.text, 'File was deleted');
                    done();
                }
            });
    });
   
    it('returns an error if trying to DELETE a non-existent file', done => {
        request
            .del('/cats/non-existent-cat')
            .end((err, res) => {
                if (err) return done(err);
                else {
                    assert.equal(res.text, 'No such file exists');
                    done();
                }
            });
    }); 
});