How to use filestore API:

Start server with index.js.

"GET" request to /teams will return array of all files (and contents).
 --- localhost:8080/teams ---

"GET" request to /teams/:id will return requested file.
--- localhost:8080/teams/3 ---

"POST" request to /teams with a JSON object in the body will save that object to the fileStore and return that object with its unique ID number as a property.
--- localhost:8080/teams ---
--- {"teamName":"Natus Vincere","teamMembers":["Ditya Ra","Dendi","GeneRaL","SoNNeikO","Artstyle"],"region":"EU","tiWinner":true,"id":1} ---

"PUT" request to /teams/:id will update requested file.
--- localhost:8080/teams/4 ---
--- {"teamName":"changeME","region":"EU","tiWinner":true} ---

"DELETE" request to /teams/:id will delete specific file.
--- localhost:8080/teams/2 ---