"use strict";

var mongoose = require("mongoose"),
	conf = require("./db-conf");

mongoose.connect("mongodb://"+conf.mongoDB.host+"/"+conf.mongoDB.database);

module.exports = mongoose;