const fs = require('fs');
const sander = require('sander');

function postHandler(parsedPathObject, req, callback) {
    var body = '';
    var dataId = '';
    if (parsedPathObject.dir ==='/' && parsedPathObject.base === 'cats') {    
        sander
            .readdir('./resources')
            .then( data => {
                return dataTruncate = data
                    .map(fileName => { return Number(fileName.split('.')[0]); })
                    .sort((a,b) => {
                        if (a < b) return -1;
                        else return 1;
                    });
            })
            .then( array => {
                req.on('data', data => {
                    body += data.toString('utf-8');
                });
                req.on('end', () => {
                    dataId = array[(array.length - 1)] + 1;
                    fs.writeFile(`./resources/${dataId}.json`, body, (err) => {
                        if (err) callback(err);
                        else callback(null, 'post good');
                    });
                });
            });
    } else {
        callback('directory does not exist');
    };
};

module.exports = postHandler;