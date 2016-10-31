const sander = require('sander');
const dir = './data_store';

const dataStore = {};

dataStore.getData = (id) => {
    console.log('getData', id)
    return sander.readFile(dir, id, {encoding: 'utf-8'})
    .then((data) => {
        return JSON.parse(data);
    }) ;
};

dataStore.getAll = () => {
    return sander.readdir(dir);
};

dataStore.store = (obj) => {
    console.log('obj', obj)
    return dataStore.getAll()
    .then((files)=> {
        let newId = files.length + 1;
        let newFile = newId + '.json';
        let data = JSON.stringify(obj);
        return sander.writeFile(dir, newFile, data);
    })
    .catch(err => {
        return (err);
    })
} 

module.exports = dataStore;