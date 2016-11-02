const sander = require('sander');

const dataStore = class dataStore {
    getList(dir) {
        return sander.readdir(dir);
    }

    getFile(file) {
        return sander.readFile(file, {encoding: 'utf8'});
    }

    removeFile(file) {
        return sander.unlink(file);
    }

    openFile(dir, flags) {
        return sander.open(dir, flags);
    }

    writeFile(path,file, data) {
        return sander.writeFile(path, file, data);
    }
};

module.exports = dataStore;