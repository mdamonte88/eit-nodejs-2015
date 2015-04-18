/*
Organización de Código JS
	librerias/modulos
	constantes
	objetos/variables
	funciones
	eventos
	ejecuciones

Usar camelCase
	Cuando una instrucción tenga una sola palabra, va en minúsculas p.e. require()
	Sólo las clases rompen esta regla, siempre va en mayúscula la letra inicial p.e. EventEmmiter()
	Cuando una instrucción tenga 2 o más palabras, apartir de la segunada la primer letra va en mayúscula p.e. createServer()
*/
"use strict"; //modo estricto para programar con buenas prácticas

console.log("Hola Mundo desde Node.JS, esto se verá en la terminal de comandos");
console.log(2+5);
//console.log(window);
console.log(global);

setInterval(function(){
	console.log("hola");
},1000);