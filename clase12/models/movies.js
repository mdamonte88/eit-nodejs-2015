"use strict";

/*
REST    CRUD	FORM METHOD
GET		SELECT	GET
POST	INSERT	POST
PUT		UPDATE	POST
DELETE	DELETE	POST
*/


var mysql = require("mysql"),
	myConnection  = require("express-myconnection"),
	dbOptions = {
		host:"localhost",
		port:3306,
		user:"root",
		password:"",
		database:"movies"
	},
	Movies = myConnection(mysql,dbOptions,"request");

module.exports = Movies;