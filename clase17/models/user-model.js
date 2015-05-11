"use strict";

var authModel = require("./user-schema"),
	Auth = function () {};

Auth.getUser = function (user, cb)
{
	authModel
		.findOne({
			username:user.username,
			password:user.password
		})
		.exec(function (err, docs){
			if(err) throw err;
			cb(docs);
		});
}

Auth.setUser = function (user, cb)
{
	authModel
		.create(user, function (err){
			if(err) throw err;
			cb();
		});
}

module.exports = Auth;