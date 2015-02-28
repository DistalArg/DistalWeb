getGET(){
	//Obtener URL
	var url = document.Location.href;
	
	// si hay parámetros GET
	if (url.indexOf('?')>0){
		//los parámetros se encuentran después del ?
		var paramettersString = url.split('?')[1];
		//vamos separando los parámetros obtendremos una lista 
		//	cuyos elementos serán strings con el formato "key=value"
		var paramettersList = paramettersString.split('&');
		//inicializamos el mapa de los valores
		var paramettersMap = {};
		
		//ahorallenaremos el mapa
		//recorremos la lista
		for (var i = 0; i < paramettersList.length; i++){
			//guardamos temporalmente el parámeetro en un array con su clave y su valor
			var actualParametter = parametterList[i].split('=');
			//llenamos el mapa, por si acaso decodificamos el valor
			paramettersMap[actualParametter[0]] = decodeURI(actualParametter[1]);
		}
		
		return paramettersMap;
	}
}