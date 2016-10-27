const sander = require('sander');

const fileStore = {};

fileStore.teamToJson = teamObj => JSON.stringify(teamObj);

fileStore.createFile = teamObj => {
  var fileName = teamObj.teamName.split(' ').join('').toLowerCase();
  var teamJSON = fileStore.teamToJson(teamObj);
  return sander.writeFile('./lib/dotaTeams', fileName, teamJSON)
    .then(team => {
      console.log(team);
      return team;
    }); 
};

module.exports = fileStore;