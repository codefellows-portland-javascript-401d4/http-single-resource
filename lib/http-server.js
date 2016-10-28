const http = require('http');
const parseUrl = require('url').parse;
const fs = require('fs');
const qs = require('querystring');
const sander = require('sander');
const bodyReader = require("./body-reader");
const Stream = require("stream");

let basedir = 'data/';
let filename = 'teams.json';

module.exports = http.createServer((req, res) => {

  const url = parseUrl(req.url);
  const queryData = url.parse(req.url, true).query;
  console.log('requested resource:', req.method, url.pathname);
  res.writeHead(200, {'Content-Type': 'text/plain'});

  if (req.method === 'GET' && url.pathname === '/teams' &&! queryData.team) {
    sander.readFile(basedir, filename).then(result => {
      var content = JSON.parse(result);
      res.write(JSON.stringify(content));
      res.end();
    }
          );
  }

  //?team=Athletics or ?team=Cubs
  if (queryData.team) {
    console.log(queryData.team);
    sander.readFile(basedir, filename).then(result => {
      var content = JSON.parse(result);
      for ( var i=0; i<content.length; i++ ) {
        if (content[i].name === queryData.team) {
          res.write(JSON.stringify(content[i]));
          res.end();
        }
      }
    }
          );
  }

  if (req.method === 'POST') {

    bodyReader(req, (err, team) => {
      if(err) {
        res.statusCode = 400;
        res.end(err.message);
      }
      else {
        res.statusCode = 200;
        console.log('is res Stream stream?', res instanceof Stream);
        console.log(team);
        res.write(`Your team was named ${team.name}`);
        sander.readFile(basedir, filename).then(result => {
          var content = JSON.parse(result);
          content.push(team);
          res.write(JSON.stringify(content));
          res.end();

fs.writeFile(basedir + filename, JSON.stringify(content), function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 



        })
      };
    });
  }






  
 }) 



  //   if ( url.pathname === "/") {
  //   	res.write("In " + url.pathname + " directory\nThe only other valid directory is /Members\n");
  // 	} else if ( url.pathname === "/Members") {
  // 		res.write("In " + url.pathname + " directory\nQuery membership with '?name=John+Doe'\n");
  		
  //   if (queryData.name) {
	// 			// user told us their name in the GET request, ex: ?name=John+Doe
  //     res.write("\nHello member " + queryData.name + "!\n");
  //   }

  // 	} else {
  // 			res.write("404 - Not Found\nI told you there are only / and /Members in this rinky-dink website!");
  // 		}
  //   res.end();
  // } else {
	// 		//non-GET method attempted
  //   res.write("405 - Method Not Allowed\nI'm not that kind of website!");
  //   res.end();
  // }     

  // bodyReader(req, (err, team) => {
  //   if(err) {
  //     res.statusCode = 400;
  //     res.end(err.message);
  //   }
  //   else {
  //     res.statusCode = 200;
  //     console.log("is res Stream stream?", res instanceof Stream);
  //     console.log(team);
  //     res.write("your team ");
  //     res.end(`was named ${team.name}`);
  //   }
  // });

    



// GET - A get request sent to /notes should respond with a list of all of the notes that have been saved thus far. A get request sent to /notes/name_of_resource should respond with that resource.

// POST - The in-coming post request body should be saved to storage. For example if a request is sent to /notes with a body of { noteBody: 'hello world' } the store would now contain an object from that data.

// PUT - The data coming in should be saved to the named resource either creating or updating in entirety. So a request to /notes/name_of_resources is idempotent in that the contents in the body of the request always become the new data for that resource.

// DELETE - The corresponding resource should be removed. notes/name_of_resource would remove resource name_of_resource