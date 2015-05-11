"use strict";

var http = require("http").createServer(server),
	fs = require("fs"),
	path = require("path"),
	url = require("url"),
	urls = [
		{id:1,route:"",output:"statics/index.html"},
		{id:2,route:"acerca",output:"statics/acerca.html"},
		{id:3,route:"contacto",output:"statics/contacto.html"}
	];

function server(req, res)
{
	var pathURL = path.basename(req.url),
		id = url.parse(req.url,true).query.id;

	urls.forEach(function(pos){
		if(pos.route == pathURL || pos.id == id)
		{
			res.writeHead(200,{"Content-Type":"text/html"});
			fs.readFile(pos.output,function (err,data){
				if(err) throw err;
				res.end(data);
			});
		}
	});

	if(!res.finished)
	{
		console.log("Hola");
		res.writeHead(404,{"Content-Type":"text/html"});
		fs.readFile("statics/404.html",function (err,data){
			if(err) throw err;
			res.end(data);
		});
	}
}

http.listen(3000);

console.log("Servidor corriendo desde http://127.0.0.1:3000/");