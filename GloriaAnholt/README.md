This module is a http server which accepts only JSON resources, backed by a
persistent data store. RESTful and generally CRUDdy (accepts GET, POST, and
DELETE requests).

* Written in ES6, using Node v6+
* Linted with eslint
* Tested with Mocha using the chai-http server testing library

To Use
* Run the server using node server.js -- to interact with the file store,
I recommend using a third-party interface such as the Chrome App Postman.