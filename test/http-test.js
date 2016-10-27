const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const server = require('../index.js');

describe('Our server responds to requests', done => {
  let request = chai.request('http://localhost:8080');
  it('should make a file from a POST request' done => {
    request
      .post('/')
  })
})