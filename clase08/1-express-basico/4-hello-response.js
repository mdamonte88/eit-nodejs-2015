"use strict";

var express = require("express"),
	app = express();

app.get("/",function (req, res){
	var data = "<h1>Hola Express</h1><p>Mandando Datos =D</p><img src='https://nodejs.org/images/logos/nodejs.png' />";
	res.send(data);
});

app.get("/bextlan", function (req, res){
	res.redirect(301,"http://bextlan.com");
});

app.get("/json",function (req, res){
	res.json({
		name:"Jonathan",
		age:30,
		twitter:"@jonmircha"
	});
});

app.get("/render",function (req, res){
	//res.render("/statics/index.html");
});

app.listen(3000);

console.log("Iniciando Express en el puerto 3000");