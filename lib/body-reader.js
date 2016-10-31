module.exports = function bodyReader(request, callback) {
    let body = '';

    request.on('data', data => {
        body += data;        
    });

    request.on('end', () => {
        try {
            callback(null, JSON.parse(body));
        }
        catch (err) {
            callback(err);
        }
    });
};