const http = require("http");
const bodyReader = require("./body-reader");
const Stream = require("stream");

module.exports = http.createServer((req, res) => {

  bodyReader(req, (err, team) => {
    if(err) {
      res.statusCode = 400;
      res.end(err.message);
    }
    else {
      res.statusCode = 200;
      console.log("is res Stream stream?", res instanceof Stream);
      console.log(team);
      res.write("your team ");
      res.end(`was named ${team.name}`);
    }
  });

    
});