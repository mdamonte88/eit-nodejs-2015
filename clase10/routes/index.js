//http://www.omdbapi.com/

"use strict";

var express = require("express"),
	request = require("request"),
	cheerio = require("cheerio"),
	Q = require("q"),
	fs = require("fs"),
	router = express.Router();

function error404(req, res, next)
{
	var error = new Error();
	error.status = 404;

	var locals = {
		title:"ERROR 404",
		description:"RECURSO NO ENCONTRADO",
		error:error
	}

	res.render("error",locals);
}

function webForm(req, res, next)
{
	var locals = {
		title:"Web Scraping con Express y Node.JS"
	};

	res.render("index",locals);
}

function webScraping(req, res, next)
{	
	var url = req.query.movie,
		idMovie = url.slice(26,35);

	function scrapeRequest(url)
	{
		var defer = Q.defer();
		
		request(url,function (err, res, html){
			return err?defer.reject(new Error("URL Inexistente")):defer.resolve(html);
		});

		return defer.promise;
	}

	function scrapeCheerio(html)
	{
		var $ = cheerio.load(html),
			defer = Q.defer(),
			json = {
				id:"",
				title:"",
				release:"",
				rating:"",
				image:""
			};

		json.id = url.slice(26,35);
		json.title = $(".header").find(".itemprop").text();
		json.release = $(".header").find(".nobr").children().text();
		json.rating = $(".star-box-giga-star").text();
		json.image = $(".image").find("img").attr("src");

		if(html)
		{
			defer.resolve(json);
		}
		else
		{
			defer.reject(new Error("Error al Cargar la información"));
		}

		return defer.promise;
	}

	function writeJSON(json)
	{
		var defer = Q.defer(),
			fileName = "public/js/"+json.id+".json";

		fs.writeFile(fileName,JSON.stringify(json,null,4),function (err){
			return err?defer.reject(new Error("Error al guardar la información")):defer.resolve(fileName);
		});

		return defer.promise;
	}

	function readFileInWeb(file)
	{
		var defer = Q.defer();

		fs.readFile(file,function (err, data){
			if(err)
			{
				defer.reject(new Error("Archivo No Leído"));
			}
			else
			{
				var locals = {
					title:"Web Scraping con Express y Node.JS",
					info:data
				};
				res.render("movie",locals);

				defer.resolve(true);
			}
		});

		return defer.promise;
	}

	function errorScrape(err)
	{
		console.log(err.message);

		res.render("error",{
			title:"Error en la Aplicación",
			description:err.message,
			error:err
		});
	}

	scrapeRequest(url)
		.then(function (promiseHTML){ return scrapeCheerio(promiseHTML); })
		.then(function (promiseJSON){ return writeJSON(promiseJSON); })
		.then(function (promiseFile){ return readFileInWeb(promiseFile)  })
		.fail(function (err){ return errorScrape(err); });
}

router.get("/",webForm);
router.get("/scrape",webScraping);
router.use(error404);

module.exports = router;