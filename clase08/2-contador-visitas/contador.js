"use strict";
var express = require("express"),
	cookieParser = require("cookie-parser"),
	cookieSession = require("cookie-session"),
	app = express();

app.use(cookieParser());
app.use(cookieSession({secret:"secreto"}));

app.get("/",function (req, res){
	req.session.visitas || (req.session.visitas = 0);
	var n = req.session.visitas++;
	res.send("Me has visitado: "+ n + " veces.");
});

app.listen(3000);

console.log("Iniciando Express en el puerto 3000");