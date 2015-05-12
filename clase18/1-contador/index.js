/*
Socket.IO
	1)Eventos connection y disconnect
	2)Puedes crear tus propios eventos
	3)emit(): cuando se comunica un mensaje a todos los clientes conectados
	4)broadcast.emit(): cuando se comunica un mensaje a todos los clientes, excepto al que lo origina
	5)Los 4 puntos anteriores funcionan en el servidor y en el cliente
*/
"use strict";

var http = require("http").createServer(server),
	fs = require("fs"),
	io = require("socket.io")(http),
	conexions = 0;

function server(req, res)
{
	fs.readFile(__dirname + "/statics/index.html", function (err, data){
		console.log(err);
		if(err)
		{
			res.writeHead(500,{"Content-Type":"text/html"});
      		res.end("<h1>Error Interno del Servidor</h1>");
		}
		else
		{
			res.writeHead(200,{"Content-Type":"text/html"});
		 	res.end(data,"utf-8");
		}
	});
}

http.listen(3000);
console.log("Servidor corriendo desde http://127.0.0.1:3000/");

io.on("connection", function (socket){
	socket.emit("hello",{message:"Hola Mundo con Socket.IO"});

	socket.on("otro evento que me invento", function (data){
		console.log(data);
	});

	conexions++;

	console.log("Conexiones activas: "+conexions);

	//socket.broadcast.emit("usuarios conectados",{numbers:conexions});
	socket.emit("usuarios conectados",{numbers:conexions});

	socket.on("disconnect", function(){
		conexions--;
		console.log("Conexiones activas: "+conexions);

		socket.broadcast.emit("usuarios conectados",{numbers:conexions});
	});
});