/*
https://nodejs.org/api/modules.html
Módulos (require/exports)
	require(<paquete o ruta>)
		Importar módulos (paquetes, otros ficheros)
		Garantía: una única vez
		Devuelve el módulo!

	exports.propiedadPublica = <valor>
		El otro lado del mecanismo
		Se puede exportar cualquier valor
*/
"use strict";
var Clock = require("./clock");

var cucu = new Clock();

cucu.on("tictac",function(){
	cucu.theTime();
});