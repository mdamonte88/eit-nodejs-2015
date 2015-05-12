"use strict";

var express = require("express"),
	app = express(),
	http = require("http").createServer(app),
	io = require("socket.io")(http),
	port = process.env.PORT || 3000,
	publicDir = express.static(__dirname + "/public");

app.use(publicDir);

http.listen(port,function (){
	console.log("Iniciando Express en el puerto %d", port);
});

app.get("/",function (req, res){
	res.sendFile(publicDir + "/index.html");
});

io.on("connection", function (socket){
	socket.on("new message", function (message){
		io.emit("user says", message);
	});

	socket.broadcast.emit("new user",{newUser:"Ha entrado un usuario al Chat"});
});