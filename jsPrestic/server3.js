#!/usr/bin/env node
var WebSocketServer = require('websocket').server;
var http = require('http');
var fs = require('fs');
var url = require('url');

var server = http.createServer(function(request, response) {
    console.log((new Date()) + ' Received request for ' + request.url);
    var reqFile = url.parse(request.url);
    fs.readFile('.'+reqFile.pathname, function(error, data){
        if(error){
            response.writeHead(404);
            response.end();
            return;
        }
        response.writeHead(200, {'Content-Type':'text/html'});
        response.write(data);
        response.end();
    })
});

server.listen(8080, function() {
    console.log((new Date()) + ' Server is listening on port 8080');
});

wsServer = new WebSocketServer({
    httpServer: server,
    // You should not use autoAcceptConnections for production
    // applications, as it defeats all standard cross-origin protection
    // facilities built into the protocol and the browser.  You should
    // *always* verify the connection's origin and decide whether or not
    // to accept it.
    autoAcceptConnections: false
});

function originIsAllowed(origin) {
  // put logic here to detect whether the specified origin is allowed.
  return true;
}

var users = {}
wsServer.on('request', function(request){
    if (!originIsAllowed(request.origin)) {
      // Make sure we only accept requests from an allowed origin
      request.reject();
      console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
      return;
    }
	
	
	var connection = request.accept('video-protocal', request.origin);
    connection.on("message", function(message){
        var data;
        try{
            data = JSON.parse(message.utf8Data);
        }catch(e){
            console.log(message.utf8Data);
            data = {}
        }

        switch(data.type){
            case "login":
                console.log("User logged", data.name);
                if(users[data.name]){
                    sendTo(connection, {type:"login", success:false});
                }else{
                    users[data.name] = connection;
                    connection.name = data.name;
                    sendTo(connection, {type:'login', success:true});
                }
                break;
            case "offer":
                console.log("sending offer to: ", data.name);
                var conn = users[data.name];

                if(conn != null){
                    connection.otherName = data.name;
                    sendTo(conn, {type:"offer", offer:data.offer, name:connection.name});
                }
                break;
            case "answer":
                console.log("sending answer to: ", data.name);
                var conn = users[data.name];
                if(conn != null){
                    connection.otherName = data.name
                    sendTo(conn, {type:"answer", answer:data.answer});
                }
                break;
            case "candidate":
                console.log("Sending candidate to: ",data.name);
                var conn = users[data.name];
                if(conn != null){
                    sendTo(conn,{type:"candidate", candidate:data.candidate});
                }
                break;
            case "leave":
                console.log("Disconnecting from", data.name);
                var conn = users[data.name];
                conn.otherName = null;
                if(conn != null){
                    sendTo(conn, {type:"leave"});
                };
                break;
            default:
                sendTo(connection, {type:"error", message:"command not found: "+data.type})
                break;
        }
    })
    connection.on("close", function(){
        if(connection.name){
            delete users[connection.name];
            if(connection.otherName){
                console.log("Disconnection from ", connection.otherName);
                var conn = users[connection.otherName];

                if(conn != null){
                    sendTo(conn, {type:"leave"})
                }
            }
        }
    })
})

function sendTo(connection, message){
	connection.send(JSON.stringify(message));
}