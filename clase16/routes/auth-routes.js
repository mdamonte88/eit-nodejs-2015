"use strict";

var express = require("express"),
	controller = require("../controllers/auth-controller"),
	router = express.Router();


router
	.get("/",controller.index)
	.get("/login",controller.logInGet)
	.post("/login",controller.logInPost)
	.get("/signin",controller.signInGet)
	.post("/signin",controller.signInPost)
	.get("/logout",controller.logOut);


module.exports = router;