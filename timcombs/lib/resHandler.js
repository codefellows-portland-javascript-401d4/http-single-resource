const resHandler = {};

resHandler.writeDir = (data, res) => {
  if (data.length === 0) {
    res.write('There are no notes, add some!');
  }else{
    data.forEach((file) => {
      res.write(file);
      res.write('\n');
    });
  }
  res.end();
};

resHandler.writeFile = (data, res) => {
  //if no data in the note part
  if (!JSON.parse(data)['text']) {
    res.write('That note is empty. Perhaps you meant to update the note?');
  }else{
    res.write(data);
  }
  res.end();
};

resHandler.writeDeleteMsg = (res) => {
  res.write('Your file has been deleted');
  res.end();
};

resHandler.writeUpdateMsg = (res) => {
  res.write('Your file has been updated');
  res.end();
};

resHandler.writeStashMsg = (res) => {
  res.write('Your file has been stashed!');
  res.end();
};

resHandler.errHandler = (res) => {
  let status = res.statusCode;
  let msg = '';
  if (status === 400) {
    msg = 'that was not a valid path please check your map';
  }else if (status === 404) {
    msg = 'file or directory not found';
  }else if (status === 410) {
    msg = 'That is not a valid note. Perhaps you meant to create a new note?';
  }else if (status === 500) {
    msg = 'our server is having difficulties, sorry';
  }
  res.write(msg);
  res.end();
};
  
module.exports = resHandler;