var ws = require("nodejs-websocket")
var port = 3000; 
var userCount = 0; 
var server = ws.createServer(function (conn) {
    userCount++;
    conn.nickname = '游客' + userCount;
    console.log(conn.nickname);
    conn.on("text", function (str) {
        console.log("Received "+str)
        broadcast(conn.nickname + ' : ' + str);
    })
    conn.on("close", function (code, reason) {
        broadcast(conn.nickname," left");
    })
    conn.on("error", function(err){
        console.log(err);
    })
}).listen(port, function(){
    console.log(" server listen on ", port);
})

function broadcast(str){
    server.connections.forEach(function(connection){
        connection.sendText(str);
    })
}