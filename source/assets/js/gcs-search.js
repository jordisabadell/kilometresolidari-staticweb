 $(document).ready(function() {

	$('button#search').click( function() {

		//reCaptcha v3 validation
        grecaptcha.ready(function() {        
            grecaptcha.execute(process.env.APIKEYRECAPTCHA, {action: 'search'}).then(function(token) {

				$('#formulariContacte').prepend('<input type="hidden" name="g-recaptcha-response" value="' + token + '">');
                $.post("http://kilometresolidari.cat/scripts/recaptcha-validation/validate-token.php",{token: token}, function(result) {
					if(result.success) {
						console.log("reCaptcha v3 pass");

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
								console.log(error);
								$("#buscador-content").html("<div class='text-center'>Oops! Alguna cosa no ha anat bé.</div>");
							}
						});						
					} else {
						console.log("reCaptcha v3 no pass");
						$("#buscador-content").html("<div class='text-center'>Ha fallat la validació del captcha.</div>");
					}
				});
			});
		});
	});

	//Captura enter key
	$(document).keyup(function (e) {
	    if ($("input#q").is(":focus") && (e.keyCode == 13)) {
			$('button#search').click();
	    }
	});
});