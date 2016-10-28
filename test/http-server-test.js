const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const assert = chai.assert;
const sander = require('sander');
const server = require('../lib/http-server');
const fs = require('fs');

let request = chai.request(server);
//original two-team data resource displayed as text
let origTeamsText = 'Oakland Athletics\nChicago Cubs\n';
let basedir = 'data/';
let filename = 'teamsTest.json';

describe('http single resource server', () => {

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

  //City mispelled on purpose
  it('POST adds team to data store; confirm by checking that /teams page updates', done => {
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
 


//PUT

//DELETE



});