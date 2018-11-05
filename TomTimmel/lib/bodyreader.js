

module.exports = function bodyreader(req, cb) {
    let body = '';

    req.on('data', data => {
        body += data;
        console.log('body', body);
    });

    req.on('end', () => {
        try {
            cb(null, JSON.parse(body));
        }
        catch (err) {
            cb(err);
        }
    });
};