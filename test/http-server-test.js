const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const assert = chai.assert;
const server = require("../lib/http-server");

let request = chai.request(server);

describe("http single resource server", () => {

  it("error message on non-existent path", function (done) {
    request
            .get("/DoesNotExist")
            .end((err, res) => {
              if (err) return done(err);
              assert.equal(res.text, "404 - Not Found\nI told you there are only / and /Members in this rinky-dink website!");
              done();
            });
  });

//   it("a path (/Members) correctly uses url.pathname", function (done) {
//     request
//             .get("/Members")
//             .end((err, res) => {
//               if (err) return done(err);
//               assert.equal(res.text, membersRes);
//               done();
//             });
//   });

//   it("/Members correctly uses queryData.name", function (done) {
//     request
//             .get("/Members?name=Greg+Katchmar")
//             .end((err, res) => {
//               if (err) return done(err);
//               assert.equal(res.text, membersRes + "\nHello member Greg Katchmar!\n");
//               done();
//             });
//   });

// });