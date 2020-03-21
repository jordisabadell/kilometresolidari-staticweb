 $(document).ready(function() {

	$('button#search').click( function() {
		var results = [];
		var q = $("#q").val()!=''?$("#q").val():"*";
		$.ajax({
			url: "https://www.googleapis.com/customsearch/v1?key="+process.env.APIKEYCUSTOMSEARCH+"&cx=009588600090944150864:aoaq9ac4rb4&q=" + q,
			jsonp: "callback",
			dataType: "jsonp",
			success: function(data) {
				if(data && data.items) {
					$.each(data.items, function(key, val) {
						var mime = val.mime===undefined?'':val.mime;
						results.push(
			  				'<div>' +
			  					'<span class="title '+ mime +'"><a href="' + val.link + '" target="_blank">' + val.title + '</a></span>' +
			  					'<span class="link">' + val.displayLink + '</span>' +
			  					'<span class="snippet">' + val.htmlSnippet + '</span>' +
							'</div>');
					});
					var html="";
					html += '<div>';
					$.each(results, function(key, value) {
						html+=value;
					});
					html += '</div>';

					$("#buscador-content").html(html);
				}
				else if(data.items===undefined) {
					$("#buscador-content").html("<div class='text-center'>No s'han trobat resultats.</div>");
				}
				else if(data.error != null) {
					console.log(data); //todo
					$("#buscador-content").html("<div class='text-center'>Oops! Alguna cosa no ha anat bé.</div>");
				}
			},
			error: function(error) {
				console.log(error); //todo
				$("#buscador-content").html("<div class='text-center'>Oops! Alguna cosa no ha anat bé.</div>");
			}
		});
	});

	//Captura enter key
	$(document).keyup(function (e) {
	    if ($("input#q").is(":focus") && (e.keyCode == 13)) {
			$('button#search').click();
	    }
	});
});