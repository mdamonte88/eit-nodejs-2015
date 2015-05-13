"use strict";

var app = require("express")(),
	http = require("http").createServer(app),
	io = require("socket.io")(http),
	port = process.env.PORT || 3000;

http.listen(port, function (){
	console.log("Transmitiendo por el puerto %d", port);
});

app.get("/", function (req, res){
	res.sendFile(__dirname + "/public/client.html");
});

app.get("/streaming", function (req, res){
	res.sendFile(__dirname+"/public/server.html");
});

io.on("connection", function (socket){
	socket.on("streaming", function (img){
		io.emit("play video", img);
		//console.log(img);
	});
});