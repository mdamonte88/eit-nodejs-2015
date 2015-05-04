var movies = require("../models/movies"),
	express = require("express"),
	router = express.Router();

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

module.exports = router;