const sander = require('sander');
const fileStore = {};
let idCounter = sander.readdir('./lib/dotaTeams')
  .then(array => {
    console.log('array',array);
    return array.length ? array.length : 1;
  });

fileStore.path = './lib/dotaTeams';

fileStore.teamToJson = teamObj => JSON.stringify(teamObj);

fileStore.createFile = teamObj => {
  teamObj.id = idCounter;
  idCounter ++;
  let fileName = teamObj.id.toString();
  let teamJSON = fileStore.teamToJson(teamObj);
  return sander.writeFile(fileStore.path, fileName, teamJSON);
};

fileStore.readDir = dir => {
  return sander.readdir(dir);
}; 

fileStore.getFile = teamName => {
  return sander.readFile(fileStore.path + teamName);
}

fileStore.updateFile = teamObj => {
  let teamJSON = fileStore.teamToJson(teamObj);
  return sander.writeFile(fileStore.path, fileName, teamJSON)
    
}

module.exports = fileStore; 