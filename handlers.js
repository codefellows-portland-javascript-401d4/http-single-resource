const fileStore = require('./lib/dotaTeam');
const bodyReader = require('./lib/bodyReader');
const handlers = {};

handlers.post = (req, res) => {
  return bodyReader(req, (err, team) => {
    if(err) {
      res.statusCode = 400;
      console.log('POST 400 error');
      res.end(err.message);
    } else {
      res.writeHead(200, {
        'Content-Type': 'application/json' 
      });
      fileStore.createFile(team).then(data => {
        res.write(data);
        res.end();
      })
      .catch(err => {
        console.log('POST catch error');
        res.end(err);
      });
    }
  });
};

handlers.getSingle = (req, res, id) => {
  fileStore.getFile('/' + id)
    .then(team => {
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      res.end(team);
    }).catch(err => {
      console.log('GET single catch error');
      res.end(err);
    });
};

handlers.getAll = (req, res) => {
  fileStore.readDir(fileStore.path)
    .then(idArr => fileStore.getAll(idArr))
    .then(allData => {
      res.writeHead(200, {
        'Content-Type': 'application/json' 
      });
      console.log(allData);
      res.write(JSON.stringify(allData));
      res.end();
    })
    .catch(err => {
      res.end(err);
    });
};

handlers.notFound = res => {
  res.statusCode = 404;
  res.end('not found');
};

module.exports = handlers;
