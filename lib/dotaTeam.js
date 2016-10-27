const sander = require('sander');

const fileStore = {};

fileStore.teamToJson = teamObj => JSON.stringify(teamObj);

fileStore.createFile = teamObj => {
  var fileName = teamObj.teamName.split(' ').join('').toLowerCase();
  var teamJSON = fileStore.teamToJson(teamObj);
  return sander.writeFile('./lib/dotaTeams', fileName, teamJSON);
};

fileStore.readDir = dir => {
  return sander.readdir(dir);
}; 

module.exports = fileStore; 