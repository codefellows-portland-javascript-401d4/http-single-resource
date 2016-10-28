const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index.js');
const rimraf = require('rimraf');
const assert = chai.assert;
chai.use(chaiHttp);

describe('Our server responds to requests', done => {

  let locHost = 'http://localhost:8080';
  let testTeam1 = {"teamName": "EHOME","teamMembers": "['test1', 'new chicken', 'RTZ', 'LaNm', 'Garder']","region": "CN","tiWinner": "false"}

  before(done => {
    rimraf('./lib/dotaTeams/*', err => {
      if (err) throw err;
      done();
    });
  });

  it('should make a file from a POST request', done => {
    chai.request(locHost)
      .post('/teams')
      .send(testTeam1)
      .then(res => {
        assert.equal(res.statusCode, 200);
        assert.equal(res.text, testTeam1);
        done();
      })
      .catch(err => {
        console.log('POST test 1 err');
        throw err;
      });
  });

  it('Should do this other thing', function() {

  });

});