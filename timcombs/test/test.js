const server = require('../lib/server');
const dataStore = require('../lib/dataStore');

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);

//unit tests on the dataStore
describe('unit testing the dataStore module', () => {
  it('reads a directory', () => {
    dataStore.retrieveDir('./notes')
      .then((dirList) => {
        expect(dirList).to.equal([ 'test1.json', 'test2.json' ]);
      })
      .catch((err) => {
        return err;
      });
  });

  it('reads a file', ()=> {
    dataStore.retrieveFile('./notes/test1.json')
      .then((fileData) => {
        expect(fileData).to.be.equal({ 'title': 'test1.json', 'text': 'Dinner is consistent, the chicken comes out golden every time' });
      })
      .catch((err) => {
        return err;
      });
  });
});

//E2E testing the server
describe('E2E testing the server', () => {
  it('returns status code = 200 on successful requests', () => {
    chai.request(server)
    .get('/')
    .then((res) => {
      expect(res).to.have.status(200);
    })
    .catch((err) => {
      return err;
    });
  });

  it('sends response to request for specific path', () => {
    chai.request(server)
      .get('/notes')
      .then((res) => {
        //is this correct? if so, why does getting the text back tell me the server found the correct path?
        expect(res.text).to.be.equal('test1.json\ntest2.json\n');
      })
      .catch((err) => {
        return err;
      });
  });

  it('sends response to request for specific file', () => {
    chai.request(server)
      .get('/notes/test1.json')
      .then((res) => {
        expect(res.text).to.equal('{\n  "title": "test1.json",\n  "text": "Dinner is consistent, the chicken comes out golden every time"\n}');
      })
      .catch((err) => {
        return err;
      });
  });

  it('fails whreturnn navigating to an unknown path', () => {
    chai.request(server)
      .get('/nowhere/fast.json')
      .then((res) => {
        expect(res).to.have.status(400);
        expect(res.text).to.be.equal('that was not a valid path please check your map');
      })
      .catch((err) => {
        return err;
      });
  });

  it('sends response to POST request for specific file', () => {
    chai.request(server)
      .post('/notes/test3.json')
      .then((res) => {
        expect(res);
      })
      .catch((err) => {
        return err;
      });
  });

  it('sends response to PUT request for specific file', ()=> {
    chai.request(server)
      .put('/notes/test3.json')
      .then((res) => {
        expect(res);
      })
      .catch((err) => {
        return err;
      });
  });

  it('sends response to DELETE request for specific file', () => {
    chai.request(server)
      .delete('/notes/test3.json')
      .then((res) => {
        expect(res);
      })
      .catch((err) => {
        return err;
      });
  });
});