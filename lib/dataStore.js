const sander = require('sander');
const dir = './data_store';

const dataStore = {};

dataStore.getData = (id) => {
    return sander.readFile(dir, id, {encoding: 'utf-8'})
    .then((data) => {
        return JSON.parse(data);
    })
    .catch(err => {
        console.log(err);
    });
};

dataStore.getAll = () => {
    return sander.readdir(dir)
    .then(files=> {
        files.forEach((f) => { 
            dataStore.getData(f).then((data) =>{
        }) ;
    });
}

module.exports = dataStore;