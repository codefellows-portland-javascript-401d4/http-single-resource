const sander = require('sander');
const fileStore = {};

fileStore.path = './lib/dotaTeams';

fileStore.teamToJson = teamObj => JSON.stringify(teamObj);

fileStore.createFile = teamObj => {
  return fileStore.readDir(fileStore.path)
    .then(idArr => {
      if (!idArr.length) {
        return ['0'];
      } else {
        return idArr.sort((a, b) => {
          return a - b;
        });
      }
    })
    .then(sortedArr => {
      let fileId = sortedArr.pop();
      teamObj.id = ++fileId;
      let fileName = teamObj.id.toString();
      let teamJSON = fileStore.teamToJson(teamObj);
      return sander.writeFile(fileStore.path, fileName, teamJSON);
    })
    .catch(err => {
      return (err);
    });
};

fileStore.readDir = dir => {
  return sander.readdir(dir);
}; 

fileStore.getFile = teamName => {
  return sander.readFile(fileStore.path + '/' + teamName, {encoding: 'utf-8'});
};

fileStore.getAll = idArray => {
  console.log('idArray in filestore: ', idArray);
  return new Promise ((resolve, reject) => {
    let allFiles = [];
    idArray.forEach(id => {
      console.log('getfile id: ', id);
      fileStore.getFile(id)
        .then(file => {
          allFiles.push(file);
          if (allFiles.length === idArray.length) {
            resolve(allFiles);
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  });
};

fileStore.updateFile = (teamObj, id) => {
  teamObj.id = id;
  let teamJSON = fileStore.teamToJson(teamObj);
  return sander.writeFile(fileStore.path, id, teamJSON);
};

fileStore.destroy = teamName => {
  return sander.unlink(fileStore.path + '/' + teamName);
};

module.exports = fileStore; 

