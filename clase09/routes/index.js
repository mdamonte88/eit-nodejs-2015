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

router.get("/jade",jade);
router.use(error404);

module.exports = router;