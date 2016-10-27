const expect = require('chai').expect;
const assert = require('chai').assert;
const chai = require('chai');
const chaiHttp = require('chai-http');
const path = require('path');
const test_server = require('../lib/HttpSingleResourceServer');
const NoteStore = require('../lib/NoteStore');
chai.use(chaiHttp);

describe ('NoteStore unit tests', () => {

  let notesDir;
  let noteStore;

  before(() => {
    notesDir = path.join(__dirname, '../notes');
    console.log('notesDir ', notesDir);
    noteStore = new NoteStore(notesDir);
  });

  it ('stores test note in a file', (done) => {
    noteStore.store('testfile', { testBody: 'Test file.' })
      .then(() => {
        assert(true);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it ('gets test note from a file', () => {

  });
  
  after(() => {
    
  });

});

describe ('HTTP GET', function() {

  let request = chai.request(test_server);

  it('"/notes" returns all notes', (done) => {
    request
      .get('/notes')
      .end((err, res) => {
        expect(res.text).to.equal('all notes');
        done();
      });
  });

  it('"/notes/:resourcename" returns that resource (note)', (done) => {
    request
      .get('/notes/testnote')
      .end((err, res) => {
        expect(res.body).to.deep.equal({ noteBody: 'Test note.' });
        done(err);
      });
  });

  it ('"/invalidpath" returns a 404 error', (done) => {
    request
      .get('/invalidpath')
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });

});

describe ('HTTP POST', function() {

  it ('"/notes" with { noteBody: "Hello, world!" } stores that content in the store', (done) => {
    assert.fail(null, null, 'Test not implemented yet.');
    done();
  });

});

describe ('HTTP PUT', function() {

  it ('"/notes/:resourcename" with { noteBody: "This is new content." } stores that content in resourcename', (done) => {
    assert.fail(null, null, 'Test not implemented yet.');
    done();
  });

});

describe ('HTTP DELETE', function() {

  it ('"/notes/:resourcename" removes resourcename from the store', (done) => {
    assert.fail(null, null, 'Test not implemented yet.');
    done();
  });

});