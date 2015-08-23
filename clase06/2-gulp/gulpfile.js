var gulp = require("gulp"),
	concat = require("gulp-concat"),
	uglify = require("gulp-uglify");


gulp.task("default",function(){
	gulp
		.src("js/source/*.js")
		.pipe(concat("todo.js"))
		.pipe(uglify())
		.pipe(gulp.dest("js/build/"));
});