"use strict";

var fs = require("fs");

fs.exists("./statics/nombres.txt",function (exists){
	if(exists)
	{
		console.log("Existe Archivo");
		fs.readFile("./statics/nombres.txt",function (err, data){
			if(err)
			{
				console.log("Archivo No Leído");
			}
			else
			{
				console.log("Archivo Leído");
				fs.writeFile("./statics/copia-sin-promesa.txt",data,function (err){
					if(err)
					{
						console.log("Archivo No Copiado");
					}
					else
					{
						console.log("Archivo Copiado");
					}
				});
			}
		});
	}
	else
	{
		console.log("Archivo No Existe");
	}
});