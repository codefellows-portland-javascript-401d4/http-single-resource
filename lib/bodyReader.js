module.exports = function bodyReader(req, cb) {
  let body = '';

  req.on('data', data => {
    body += data;
  });

  req.on('end', () => {
    try {
      var teamObj = JSON.parse(body);
      var fileName = teamObj.id;
      cb(null, teamObj, fileName); 
    }
    catch (err) {
      console.log('body reader error');
      cb(err);
    }
  });

};