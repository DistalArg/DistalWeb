getGET(){
	//Obtener URL
	var url = document.Location.href;
	
	// si hay par�metros GET
	if (url.indexOf('?')>0){
		//los par�metros se encuentran despu�s del ?
		var paramettersString = url.split('?')[1];
		//vamos separando los par�metros obtendremos una lista 
		//	cuyos elementos ser�n strings con el formato "key=value"
		var paramettersList = paramettersString.split('&');
		//inicializamos el mapa de los valores
		var paramettersMap = {};
		
		//ahorallenaremos el mapa
		//recorremos la lista
		for (var i = 0; i < paramettersList.length; i++){
			//guardamos temporalmente el par�meetro en un array con su clave y su valor
			var actualParametter = parametterList[i].split('=');
			//llenamos el mapa, por si acaso decodificamos el valor
			paramettersMap[actualParametter[0]] = decodeURI(actualParametter[1]);
		}
		
		return paramettersMap;
	}
}