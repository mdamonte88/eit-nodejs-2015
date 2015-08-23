var gulp = require("gulp"),
	jshint = require("gulp-jshint"),
	stylish = require("jshint-stylish");

gulp.task("jshint",function(){
	return gulp
		.src("./js/*.js")
		.pipe(jshint(".jshintrc"))
		.pipe(jshint.reporter("jshint-stylish"))
		.pipe(jshint.reporter("fail"));
});

gulp.task("watch",function(){
	gulp.watch(["./js/*.js"],["jshint"]);
});

gulp.task("default", ["watch"]);