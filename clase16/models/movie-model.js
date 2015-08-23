"use strict";

var movieModel  = require("./movie-schema"),
	Movie = function () {};

Movie.getAll = function (cb)
{
	movieModel.query("SELECT * FROM movie",cb);
}

Movie.save = function (data, cb)
{
	var sql = "INSERT INTO movie SET ?";
	movieModel.query(sql, data, cb);
}

Movie.get = function (id, cb)
{
	var sql = "SELECT * FROM movie WHERE movie_id = ?";
	movieModel.query(sql, id, cb);
}

Movie.update = function (data, cb)
{
	var sql = "UPDATE movie SET ? WHERE movie_id = ?";
	movieModel.query(sql, [data, data.movie_id], cb);
}

Movie.delete = function (id, cb) 
{
	var sql = "DELETE FROM movie WHERE movie_id = ?";
	movieModel.query(sql, id, cb);
}

module.exports = Movie;