"use strict";

/*
var http = require("http");

http
	.createServer(function (request,response){
		response.writeHead(200,{"Content.type":"text/<html></html>"});
		//response.write("<h1>Hola navegador Web con Node.JS</h1>")
		response.end("<h1>Hola navegador Web con Node.JS</h1>");
	})
	.listen(3000);
*/

var http = require("http").createServer(server);

function server (req,res)
{
	res.writeHead(200,{"Content-type":"text/html"});
	res.end("<h1>Hola navegador Web con Node.JS</h1>");
}

http.listen(3000);
console.log("Servidor corriendo desde http://127.0.0.1:3000/");