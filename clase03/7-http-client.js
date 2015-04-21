"use strict";

var http = require("http"),
	options = {
		host:"bextlan.com",
		port:80,
		path:"/"
	};

/*
http
	.get(options,function (res){
		console.log("El sitio ha respondido. Código de Estado: "+res.statusCode);
	})
	.on("error",function (err){
		console.log("Ocurrió un error con el servidor: "+err.message);
	});
*/

function httpClient(res)
{
	console.log("El sitio ha respondido. Código de Estado: "+res.statusCode);
}

function httpError(err)
{
	console.log("Ocurrió un error con el servidor: "+err.message);
}

http.get(options,httpClient).on("error",httpError);