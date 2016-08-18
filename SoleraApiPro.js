/************************************************
FILENAME
SoleraApi.js
DESCRIPTION
basic api to play with packages for solera. knex bookshelf mocha bluebird 
HOW TO START SERVER:
1) from terminal run 'node SoleraApi.js'
2) open web browser visit http://127.0.0.1:8080
*************************************************/

const http = require('http');
const knex = require('knex')({client: 'mysql', connection: {host     : '127.0.0.1', user     : 'root', password : 'root', database : 'Solera_Job', charset  : 'utf8'} });
const bookshelf = require('bookshelf')(knex);
const Promise = require("bluebird");

const User = bookshelf.Model.extend({
  tableName: 'Solera_Customer'
});

const Cars = bookshelf.Model.extend({
  tableName: 'Solera_Car'
});

// define the IP and port number
const localIP = "127.0.0.1"; // 127.0.0.1 is used when running the server locally
const port = 8080; // port to run webserver on

function handleRequest(request, response) {
    console.log("We've got a request for " + request.url);
    var action = request.url.split("/").pop();
    switch (action.split("=").shift()) {
    case "keepalive":
        response.writeHead(200, {"Content-Type": "text/html"});
        response.end('Keepalive');
        break;
    case "user":
        let userID = action.split("=").pop()
        Promise.all([
            getUsers(userID),
            getUserCars(userID)
        ]).then(function(values) {
            let results = JSON.parse(values[0]);
            results.cars = JSON.parse(values[1]);
            response.writeHead(200, {"Content-Type": "text/html"});
            response.write(JSON.stringify(results));
            response.end();
        }).catch(function(err) {
            response.writeHead(400, {"Content-Type": "text/html"});
            response.write("Error in Call: " + err.toString());
            response.end();  
        });   
        break;
    default:
        response.writeHead(200, {"Content-Type": "text/html"});
        response.end('Keepalive');
        break;

    }
    return;
}

var getUsers = function (userID) {
    return new Promise(function (resolve, reject) {
        User.where('P_Id', userID).fetch().then(function(user) {
    		return resolve(JSON.stringify(user));
    	}).catch(function(err) {
    		return reject(err);
    	});
    })
}

var getUserCars = function (userID) {
    return new Promise(function (resolve, reject) {
        Cars.where('P_Id', userID).fetch().then(function(car) {
            return resolve(JSON.stringify(car));
        }).catch(function(err) {
            return reject(err);
        });
    })
}

/************************/
/*  START THE SERVER    */
/************************/

// Create the HTTP server
var server = http.createServer(handleRequest);
server.listen(port, localIP);
console.log('Server running at http://'+ localIP +':'+ port +'/');
