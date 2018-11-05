module.exports = function bodyReader(request, cb) {
    let body = '';

    request.on('data', data => {
        body += data;
    });

    request.on('end', () => {
        try {
            cb(null, body);
        }
        catch (err) {
            cb(err);
        }
    });
};
