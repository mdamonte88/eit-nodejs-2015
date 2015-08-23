module.exports = function(grunt)
{
	grunt.initConfig({
		concat:{
			options:{
				separator: ";",
			},
			dist: {
				src: "js/source/*.js",
				dest: "js/build/todo.js",
			}
		},
		uglify:{
			js:{
				files:{
					"js/build/todo.js": ["js/source/*.js"]
				}
			}
		}
	});

	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-uglify");

	grunt.registerTask("default",["concat","uglify"]);
}