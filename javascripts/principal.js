$('document').ready(function(){
	var rubro = getGET()['rubro'];
	$('.changeableColor').addClass(rubro);
	$('.rubro').removeClass("changeableColor");

	$('.navbar-li').click(function() {
		$('.active').removeClass('active');
		$(this).addClass('active');
	});
});

