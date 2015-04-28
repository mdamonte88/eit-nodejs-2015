"use strict";

var express = require("express"),
	path = require("path"),
	favicon = require("serve-favicon"),
	routes = require("./routes/index"),
	faviconURL = __dirname + "/public/img/node-favicon.png",
	publicDir = express.static(path.join(__dirname,"public")),
	viewDir = path.join(__dirname,"views"),
	port = (process.env.PORT || 3000),
	app = express();

app.set("views",viewDir);
app.set("view engine","jade");
app.set("port",port);

app.use(favicon(faviconURL));
app.use(publicDir);
app.use("/",routes);

module.exports = app;