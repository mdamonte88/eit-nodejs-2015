"use strict";

var mysql = require("mysql"),
	myConn = mysql.createConnection({
		host:"localhost",
		port:3306,
		user:"root",
		password:"",
		database:"movies"
	});

myConn.connect(function (err){
	return (err)
				?console.log("Error al Conectarse a MySQL: " + err.stack)
				:console.log("Conexíon establecida con MySQL N°:" + myConn.threadId);
});