"use strict";

var http = require("http").createServer(server);

function server(req, res)
{
	var message = "<h1>Hola Navegador Web con Node.JS =D</h1>";
	res.writeHead(200,{"Content-Type":"text/html"});
 	//debugger;
	res.end(message);
}
	
http.listen(3001);

console.log("Servidor corriendo desde http://127.0.0.1:3000/");