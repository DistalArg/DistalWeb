$('document').ready(function(){
	var rubro = getGET()['rubro'];
	$('.changeableColor').addClass(rubro);
	$('.rubro').removeClass("changeableColor");
});

