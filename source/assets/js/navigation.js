$(document).ready(function() {	

	//Collapse button efect (show/hide)
	$('.collapse-btn').on('click', function (e) {
		e.preventDefault();
		var id='#' + (e.target.id) + '-content';
		$(id).collapse('toggle'); 
		goTo(id, 40);
	});

	//Scroll detect
	var lastScrollTop = 0;
	$(window).scroll(function(event) {
		var st = $(this).scrollTop();
		if (st <50) {
			$("#navbar").removeClass("hidden");
			$("#navbar").removeClass("solid");
		}
		else if (st > lastScrollTop) { //scroll down
			$("#navbar").addClass("hidden");
			$("#navbar").removeClass("solid");
		}
		else { //scroll up
			$("#navbar").removeClass("hidden");
			$("#navbar").addClass("solid");
		}
		lastScrollTop = st;		
	});

	//Overlay menu
	var body = document.body;
    var overlay = document.querySelector('.navoverlay');
    var el = document.querySelectorAll('a[class$="overlay"]');

    [].forEach.call(el, function(btt) {

      btt.addEventListener('click', function(e) {
      	e.preventDefault();
		var overlayOpen = this.className === 'open-overlay';

		overlay.setAttribute('aria-hidden', !overlayOpen);
		body.classList.toggle('noscroll', overlayOpen);

		overlay.scrollTop = 0;

      }, false);
    });

    $(".navoverlay a").each(function(key, value) {
    	$(value).on('click', function(event) {
			if (this.hash !== "") {
				event.preventDefault();
				$(".navoverlay").attr("aria-hidden", 'true');
				$("body").removeClass('noscroll');
				goTo(this.hash);
			}
		});
    });

    //Esc key
    $(document).keyup(function(e) {
		if (e.keyCode == 27) {
			if($(".navoverlay").attr("aria-hidden")=='false') {
				$(".navoverlay").attr("aria-hidden", 'true');
				$("body").removeClass('noscroll');
			}			
	    }
	});
});