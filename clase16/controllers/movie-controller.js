"use strict";

var movieModel = require("../models/movie-model"),
	errors = require("../middlewares/errors"),
	ControllerMovie = function () {  };

ControllerMovie.getAll = function (req, res, next)
{
	movieModel.getAll(function (err, rows){
		if(err)
		{
			var locals = {
				title:"Error al consultar la base de datos",
				description:"Error de Sintaxis SQL",
				error:err
			};

			res.render("error",locals);
		}
		else
		{
			var locals = {
				title:"Lista de Películas",
				data:rows
			};

			res.render("index",locals);	
		}
	});
}

ControllerMovie.add = function (req, res, next)
{
	res.render("add-form",{title:"Agregar Película"});
}

ControllerMovie.save = function (req, res, next)
{
	var movie = {
		movie_id:req.body.movie_id,
		title:req.body.title,
		release_year:req.body.release_year,
		rating:req.body.rating,
		image:req.body.image
	};

	console.log(movie);

	movieModel.save(movie, function (err){
		if(err)
		{
			var locals = {
				title:"Error al agregar el registro con id: "+movie.movie_id,
				description:"Error de Sintaxis SQL",
				error:err
			}

			res.render("error",locals);
		}
		else
		{	
			res.redirect("/");
		}

		console.log(err);
	});
}

ControllerMovie.get = function (req, res, next)
{
	var movie_id = req.params.movie_id;
	console.log(movie_id);

	movieModel.get(movie_id, function (err, rows){
		if(err)
		{
			var locals = {
				title:"Error al buscar el registro con id: "+id,
				description:"Error de Sintaxis SQL",
				error:err
			}

			res.render("error",locals);
		}
		else
		{
			var locals = {
				title:"Editar Película",
				data:rows
			};

			res.render("edit-form",locals);
		}
	});
}

ControllerMovie.update = function (req, res, next)
{
	var movie = {
		movie_id:req.body.movie_id,
		title:req.body.title,
		release_year:req.body.release_year,
		rating:req.body.rating,
		image:req.body.image
	};

	console.log(movie);

	movieModel.update(movie, function (err){
		if(err)
		{
			var locals = {
				title:"Error al actualizar el registro con id: "+movie.movie_id,
				description:"Error de Sintaxis SQL",
				error:err
			}

			res.render("error",locals);
		}
		else
		{
			res.redirect("/");
		}

		console.log(err);
	});
}

ControllerMovie.delete = function (req, res, next)
{
	var movie_id = req.params.movie_id;
	console.log(movie_id);

	movieModel.delete(movie_id, function (err){
		if(err)
		{
			var locals = {
				title:"Error al eliminar el registro con id: "+id,
				description:"Error de Sintaxis SQL",
				error:err
			}

			res.render("error",locals);
		}
		else
		{
			res.redirect("/");
		}

		console.log(err);
	});
}

module.exports = ControllerMovie;