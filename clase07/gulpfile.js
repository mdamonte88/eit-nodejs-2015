var gulp = require("gulp"),
	connect = require("gulp-connect"),
	useref = require("gulp-useref"),
	uglify = require("gulp-uglify"),
	minifyCss = require("gulp-minify-css"),
	concat = require("gulp-concat"),
	imagemin = require("gulp-imagemin");

gulp.task("min-css-js",function (){
	gulp
		.src("./app/css/*.css")
		.pipe(concat("bundle.css"))
		.pipe(minifyCss())
		.pipe(gulp.dest("./dist/css/"));
	
	gulp
		//.src("./app/js/*.js")
		.src([
			"./app/js/jquery.min.js",
			"./app/js/jquery.mousewheel-3.0.6.pack.js",
			"./app/js/jquery.fancybox.js",
			"./app/js/jquery.fancybox-media.js",
			"./app/js/jquery.flexslider.js",
			"./app/js/codigos.js"
		])
		.pipe(concat("bundle.js"))
		.pipe(uglify())
		.pipe(gulp.dest("./dist/js/"));	
});

gulp.task("images",function (){
	gulp.src(["./app/img/**"])
		.pipe(imagemin())
		.pipe(gulp.dest("./dist/img/"));
});

gulp.task("statics",function (){
	gulp
		.src(["./app/index.html","./app/ajax.txt"])
		.pipe(useref())
		.pipe(gulp.dest("./dist"));

	gulp.src("./app/fonts/**")
		.pipe(gulp.dest("./dist/fonts"));

	gulp.src("./app/swf/**")
		.pipe(gulp.dest("./dist/swf"));
});

gulp.task("connect-app",function (){
	connect.server({
		root: "./app",
		port:3000,
		livereload: true
	});
});

gulp.task("connect-dist",function (){
	connect.server({
		root: "./dist",
		port:3001,
		livereload: true
	});
});

gulp.task("reload",function (){
	//Si estas ejecutando el server live reload app
	//gulp
		//.src(["./app/*.*","./app/**/*.*"])
		//.pipe(connect.reload());

	//Si estas ejecutando el server live reload dist
	gulp
		.src(["./dist/*.*","./dist/**/*.*"])
		.pipe(connect.reload());
});

gulp.task("watch",function (){
	gulp.watch(["./app/*.*","./app/**/*.*"],["reload"]);
});

//gulp.task("default",["connect-app","watch","min-css-js","images","statics"]);

gulp.task("dist",["min-css-js","images","statics"]);

gulp.task("server-dev",["connect-app","watch"]);

gulp.task("server-pro",["connect-dist","watch"]);
/*
Mejoras
	1) pasar estas automatizaciones a grunt
	2) a la hora de pasar a la carpeta dist el index se modificaran los tags: link y script
	3) implementar uncss
*/