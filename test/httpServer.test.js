const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const assert = chai.assert;
const server = require('../lib/httpServer');

describe('http single resource promise server', () => {
    
    let request = chai.request(server);
    const port = 8999;

    before(done => {
        server.listen({port, port}, done);
    });
    
    it('just console logs some stuff', () => {
        console.log('some stuff');
    });

    it('wants to see what gets logged when connecting to the server', done => {
        request
            .get('/user/whatever')
            .end((err, res) => {
                if (err) return done(err);
                else {
                    done();
                };
            });
    });
    
});