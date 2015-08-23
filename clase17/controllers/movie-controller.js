"use strict";

var movieModel = require("../models/movie-model"),
	errors = require("../middlewares/errors"),
	ControllerMovie = function () {};

ControllerMovie.getAll = function (req, res, next)
{
	return (req.session.username)
		?movieModel.getAll(function (docs){
			var locals = {
				title:"Lista de Películas",
				data:docs
			};

			res.render("index",locals);
		})
		:errors.http401(req, res, next);
}

ControllerMovie.add = function (req, res, next)
{
	var locals = {
		title:"Agregar Película",
		user:req.session.username
	};
	
	return (req.session.username)
		?res.render("add-form",locals)
		:errors.http401(req, res, next);
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

	return(req.session.username)
		?movieModel.save(movie,function (){
			res.redirect("/");
		})
		:errors.http401(req, res, next);
}

ControllerMovie.get = function (req, res, next)
{
	var movie_id = req.params.movie_id;
	console.log(movie_id);

	return(req.session.username)
		?movieModel.get(movie_id, function (docs){
			var locals = {
				title:"Editar Película",
				data:docs
			};

			res.render("edit-form",locals);
		})
		:errors.http401(req, res, next);
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

	return(req.session.username)
		?movieModel.update(movie, function (){
			res.redirect("/");
		})
		:errors.http401(req, res, next);
}

ControllerMovie.delete = function (req, res, next)
{
	var movie_id = req.params.movie_id;
	console.log(movie_id);

	return(req.session.username)
		?movieModel.delete(movie_id, function (){
			res.redirect("/");
		})
		:errors.http401(req, res, next);	
}

module.exports = ControllerMovie;