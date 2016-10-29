#HTTP Page Single Resource Getter with Promises!

-I promise this will work!

###Author

Chris Bruner

###Version

v1.0.0

-All Restful methods for GET/PUT/POST/DELETE have been implemented with FS to act as persistence

-To return a list of all available files, simply go to url /cats

-To return a specifc url, we you must use an ID as part of the URL (e.g. /cats/1, /cats/2, etc.)

-To PUT data in, you must send a JSON file (emphasis on this) with requested id number (e.g. cats/1)

-To POST, you must send a JSON file, and direct the url to /cats otherwise it will not work and return an error

-To Delete, simply point to the file you wish to delete (e.g. /cats/0);

-Code Example:

To talk to the server, which will be held on localhost, you need to specificy your request method, and the request url should contain what you need

    -To get all cats: http://localhost:8999/cats/

    -All requests must be directed to the cats API, where :id is the unique id given for each resource at the time of creation http://localhost:8999/cats/:id
