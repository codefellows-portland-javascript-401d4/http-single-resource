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
    let dataFin = [];
    // console.log('hello', sander.readdirSync(dir))
    return sander.readdir(dir);
    // .then((data)=> {
    //     return sander.readFile(dir, )
    // })
    // })
    // .catch((err) => {
    //     console.log(err);
    // });
}

module.exports = dataStore;