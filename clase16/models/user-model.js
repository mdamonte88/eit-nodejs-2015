"use strict";

var authModel  = require("./movie-schema"),
	Auth = function () {};

Auth.getUser = function (user, cb)
{
	var sql = "SELECT COUNT(*) AS count FROM users WHERE username = ? AND password = ?";
	authModel.query(sql, [user.username, user.password], cb);
}

Auth.setUser = function (user, cb)
{
	authModel.query("INSERT INTO users SET ?", user, cb);
}

module.exports = Auth;