const expect = require('chai').expect;
const assert = require('chai').assert;
const chai = require('chai');
const chaiHttp = require('chai-http');
const path = require('path');
const sander = require('sander');
const test_server = require('../lib/HttpSingleResourceServer');
const NoteStore = require('../lib/NoteStore');
chai.use(chaiHttp);

const testNotes = [
  { noteBody: 'Test file 1.' },
  { noteBody: 'Test file 2.' },
  { noteBody: 'Test file 3.' }
];

describe ('Server integration tests', function() {

  let notesDir;
  let noteStore;
  let request = chai.request(test_server);

  before((done) => {
    notesDir = path.join(__dirname, '../notes');
    if (!sander.existsSync(notesDir)) {
      sander.mkdirSync(notesDir);
    }

    noteStore = new NoteStore(notesDir);

    Promise.all([
      noteStore.store('testfile1', testNotes[0]),
      noteStore.store('testfile2', testNotes[1]),
      noteStore.store('testfile3', testNotes[2])
    ])
    .then(() => {
      done();
    });
  });

  describe ('HTTP GET', () => {

    it ('"/notes" returns all notes', (done) => {
      request
        .get('/notes')
        .end((err, res) => {
          expect(res.body).to.deep.equal(testNotes);
          done(err);
        });
    });

    it ('"/notes/:resourcename" returns that resource (note)', (done) => {
      request
        .get('/notes/testfile1')
        .end((err, res) => {
          expect(res.body).to.deep.equal(testNotes[0]);
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

  describe ('HTTP POST', () => {

    it ('"/notes" with { id: "testfile4", noteBody: "Hello, world!" } stores that content in the store', (done) => {
      request
        .post('/notes')
        .send({ id: 'testfile4', noteBody: 'Hello, world!' })
        .end((err) => {
          if (err) done(err);
          request
            .get('/notes/testfile4')
            .end((err, res) => {
              expect(res.body).to.deep.equal({ noteBody: 'Hello, world!' });
              done(err);
            });
        });
    });

  });

  describe ('HTTP PUT', () => {

    it ('"/notes/:resourcename" with { noteBody: "This is new content." } stores that content in resourcename', (done) => {
      assert.fail(null, null, 'Test not implemented yet.');
      done();
    });

  });

  describe ('HTTP DELETE', () => {

    it ('"/notes/:resourcename" removes resourcename from the store', (done) => {
      assert.fail(null, null, 'Test not implemented yet.');
      done();
    });
  });

  after ((done) => {
    sander.rimraf(notesDir)
      .then(done);
  });
});