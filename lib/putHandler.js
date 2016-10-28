const sander = require('sander');
const resourceDir = './resources/';

function putHandler(parsedPathObject, req, callback) {
    var reqUrl = `${resourceDir}${parsedPathObject.name}.json`;
    var parsedName = parsedPathObject.name;
    var body = '';
    var jsonObject = {};
    var origJsonObject = {};
    var jsonKeys;
    var updatedJsonObject;
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
                        .then(data => { callback(null, `put good, your resource id is ${parsedName}`); })
                        .catch(err => {
                            callback(err);
                        });
                } else {
                    jsonObject = JSON.parse(body);
                    sander
                        .readFile(reqUrl, {'encoding': 'utf-8'})
                        .then(olddata => {
                            origJsonObject = JSON.parse(olddata);
                            jsonKeys = Object.keys(jsonObject);
                            updatedJsonObject = jsonKeys.reduce((acc, curr) => {
                                acc[curr] = jsonObject[curr];
                                return acc;
                            }, origJsonObject);
                            return JSON.stringify(updatedJsonObject);
                        })
                        .then(data => {
                            sander
                                .writeFile(reqUrl, data)
                                .then(data => {
                                    callback(null, `put good, your resource id is ${parsedPathObject.name}`);
                                });
                        })
                        .catch(err => {
                            callback(err);
                        });
                };
            });
        });
};

module.exports = putHandler;