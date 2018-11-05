const sander = require('sander');
const resourceDir = './resources/';

function updateJson(originalJsonData, updatedJsonData) {
    var jsonKeys = Object.keys(updatedJsonData);
    var updatedJsonObject = jsonKeys.reduce((acc, curr) => {
        acc[curr] = updatedJsonData[curr];
        return acc;
    }, originalJsonData);
    return updatedJsonObject;
};

function putHandler(parsedPathObject, req, putResponse) {
    var body = '';
    var newJsonObject = {};
    var origJsonObject = {};
    var parsedName = parsedPathObject.name;
    var reqUrl = `${resourceDir}${parsedPathObject.name}.json`;
    sander
        .exists( reqUrl )
        .then( existence => {
            req.on('data', data => {
                body += data.toString('utf-8');
            });
            req.on('end', () => {
                if (!existence) {
                    sander
                        .writeFile(reqUrl, body)
                        .then(data => { putResponse(null, `put good, your resource id is ${parsedName}`); })
                        .catch(err => { putResponse(err); });
                } else {
                    newJsonObject = JSON.parse(body);
                    sander
                        .readFile(reqUrl, {'encoding': 'utf-8'})
                        .then(olddata => {
                            origJsonObject = JSON.parse(olddata);
                            return JSON.stringify(updateJson(origJsonObject, newJsonObject));
                        })
                        .then(data => {
                            sander
                                .writeFile(reqUrl, data)
                                .then(data => { putResponse(null, `put good, your resource id is ${parsedName}`); });
                        })
                        .catch(err => { putResponse(err); });
                };
            });
        }
    );
};

module.exports = putHandler;