const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const assert = chai.assert;
const server = require('../lib/http-server');

let request = chai.request(server);
//original two-team data resource displayed as text
let origTeamsText = 'Oakland Athletics\nChicago Cubs\n';
let basedir = 'data/';
let filename = 'teamsTest.json';

describe('GET tests', () => {

  it('error message on non-existent path', done => {
    request
            .get('/DoesNotExist')
            .end((err, res) => {
              if (err) return done(err);
              assert.equal(res.text, '404 - Not Found');
              done();
            });
  });

  it('a path (/teams) uses url.pathname', done => {
    request
            .get('/teams')
            .end((err, res) => {
              if (err) return done(err);
              assert.equal(res.text, origTeamsText);
              done();
            });
  });

  it('/teams uses queryData.team', done => {
    request
            .get('/teams?team=Cubs')
            .end((err, res) => {
              if (err) return done(err);
              assert.equal(res.text, 'Chicago Cubs');
              done();
            });
  });
});

describe('POST test', () => {

  //City mispelled on purpose for next test purposes
  it('adds team to data store; confirm by checking that /teams page updates', done => {
    newTeam = {"name":"Giants", "city": "San Frcisco"};   // eslint-disable-line
    request
     .post('/teams')
     .send(newTeam)
     .end((err, res) => {
       if (err) return done(err);
       request
            .get('/teams')
            .end((err, res) => {
              if (err) return done(err);
              assert.equal(res.text, origTeamsText + 'San Frcisco Giants\n');
              done();
            });
     }); 
  });
});   

describe('PUT test', () => { 
  it('edits team city in data store; confirm by checking that /teams page updates', done => {
    editTeam = {"name":"Giants", "city": "San Francisco"};   // eslint-disable-line
    request
     .put('/teams?team=Giants')
     .send(editTeam)
     .end((err, res) => {
       if (err) return done(err);
       request
            .get('/teams')
            .end((err, res) => {
              if (err) return done(err);
              assert.equal(res.text, origTeamsText + 'San Francisco Giants\n');
              done();
            });
     }); 
  });
});   

describe('DELETE test', () => { 
  it('removes team from data store; confirm by checking that /teams page updates', done => {
    delTeam = {"name":"Giants", "city": "San Francisco"};   // eslint-disable-line
    request
     .delete('/teams?team=Giants')
     .send(delTeam)
     .end((err, res) => {
       if (err) return done(err);
       request
            .get('/teams')
            .end((err, res) => {
              if (err) return done(err);
              assert.equal(res.text, origTeamsText);
              done();
            });
     }); 
  });
});    

//teams.json has returned to original state (which is also 'memoralized' in teamsOriginal.json)

