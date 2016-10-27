const sander = require('sander');

const fileStore = {};

fileStore.teamToJson = teamObj => JSON.stringify(teamObj);

fileStore.createFile = teamObj => {
  return new Promise((resolve, reject) => {

    var fileName = teamObj.teamName.split(' ').join('').toLowerCase();
    var teamJSON = fileStore.teamToJson(teamObj);
    console.log('file name', fileName);
    sander.writeFile('./lib/dotaTeams', fileName, teamJSON)
      .then(team => {
        console.log(teamJSON);
        return teamJSON;
      });
  });
  
  
  
  
  
};

module.exports = fileStore;