var https = require("https");
var fs = require("fs");
var ws = require("ws");

var userMap = Object.create(null);
var options = {
    key: fs.readFileSync("./privatekey.pem"),
    cert: fs.readFileSync("./creatificate.pem")
}

var server = https.createServer(options, function(req, res){
    res.writeHead({
        "Content-Type": "text/html"
    });

    fs.readFile("./testaudio.html", function(err, data){
        if(err){
            return;
        }
        res.end(data);
    })
})

var wss = new ws.server({server:server});

wss.on("connection", function(o){
    o.on("message", function(message){
        if(message.indexOf("user") === 0){
            var user = message.split(":")[1];
            userMap[user] = 0;
        }else{
            for(var u in userMap){
                userMap[u].send(message);
            }
        }
    })
})

server.listen(8888);