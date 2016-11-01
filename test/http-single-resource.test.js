const expect = require('chai').expect;
const chai = require('chai');
const chaiHttp = require('chai-http');
const path = require('path');
const sander = require('sander');
const test_server = require('../lib/HttpSingleResourceServer');
const NoteStore = require('../lib/NoteStore');
chai.use(chaiHttp);

const testNotes = [
  { id: 'testfile1', noteBody: 'Test file 1.' },
  { id: 'testfile2', noteBody: 'Test file 2.' },
  { id: 'testfile3', noteBody: 'Test file 3.' },
  { id: 'testfile4', noteBody: 'Hello, world!' }
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
      noteStore.store(testNotes[0]),
      noteStore.store(testNotes[1]),
      noteStore.store(testNotes[2])
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
          expect(res.body).to.deep.equal(testNotes.slice(0,3));
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

    it (`"/notes" with ${JSON.stringify(testNotes[3])} stores that content in the store`, (done) => {
      request
        .post('/notes')
        .send(testNotes[3])
        .end((err) => {
          if (err) done(err);
          request
            .get(`/notes/${testNotes[3].id}`)
            .end((err, res) => {
              expect(res.body).to.deep.equal(testNotes[3]);
              done(err);
            });
        });
    });

  });

  describe ('HTTP PUT', () => {

    it ('"/notes/:resourcename" with { noteBody: "This is new content." } stores that content in resourcename', (done) => {
      request
        .put(`/notes/${testNotes[2].id}`)
        .send({ noteBody: 'This is new content.' })
        .end((err, res) => {
          if (err) done(err);
          expect(res.text).to.equal(`Stored note as ${testNotes[2].id}`);
          request
            .get(`/notes/${testNotes[2].id}`)
            .end((err, res) => {
              if (err) done(err);
              expect(res.body).to.deep.equal({ id: 'testfile3', noteBody: 'This is new content.' });
              done();
            });
        });
    });

  });

  describe ('HTTP DELETE', () => {

    it ('"/notes/:resourcename" removes resourcename from the store', (done) => {
      request
        .del(`/notes/${testNotes[3].id}`)
        .end((err, res) => {
          expect(res.text).to.equal(`Deleted note ${testNotes[3].id}`);
          done(err);
        });
    });

    it ('removed resource is really gone', (done) => {
      request
        .get('/notes/testfile4')
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });

  after ((done) => {
    sander.rimraf(notesDir)
      .then(done);
  });
});