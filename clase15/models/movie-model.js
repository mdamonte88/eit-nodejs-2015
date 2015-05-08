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

Movie.get = function (id, cb)
{
	movieModel.
		findOne({movie_id:id})
		.exec(function (err, docs){
			if(err) throw err;
			cb(docs);
		});
}

Movie.update = function (docs, cb)
{
	movieModel.findOneAndUpdate(
		{movie_id:docs.movie_id},
		{
			title:docs.title,
			release_year:docs.release_year,
			rating:docs.rating,
			image:docs.image
		},
		function (err){
			if(err) throw err;
			cb();
		}
	);
}

Movie.delete = function (id, cb)
{
	movieModel.remove({movie_id:id}, function (err, docs){
		if(err) throw err;
		cb();
	});
}


module.exports = Movie;