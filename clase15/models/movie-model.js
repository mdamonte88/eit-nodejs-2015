"use strict";

var movieModel = require("./movie-schema"),
	Movie = function () {};

Movie.getAll = function (cb)
{
	movieModel
		.find({})
		.exec(function (err, docs){
			if(err) throw err;
			cb(docs);
		});
}

Movie.save = function (docs, cb)
{
	movieModel
		.create(docs,function (err){
			if(err) throw err;
			cb();
		});
}

Movie.get = function ()
{

}

Movie.update = function ()
{

}

Movie.delete = function ()
{

}


module.exports = Movie;