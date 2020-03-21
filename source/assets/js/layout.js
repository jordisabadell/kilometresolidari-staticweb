$(document).ready(function() {
	
	//Float share button
	if (($(window).height() + 100) < $(document).height() ) {
		$('#float-button').removeClass('hidden').affix({
		    offset: {top:100}
		});
	}

	//Lazyload
  	$("img").unveil();

  	//Lightbox
  	lightbox.option({
		'resizeDuration': 0,
		'wrapAround': true,
		'showImageNumberLabel': true,
		'albumLabel': 'Imatge %1 de %2'
	});

  	//Load bootstrap tooltips
	$('[data-toggle="tooltip"]').tooltip(); 

  	/** BOOTSTRAP CORRECTS **/

	//Disable bootstrap light efect on activate
	document.addEventListener('click', function(e) { 
		if(document.activeElement.toString() == '[object HTMLButtonElement]'){ document.activeElement.blur(); } 
	});

	//Disable modal focus link on click
	$('body').on('hidden.bs.modal', '.modal', function() {
		$("a[data-toggle=modal]").blur();
	});
});