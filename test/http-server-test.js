const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const assert = chai.assert;
const server = require('../lib/http-server');

let request = chai.request(server);
//original two-team data resource displayed as text
let origTeamsText = 'Oakland Athletics\nChicago Cubs\n';

describe('http single resource server', () => {

  it('error message on non-existent path', function (done) {
    request
            .get('/DoesNotExist')
            .end((err, res) => {
              if (err) return done(err);
              assert.equal(res.text, '404 - Not Found');
              done();
            });
  });

  it('a path (/teams) uses url.pathname', function (done) {
    request
            .get('/teams')
            .end((err, res) => {
              if (err) return done(err);
              assert.equal(res.text, origTeamsText);
              done();
            });
  });

  it('/teams uses queryData.team', function (done) {
    request
            .get('/teams?team=Cubs')
            .end((err, res) => {
              if (err) return done(err);
              assert.equal(res.text, 'Chicago Cubs');
              done();
            });
  });

//POST

//PUT

//DELETE



});