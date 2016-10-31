const sander = require('sander');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const assert = chai.assert;
const httpserver = require('../lib/http-server');


describe('Single-resource http server', () => {

  before(done => {
    // if the san diego file is still around, remove it. ditch the error if it's not around.
    sander.unlink('/home/driel/projects/CodeFellows401/lab_assignments/class08-http-single-resource/data/san_diego.json')
      .catch((err) => {
        done();
      })
  });

  let server = chai.request(httpserver);

  it('hits the root and gets a 200 Ok', done => {
    server
      .get('/')
      .end((err, res)=> {
        if (err) return done(err);
        assert.equal(res.status, 200);
        done();
      })
  });

  it('retrieves all files in the data folder by name', done => {

    const testHtml = '<h2>The data store contains the following files: </h2><ul>\n\n' +
      '<li>boston.json</li>' +
      '<li>los_angeles.json</li>' +
      '<li>miami.json</li>' +
      '<li>new_york.json</li>' +
      '<li>san_francisco.json</li>' +
      '</ul>' +
      'To retrieve a file, please query the file name';

    server
      .get('/data')
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(res.text, testHtml);
        done();
      })
  });

  it('retrieves the contents of a file', done => {

    const expectedResults = '{"City":"Boston","State":"MA","Mean_1_Bdrm_Price":"$2025"}\n';

    server
      .get('/data?id=boston.json')
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(res.text, expectedResults);
        done();
      })
  });

  it('writes post data to a file', done => {

    const expectedResults = 'File san_diego.json saved.';

    server
      .post('/data')
      .send({"City":"San Diego","State":"CA","Median_1_BR_price":"$1,500","Median_2_BR_price":"$2,100"})
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(res.text, expectedResults);
        done();
      })
  });

  it('retrieves all files in the data folder by name', done => {

    const testHtml = '<h2>The data store contains the following files: </h2><ul>\n\n' +
      '<li>boston.json</li>' +
      '<li>los_angeles.json</li>' +
      '<li>miami.json</li>' +
      '<li>new_york.json</li>' +
      '<li>san_diego.json</li>' +
      '<li>san_francisco.json</li>' +
      '</ul>' +
      'To retrieve a file, please query the file name';

    server
      .get('/data')
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(res.text, testHtml);
        done();
      })
  });

});

