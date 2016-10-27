module.exports = function bodyReader(req, cb) {
  let body = '';

  req.on('data', data => {
    body += data;
  });

  req.on('end', () => {
    try {
      var teamObj = JSON.parse(body);
      var fileName = teamObj.teamName.split(' ').join('').toLowerCase();
      cb(null, teamObj, fileName); 
    }
    catch (err) {
      cb(err);
    }
  });

};