module.exports = function bodyReader(request, cb) {
    let body = '';

    request.on('data', data => {
        body += data;        
    });

    request.on('end', () => {
        try {
            // callback(null, JSON.parse(body));
            cb(null, body);
        }
        catch (err) {
            cb(err);
        }
    });
};