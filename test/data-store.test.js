const expect = require('chai').expect;
const chai = require('chai');
const chaiHttp = require('chai-http');
const path = require('path');
const sander = require('sander');
const DataStore = require('../lib/DataStore');
chai.use(chaiHttp);

const testNotes = [
  { id: 'testfile1', noteBody: 'Test file 1.' },
  { id: 'testfile2', noteBody: 'Test file 2.' },
  { id: 'testfile3', noteBody: 'Test file 3.' }
];

describe ('DataStore unit tests', () => {

  let notesDir;
  let dataStore;

  before(() => {
    notesDir = path.join(__dirname, '../notes');
    if (!sander.existsSync(notesDir)) {
      sander.mkdirSync(notesDir);
    }
    dataStore = new DataStore(notesDir);
  });

  it ('store() stores test note in a file', (done) => {
    dataStore.store(testNotes[0])
      .then((retval) => {
        expect(retval).to.equal(testNotes[0].id);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it ('get() gets test note from a file', (done) => {
    dataStore.get('testfile1')
      .then((data) => {
        expect(data).to.deep.equal(testNotes[0]);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });


  it ('gets an array of all notes with getAll()', (done) => {
    Promise.all([
      dataStore.store(testNotes[1]),
      dataStore.store(testNotes[2])
    ])
    .then(() => {
      return dataStore.getAll();
    })
    .then((arr) => {
      let result = arr;
      expect(result).to.deep.equal(testNotes);
      done();
    })
    .catch((err) => {
      done(err);
    });
  });
  
  after((done) => {
    sander.rimraf(notesDir)
      .then(done);
  });

});