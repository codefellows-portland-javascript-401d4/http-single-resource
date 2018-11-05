const sander = require('sander');
const resourceDir = './resources/';

function getHandler(parsedPathObject, getResponse) {
    var parsedDir       = parsedPathObject.dir;
    var parsedBase      = parsedPathObject.base;
    var parsedName      = parsedPathObject.name;
    if (parsedDir === '/cats' || parsedBase === 'cats') {
        sander
            .readdir( resourceDir )
            .then( data => {
                if (parsedName === 'cats') getResponse(null, data.toString(), 'text/plain');
                else sander
                    .readFile(`${resourceDir}${parsedName}.json`, {'encoding': 'utf-8'})
                    .then(data => { getResponse(null, data, 'application/json'); })
                    .catch(err => { getResponse(err); });
            })
            .catch(err => { getResponse(err); });
    } else {
        getResponse('bad request');
    };  
};

module.exports = getHandler;