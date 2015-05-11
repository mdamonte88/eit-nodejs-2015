"use strict";

var mongoose = require("./mongo-connect"),
	Schema = mongoose.Schema,
	movieSchema = new Schema({
		username:"string",
		password:"string"
	},
	{ collection:"users" }),
	Users = mongoose.model("Users",movieSchema);

module.exports = Users;