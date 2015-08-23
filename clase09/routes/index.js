"use strict";

var express = require("express"),
	router = express.Router();

function error404(req, res, next)
{
	var error = new Error();
	error.status = 404;

	var locals = {
		title:"ERROR 404",
		description:"RECURSO NO ENCONTRADO",
		error:error
	};

	res.render("error",locals);

	next();
}

function jade(req, res, next)
{
	var locals = {
		title: "Jade",
		link: "http://jade-lang.com/",
		description:"Jade es un “template engine” (motor de plantillas) de alto performance, enfocado en permitir escribir código HTML de forma rápida. Podríamos decir que se trata de un pre-procesador de código html; similar a stylus, sass o less con respecto a css. Jade es fuertemente influenciado por HAML e implementado para Javascript con Node. Jade usa la Indentación(sangrado) para definir la jerarquía de nuestro documento html, no tendremos que escribir tags html < />, estos serán generados por jade al momento de compilar nuestro código jade."
	};

	res.render("index",locals);
}

function ejs(req, res, next)
{
	var locals = {
		title: "EJS",
		link: "http://www.embeddedjs.com/",
		description:"EJS limpia el HTML del JavaScript con plantillas del lado cliente. Combina datos y una plantilla para producir HTML. Código entre <%%> se ejecuta. Código entre <%= %> lo añade al HTML que se resuelve.",
		dcHeroes:["Batman","Superman","Wonder Woman","Flash","Green Lantern"],
		infoHeroes:[
			["Batman","Bruce Wayne","Ciudad Gótica"],
			["Superman","Clark Kent","Metrópolis"],
			["Wonder Woman","Princesa Diana","Reino de las Amazonas"],
			["The Flash","Barry Allen","Ciudad Central"],
			["Green Lantern","Hal Jordan","Sector Espacial 2814"]
		]
	};

	res.render("index",locals);
}

router.get("/ejs",ejs);
router.get("/jade",jade);
router.use(error404);

module.exports = router;