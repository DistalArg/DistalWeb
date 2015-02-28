$('document').ready(function(){
	renderize();
});

function validatings(){
	$('#form-contacto').validate({
		rules :{
			email : {
				required : true, //para validar campo vacio
				email : true //para validar formato email
			},
			name : {
				required : true,
				minlength : 3, //para validar campo con minimo 3 caracteres
				maxlength : 20 //para validar campo con maximo 9 caracteres
			},
			messages : {
				my_email : {
					required : "Debe ingresar el e-mail.",
					email : "Debe ingresar un e-mail válido."
				},
				my_name : {
					required : "Debe ingresar un nombre.",
					minlength : "El nombre debe tener un minimo de 3 caracteres.",
					maxlength : "el nombre debe tener un máximo de 20 caracteres."
				}
			}
		}
	});
}

function renderize(){
	var windowWidth = $(window).width();
	var formControlWidth;
	if(windowWidth <= 800){
		formControlWidth = windowWidth * 2/3;
	}
	else{
		formControlWidth = windowWidth * 1/2;
	}
	$('.form-control').width(formControlWidth);
	var boxesWidth = $('#mensaje').width();
	$('.btn').width(boxesWidth / 4);
	var tab = windowWidth / 2;
	$('#div-botones').css({
		position: 'absolute',
		left: tab
	});
}