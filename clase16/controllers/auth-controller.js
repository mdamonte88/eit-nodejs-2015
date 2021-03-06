"use strict";

var authModel = require("../models/user-model"),
	errors = require("../middlewares/errors"),
	ControllerAuth = function () {};

ControllerAuth.index = function (req, res, next)
{
	if(req.session.username)
	{
		res.redirect("/peliculas");
	}
	else
	{
		res.render("login-form",{
			title:"Autenticación de Usuarios",
			message:req.query.message
		});
	}
}

ControllerAuth.logInGet = function(req, res, next)
{
	res.redirect("/");
}

ControllerAuth.logInPost = function(req, res, next)
{
	var user = {
		username:req.body.username,
		password:req.body.password
	};

	console.log(user);

	authModel.getUser(user, function (err, rows){
		if(err)
		{
			var locals = {
				title:"Error al consultar la base de datos",
				description:"Error de Sintaxis SQL",
				error:error
			};

			res.render("error",locals);
		}
		else
		{
			req.session.username = (rows[0].count==1)?user.username:null;
			console.log(req.session,"---",rows);

			return (req.session.username)
					?res.redirect("/peliculas")
					:errors.http401(req, res, next);
		}
	});
}

ControllerAuth.signInGet = function(req, res, next)
{
	res.render("signin-form",{title:"Registro de Usuarios"});
}

ControllerAuth.signInPost = function(req, res, next)
{
	var user = {
		user_id:0,
		username:req.body.username,
		password:req.body.password
	};

	console.log(user);

	authModel.setUser(user,function (err, rows){
		if(err)
		{
			var locals = {
				title:"Error al consultar la base de datos",
				description:"Error de Sintaxis SQL",
				error:error
			};

			res.render("error",locals);
		}
		else
		{
			res.redirect("/?message=El usuario "+user.username+" ha sido creado");
		}
	});
}

ControllerAuth.logOut = function(req, res, next)
{
	req.session.destroy(function (err){
		return (err)
			?errors.http500(req, res, next)
			:res.redirect("/");
	});
}


module.exports = ControllerAuth;