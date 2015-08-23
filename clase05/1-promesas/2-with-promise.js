"use strict";

var fs = require("fs"),
	Q = require("q");

function existFile(file)
{
	var defer = Q.defer();
	fs.exists(file, function (exists){
		return exists?defer.resolve(true):defer.reject(new Error("Archivo No Existe"));
	});

	return defer.promise;
}

function readFile(file)
{
	console.log("Existe Archivo");
	var defer = Q.defer();

	fs.readFile(file,function (err,data){
		return err?defer.reject(new Error("Archivo No Leído")):defer.resolve(data);
	});

	return defer.promise;
}

function writeFile(file,data)
{
	console.log("Archivo Leído");
	var defer = Q.defer();
	fs.writeFile(file,data,function (err,data){
		return err?defer.reject(new Error("Archivo No Copiado")):defer.resolve("Archivo Copiado");
	});

	return defer.promise;
}

//Si existe
	//Leelo
	//Copialo
	//Errores
existFile("./statics/nombres.txt")
	.then(function (dataPromise){
		return readFile("./statics/nombres.txt");
	})
	.then(function (dataPromise){
		return writeFile("./statics/copia-con-promesas.txt",dataPromise);
	})
	.then(function (dataPromise){
		return console.log(dataPromise);
	})
	.fail(function (err){
		return console.log(err.message);
	});