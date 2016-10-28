const sander = require('sander');


const TacoStore = class TacoStore {

    getList(dir) {
        return sander.readdir(dir);
    }

    getFile(file) {
        return sander.readFile(file, {encoding:'utf8'});
    }

    removeFile(file) {
        return sander.unlink(file);
    }

};


module.exports = TacoStore;
