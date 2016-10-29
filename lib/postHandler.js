const sander = require('sander');
const resourceDir = './resources/';

function postHandler(parsedPathObject, req, postResponse) {
    var body = '';
    var dataId = '';
    var parsedDir = parsedPathObject.dir;
    var parsedBase = parsedPathObject.base;
    if (parsedDir === '/' && parsedBase === 'cats') {    
        sander
            .readdir( resourceDir )
            .then( data => {
                return dataTruncate = data
                    .map(fileName => { return Number(fileName.split('.')[0]); })
                    .sort((a,b) => { return (a < b) ? -1 : 1 ; });
            })
            .then( array => {
                req.on('data', data => {
                    body += data.toString('utf-8');
                });
                req.on('end', () => {
                    dataId = array[(array.length - 1)] + 1;
                    sander
                        .writeFile(`${resourceDir}${dataId}.json`, body)
                        .then(data => { postResponse(null, 'post good, your resource id is ' + dataId); })
                        .catch(err => { postResponse(err); });
                });
            })
            .catch(err => { postResponse(err); });
    } else {
        postResponse('directory does not exist');
    };
};

module.exports = postHandler;