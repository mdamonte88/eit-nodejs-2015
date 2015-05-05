"use strict";

var express = require("express"),
	controller = require("../controllers/movie-controller"),
	router = express.Router();

/*
	REST    CRUD	FORM METHOD
	GET		SELECT	GET
	POST	INSERT	POST
	PUT		UPDATE	POST
	DELETE	DELETE	POST
*/

router
	.get("/",controller.getAll)
	.get("/pelicula/agregar",controller.add)
	.post("/",controller.save)
	.get("/pelicula/:movie_id",controller.get)
	.put("/pelicula/:movie_id",controller.update)
	.delete("/pelicula/:movie_id",controller.delete)
	.use(controller.error404);


module.exports = router;