module.exports = function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';

    req.on('data', (data) => {
      body += data;
    });

    req.on('end', (err) => {
      if (err) reject(err);
      else resolve(body);
    });
  });
};