//shamelessly lifted from classroom demo
module.exports = function bodyReader(req, cb){
  let body = '';
    
  req.on('data', data => {
    body += data;
  });
/*eslint-disable */
  req.on('end', () => {
    try {
      cb(null, JSON.parse(body));
    }
		catch (err) {
  		cb(err);
}
  });
};