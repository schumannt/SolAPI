/************************************************
FILENAME
SoleraApi.js
DESCRIPTION
basic api to play with packages for solera. knex bookshelf bluebird 
HOW TO START SERVER:
1) from terminal run 'node SoleraApi.js'
2) open web browser visit http://127.0.0.1:8080
*************************************************/

var http = require('http');
var knex = require('knex')({client: 'mysql', connection: {host: '127.0.0.1', user: 'root', password: 'root', database: 'Solera_Job', charset: 'utf8'} });
var bookshelf = require('bookshelf')(knex);
var Promise = require("bluebird");

var User = bookshelf.Model.extend({
  tableName: 'Solera_Customer'
});

// define the IP and port number
var localIP = "127.0.0.1"; // 127.0.0.1 is used when running the server locally
var port = 8080; // port to run webserver on

function handleRequest(request, response) {
    console.log("We've got a request for " + request.url);
    var action = request.url.split("/").pop();
    switch (action.split("=").shift()) {
    case "keepalive":
        response.writeHead(200, {"Content-Type": "text/html"});
        response.end('Keepalive');
        break;
    case "user":
    	getUser(action.split("=").pop(), function(results){
    		response.setHeader('Access-Control-Allow-Origin', '*');
    		response.writeHead(200, {'Content-Type': 'application/json'});
    		console.log(results);
    		response.end(results);
    	})
        break;
    default:
        response.writeHead(200, {"Content-Type": "text/html"});
        response.end('Keepalive');
        break;

    }
    return;
}

function getUser(userID, done) {
    User.where('P_Id', userID).fetch().then(function(user) {
    	console.log("hello");
		console.log(JSON.stringify(user));
		return done(JSON.stringify(user));
	}).catch(function(err) {
		return done(err);
	});
}

/************************/
/*  START THE SERVER    */
/************************/

// Create the HTTP server
var server = http.createServer(handleRequest);
server.listen(port, localIP);
console.log('Server running at http://'+ localIP +':'+ port +'/');
