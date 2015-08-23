"use strict";

var http = require("http").createServer(server),
	form = require("fs").readFileSync("statics/formulario.html"),
	querystring = require("querystring"),
	util = require("util"),
	dataString = "";

function server (req,res)
{
	if(req.method === "GET")
	{
		res.writeHead(200,{"Content-Type":"text/html"});
		res.end(form);
	}	

	if(req.method === "POST")
	{
		req
			.on("data",function (data){
				dataString += data;
			})
			.on("end",function (){
				var dataObject = querystring.parse(dataString),
					dataJSON = util.inspect(dataObject);

				console.log("Los datos que enviaste por POST como string:\n"+dataString);
				console.log("Los datos que enviaste por POST como objeto:\n"+dataObject);
				console.log("Los datos que enviaste por POST como JSON:\n"+dataJSON);

				res.end(
					"<p>Los datos que enviaste por POST como string:\n"+dataString+"</p>"+
					"<p>Los datos que enviaste por POST como objeto:\n"+dataObject+"</p>"+
					"<p>Los datos que enviaste por POST como JSON:\n"+dataJSON+"</p>"
				);
			});
	}
}

http.listen(3000);

console.log("Servidor iniciado en el puerto 3000");