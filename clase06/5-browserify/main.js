var $ = require("./jquery.min");
var clock = require("./clock");
var cucu = new clock();

setInterval(function(){
	$("body").html("<h1>Hola Browserify la hora es "+cucu.theTime()+"</h1>");
},1000);