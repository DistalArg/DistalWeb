$(function(){
	const EmailRegEx = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
	const NameRegEx = /^[A-ZÁÉÍÓÚÑa-záéíóúñ.]+([\s][A-ZÁÉÍÓÚÑa-záéíóúñ.]+)+$/
	const MessageRegEx = /\w+/

	$('document').ready(function(){
		$('.alert').hide();
		renderize();
	});



	$(window).resize(renderize());

	function renderize(){
		if($(window).width() <= 450){
			$('#form-column').removeClass('col-xs-6');
			$('#form-column').removeClass('col-xs-push-3');
			$('#form-column').addClass('col-xs-12');
		}
		else{
			$('#form-column').removeClass('col-xs-12');
			$('#form-column').addClass('col-xs-6');
			$('#form-column').addClass('col-xs-push-3');
		}
	}

	$('#name').blur(function() {
		if ($(this).val() == ""){
			$('#nameRequiredError').show();
		} else if (!validation($(this).val(), NameRegEx)) {
			$('#nameRequiredError').hide();
			$('#nameFormatError').show();
		} else{
			$('#nameRequiredError').hide();
			$('#nameFormatError').hide();
		}
	});

	$('#email').blur(function() {
		if ($(this).val() == ""){
			$('#emailRequiredError').show();
		} else if (!validation($(this).val(), EmailRegEx)) {
			$('#emailRequiredError').hide();
			$('#emailFormatError').show();
		} else{
			$('#emailRequiredError').hide();
			$('#emailFormatError').hide();
		}
	});

	$('#message').blur(function() {
		if ($(this).val() == ""){
			$('#messageRequiredError').show();
		} else if (!validation($(this).val(), MessageRegEx)) {
			$('#messageRequiredError').hide();
			$('#messageFormatError').show();
		} else{
			$('#messageRequiredError').hide();
			$('#messageFormatError').hide();
		}
	});

	function validation(input, regEx){
		return input.match(regEx);
	};
});