"use strict";

var express = require("express"),
	app = express();

app.get("/",function (req, res){
	res.sendFile(__dirname + "/statics/index.html");
});

app.listen(3000);

console.log("Iniciando Express en el puerto 3000");