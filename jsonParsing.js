 const TipoCredito = "1";
 const TipoCupon = "3";

 var medios = jQuery.parseJSON($('#mediosJsonHidden').val());
 var bancos = jQuery.parseJSON($('#bancosJsonHidden').val());
 var todasLasCuotas = jQuery.parseJSON($('#cuotasJsonHidden').val());
 
 var relaciones = jQuery.parseJSON($('#relacionesJsonHidden').val());

$(document).ready(function() {
	medios = sortListaYRelaciones(medios, 0, getLength(medios) - 1, "medio");
	loadMedios();
});

	function sortListaYRelaciones(list, left, rigth, key)  //método quickSort
	{
	   var medio;

	   if( left < rigth ) 
	   {
	       medio = divide( list, left, rigth, key);
	       list = sortListaYRelaciones( list, left, medio-1);
	       list = sortListaYRelaciones( list, medio+1, rigth);
	   }
	   return list;
	}

		function divide(list, left, rigth, key) {
		   var pivot, i, j, aux;
		   pivot = list[left];
		   i = left;
		   j = rigth+1;
				
		   do
		   {
		   	do ++i; while( list[i] <= pivot && i <= rigth );
		   	do --j; while( list[j] > pivot );
		   	  if(i < j){
		        list = changePositions(key, list, i, j);
		      }
		   } while(i < j);
		   changePositions(key, list, left, j);
		   return j;
		}

			function changePositions(key, list, i, j){
				changeRelaciones(key, i, j); //Es necesario cambiar las referencias en la lista de relacines a los elemento que se ordenan
			 	aux = list[i];
			    list[i] = list[j];
			    list[j] = aux;
			}

				function changeRelaciones(key, bigger, smaller){
				  for (var i = 0; i < getLength(relaciones); i++) {
				    relacionActual = relaciones[i];
				    if(relacionActual[key] == bigger){
				      relacionActual[key] = smaller;
				    }
				    else if(relacionActual[key] == smaller){
				      relacionActual[key] = bigger
				    }
				    relaciones[i] = relacionActual;
				  };
				}

					function getLength(lista){
						var length = 0;
						$.each(lista, function(key, val) {
							 length++;
						});
						return length;
					}

	function loadMedios(){
		var mediosCombo = $('#formaDePagoCbx');
		mediosCombo.empty();
		mediosCombo.append('<option disabled="disabled" selected="selected" id="" data-id="" value="">Seleccione medio de pago</option>');
		$.each(medios, function(i, val) {
			mediosCombo.append($('<option></option>').attr({
				id: i,
				value: medios["denominacion"]
			}).text(medios["denominacion"]));
		});
	};

$('#formaDePagoCbx').on('change', function() {
	var indiceMedioDePago = $(this).find('option:selected').attr('id');
	var tipo = getTipoMedioDePago(indiceMedioDePago);
	resetCuotasCombo(false);
	switch (tipo) {
		case TipoCredito:
			changeVisibilityBancos(true);
			changeVisibilityCuotas(true);
			changeVisibilityTarjetas(true);
			loadBancos(indiceMedioDePago);
			break;
		case TipoCupon:
			changeVisibilityBancos(false);
			changeVisibilityCuotas(false);
			changeVisibilityTarjetas(false);
			break;
		default:
			break;
	}	
});

	function getTipoMedioDePago(indiceMedioDePago){
		var medioSeleccionado = medios[indiceMedioDePago];
		medioParseado = parseMedio(medioSeleccionado);
		return medioSeleccionado["tipo"];
	}

	function resetCuotasCombo(flag){
		var cuotasCombo = $('#cuotasCbx');
		cuotasCombo.empty();
		cuotasCombo.append('<option disabled="disabled" selected="selected">Seleccione cantidad de cuotas</option>');
		if(flag){
			cuotasCombo.removeAttr('disabled');
		}else{
			cuotasCombo.attr('disabled', 'disabled');
		}
	}

	function changeVisibilityBancos(flag){
		var bancosCombo = $('#bancoCbx');
		if(flag){
			bancosCombo.show();
		}else{
			bancosCombo.hide();
		}
	}
	function changeVisibilityCuotas(flag){
		var cuotasCombo = $('#cuotasCbx');
		if(flag){
			cuotasCombo.show();
		}else{
			cuotasCombo.hide();
		}
	}
	function changeVisibilityTarjetas(flag){
		if(flag){
			$('.noCupon').show();
		}else{
			$('.noCupon').hide();
			$('#btnConfirmarPago').attr('value','Generar cupón');
		}
	}

	function loadBancos(indiceMedioDePago){
		var bancosCombo = $('#bancoCbx');
		var cuotasCombo = $('#cuotasCbx');
		bancosCombo.empty();
		bancosCombo.removeAttr('disabled');
		bancosCombo.append('<option disabled="disabled" selected="selected" id="" data-id="" value="">Seleccione banco</option>');
		var relationFound = false;
		$.each(relaciones, function(i, relacion) {
			if (relacion["medio"] == indiceMedioDePago) {
				relationFound = true;
				bancosCombo.append($('<option></option>').attr({
					id: i,
					value: bancos[relacion["banco"]]
				}).text(bancos[relacion["banco"]]));
			};
		});
	};

$('#bancoCbx').on('change', function() {
	var indic = $(this).find('option:selected').attr('id');
	var relacionesDelMedio = relaciones[indiceRelacion];
	loadCuotas(relacionesDelMedio);
	setInputs(relacionesDelMedio);
});

	function loadCuotas(relacionesDelMedio){
		var indiceCuotas = relacionesDelMedio[cuotas];
		var cuotasAsociadas = todasLasCuotas[indiceCuotas];
		var cuotasCombo = $('#cuotasCbx');
		cuotasCombo.removeAttr('disabled');
		cuotasCombo.empty();
		cuotasCombo.append('<option disabled="disabled" selected="selected">Seleccione cantidad de cuotas</option>');
		$.each(cuotasAsociadas, function(i, cuotasEInteres) {
			var formatedCuotasEinteres = formatCuotasEInteres(cuotasEInteres);
			 cuotasCombo.append($('<option></option>').attr({
			 		id: i,
			 		value: formatedCuotasEinteres
			 	}).text(formatedCuotasEinteres));
		});
	};

		function formatCuotasEInteres(cuotasEInteres){
			formatedCuotasEinteres = cuotasEInteres["cuotas"] + ' - ' + cuotasEInteres["interes"] + '%';
			return formatedCuotasEinteres;
		}


	function setInputs(relacionesDelMedio) {
		var longMaxNroTarjeta = relacionesDelMedio["longMaxNroTarjeta"];
		var longMinNroTarjeta = relacionesDelMedio["longMinNroTarjeta"];
		var cantDigitosCodSeguridad = relacionesDelMedio["cantDigCodSeg"];
		$("#numeroTarjetaTxt").attr('max-length', longMaxNroTarjeta).keypress(function(e) {
	            if (e.keyCode == 8) { return true; }
	            return this.value.length < $(this).attr("max-length");
	        });
	        $("#numeroTarjetaTxt").attr("min-length",longMinNroTarjeta);
	        $("#codigoSeguridadTxt").attr("maxlength",cantDigitosCodSeguridad);
	        if(cantDigitosCodSeguridad !== undefined){
	        	$("#textCodSeg").text('últimos '+cantDigitosCodSeguridad+' números que están al dorso');	
	        }else{
	        	$("#textCodSeg").text('');
	        }  
	};
