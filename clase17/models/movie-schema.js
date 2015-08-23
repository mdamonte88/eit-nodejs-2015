"use strict";

var mongoose = require("./mongo-connect"),
	Schema = mongoose.Schema,
	movieSchema = new Schema({
		movie_id:"string",
		title:"string",
		release_year:"string",
		rating:"string",
		image:"string"
	},
	{ collection:"movie" }),
	Movie = mongoose.model("Movie",movieSchema);

module.exports = Movie;