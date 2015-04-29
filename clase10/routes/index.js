"use strict";

var express = require("express"),
	request = require("request"),
	cheerio = require("cheerio"),
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

	//next();
}

function webForm(req, res, next)
{
	var locals = {
		title:"Web Scraping con Express y Node.JS"
	};

	res.render("index",locals);

	//next();
}

function webScraping(req, res, next)
{
	//1)Obtener la informacion del url de la peli (código html)
	//2)Extraer la info de mi interes
	//3)Guardarla en un archivo .json
	//4)Una vez que tenga la info guardada, mostrarla en el navegador
	
	var url = req.query.movie,
		idMovie = url.slice(26,35);

	request(url, function (err, res, html){
		if(!err)
		{
			//extraer y analizar la info
			var $ = cheerio.load(html);
			
			var json = {
				id:"",
				title:"",
				release:"",
				rating:"",
				image:""
			};

			json.id = url.slice(26,35);

			/*
				<h1 class="header">
					<span class="itemprop" itemprop="name">300</span>
	            	<span class="nobr">(<a href="/year/2006/?ref_=tt_ov_inf">2006</a>)</span>
				</h1>
			*/

			json.title = $(".header").find(".itemprop").text();
			json.release = $(".header").find(".nobr").children().text();

			/*
				<div class="star-box giga-star">
					<div class="titlePageSprite star-box-giga-star"> 8,6 </div>
					.......
				</div>
			*/

			json.rating = $(".star-box-giga-star").text();

			/*
			<div class="image">
				<a href="/media/rm960529408/tt0075148?ref_=tt_ov_i">
					<img height="317" width="214" alt="Rocky (1976) Poster" title="Rocky (1976) Poster" src="http://ia.media-imdb.com/images/M/MV5BMTY5MDMzODUyOF5BMl5BanBnXkFtZTcwMTQ3NTMyNA@@._V1_SX214_AL_.jpg" itemprop="image">
				</a>
			</div>
			*/

			json.image = $(".image").find("img").attr("src");
		}

		//Salvar la info
		var fileName = "public/js/"+json.id+".json";
		
		fs.writeFile(fileName,JSON.stringify(json,null,4),function (err){
			var message = (err)?"Error al guardar la información":"Información almacenada con éxito";
			console.log(message);
		});
	});

	//mostrar en la web la info salvada
	var fileName = "public/js/"+idMovie+".json";
	fs.readFile(fileName,function (err, data){
		if(err)
		{
			res.send(err);
		}
		else
		{
			var locals = {
				title:"Web Scraping con Express y Node.JS",
				info:data
			};

			res.render("movie",locals);
		}
	});
}

router.get("/scrape",webScraping);
router.get("/",webForm);
router.use(error404);

module.exports = router;