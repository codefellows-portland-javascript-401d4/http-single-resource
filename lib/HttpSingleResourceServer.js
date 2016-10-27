const http = require('http');
const parseUrl = require('url').parse;

module.exports = http.createServer((req, resp) => {

  const url = parseUrl(req.url, true); // true means parse the query string into key/value pairs
  // console.log('You requested ', url.pathname);

  if (url.pathname === '/notes') {
    // TODO: replace with code that actually reads from the NoteStore
    resp.write('all notes');
    resp.end();
  }
  else if (url.pathname === '/notes/testnote') {
    // TODO: replace with code that actually reads from the NoteStore
    const body = { noteBody: 'Test note.' };
    resp.setHeader('Content-Type', 'application/json');
    resp.write(JSON.stringify(body));
    resp.end();
  }
  else {
    resp.statusCode = 404;
    resp.end();
  }

});