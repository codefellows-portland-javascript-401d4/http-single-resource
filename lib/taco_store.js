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

    openFile(dir, flags) {
        return sander.open(dir, flags);
    }

    // appendFile(file) {
    //     return sander.appendFile(file);
    // }

    writeFile(file, data) {
        return sander.writeFile(file, data);
    }

};


module.exports = TacoStore;
