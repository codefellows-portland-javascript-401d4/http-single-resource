# HTTP single resource server with persistence

## Description

This HTTP server performs CRUD operations on notes.

## Motivation

This was written as a lab assignment for Code Fellows 401 class.

## API Reference

`GET http://<hostname>/notes` returns all notes as JSON

`GET http://<hostname>/notes/:id` returns the note at a specific id as JSON

`POST http://<hostname>/notes` with note (as JSON) stored on the message body stores the note at its specified id. The note should be in the form { id: "idstring", noteBody: "Contents of the note." }

`PUT http://<hostname>/notes/:id` with content (as JSON) stored on the message body replaces the content of the note at id. The content should be in the form { noteBody: "Content to replace old content." }

`DELETE http://<hostname>/notes/:id` removes the note at id from the server.

## Tests

The accompanying test suite can be run using the 'npm test' command.

## Contributors

[Mark Greenwood](https://github.com/markgreenwood)

## License

The MIT License (MIT)
Copyright (c) 2016 Mark Greenwood

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
