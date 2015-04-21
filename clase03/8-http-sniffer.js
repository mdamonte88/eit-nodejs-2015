"use strict";

var http = require("http"),
	options = {
		host:"escuela.it",
		port:80,
		path:"/"
	},
	htmlCode = "";

function httpClient(res)
{
	console.log("El sitio ha respondido. Código de Estado: "+res.statusCode);

	res.on("data",function (data){
		//console.log(data);
		console.log(data.toString());
		htmlCode += data;
	});
}

function httpError(err)
{
	console.log("Ocurrió un error con el servidor: "+err.message);
}

function server(req,res)
{
	res.writeHead(200,{"Content-Type":"text/html"});
	res.end(htmlCode);
}

//Cliente
http.get(options,httpClient).on("error",httpError);

//Servidor
http.createServer(server).listen(3000);

console.log("Servidor corriendo desde http://127.0.0.1:3000/");