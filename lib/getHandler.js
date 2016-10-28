const sander = require('sander');

function getHandler(parsedPathObject, callback) {
    var dataTruncate;
    if (parsedPathObject.dir === '/cats' || parsedPathObject.base === 'cats') {
        sander
            .readdir('./resources')
            .then( data => {
                dataTruncate = data.map(fileName => {
                    return fileName.split('.')[0];
                });
                if (parsedPathObject.name === 'cats') {
                    callback(null, data.toString(), 'text/plain');
                } else {
                    return sander.readFile(`./resources/${parsedPathObject.name}.json`, {'encoding': 'utf-8'})
                            .then(data => {
                                callback(null, data, 'application/json');
                            })
                            .catch(err => {
                                callback(err);
                            });
                };
            })
            .catch(err => {
                callback(err);
            });
    } else {
        callback('bad request');
    };  
};

module.exports = getHandler;