const sander = require('sander');
const dir = './data_store';

const dataStore = {};
let test = [];

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
    return sander.writeFile(dir, obj.id, JSON.stringify(obj))
        .then(() => { return obj.id; });
} 

module.exports = dataStore;