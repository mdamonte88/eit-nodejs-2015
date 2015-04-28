"use strict";

var express = require("express"),
	app = express();

app.get("/",function (req, res){
	res.end("<h1>Hola desde Express!</h1>");
});

app.get("/user/:id",function (req, res){
	res.end("<h1>Bienvenid@ a Express! "+req.params.id+"</h1>");
});

app.get("/search",function (req, res){
	res.end("<h1>Bienvenid@ a Express! lo que buscaste fue:<i>"+req.query.q+"</i></h1>");
});

app.listen(3000);

console.log("Iniciando Express en el puerto 3000");