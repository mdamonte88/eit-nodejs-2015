var movies = require("../models/movies"),
	express = require("express"),
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

router.use(movies);

router.get("/", function (req, res){
	req.getConnection(function (err, movies){
		movies.query("SELECT * FROM movie", function (err, rows){
			var locals = {
				title:"Lista Películas",
				data:rows
			};
			res.render("index",locals);
		});
	});
});

router.get("/agregar",function (req, res){
	res.render("add-form",{title:"Agregar Película"});
});

router.post("/",function (req, res){
	req.getConnection(function (err, movies){
		var movie = {
			movie_id:req.body.movie_id,
			title:req.body.title,
			release_year:req.body.release_year,
			rating:req.body.rating,
			image:req.body.image
		};
		//console.log(movie);

		movies.query("INSERT INTO movie SET ?", movie, function (err, rows){
			return (err)?res.redirect("/agregar"):res.redirect("/");
		});
	});
});

router.get("/editar/:movie_id",function (req, res){
	var movie_id = req.params.movie_id;
	//console.log(movie_id);

	req.getConnection(function (err, movies){
		movies.query("SELECT * FROM movie WHERE movie_id = ?", movie_id, function (err, rows){
			var locals = {
				title:"Editar Película",
				data:rows
			};
			//console.log(err,"---",rows);
			res.render("edit-form",locals);
		});
	});
});

router.post("/actualizar/:movie_id",function (req, res){
	req.getConnection(function (err, movies){
		var movie = {
			movie_id:req.body.movie_id,
			title:req.body.title,
			release_year:req.body.release_year,
			rating:req.body.rating,
			image:req.body.image
		};
		console.log(movie);

		movies.query("UPDATE movie SET ? WHERE movie_id = ?", [movie, movie.movie_id], function (err, rows){
			return (err)?res.redirect("/actualizar/:movie_id"):res.redirect("/");
		});
	});
});

router.post("/eliminar/:movie_id",function (req, res, next){
	req.getConnection(function (err, movies){
		var movie_id = req.params.movie_id;
		//console.log(movie_id);
		movies.query("DELETE FROM movie WHERE movie_id = ?", movie_id, function (err, rows){
			return (err)?next(new Error("Registro No encontrado")):res.redirect("/");
		});
	});
});

router.use(error404);

module.exports = router;