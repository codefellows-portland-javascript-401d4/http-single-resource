const fs = require('fs');

function deleteHandler(parsedPathObject, callback) {
    reqUrl = '.' + parsedPathObject.dir + '/' + parsedPathObject.name + '.json';
    fs.access(reqUrl, err => {
        if (err) {
            callback('No such file exists');
        } else {
            fs.unlink(reqUrl, err => {
                if (err) callback(err);
                else callback(null,'File was deleted');
            });
        }
    });
};

module.exports = deleteHandler;