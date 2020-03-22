window.loadWordpressPost = function loadWordpressPost() {

	var items = [];
	$.ajax({
	    url: "//www.kilometresolidari.cat/wp/?json=get_recent_posts",
	    jsonp: "callback",
	    dataType: "jsonp",
	 	success: function(data) {
			if(data && data.posts) {
		  		$.each(data.posts, function(key, val) {

		  			var title = val.title;
		  			if(title!='') {
			  			var id = val.id;
			  			var thumbnail = (val.thumbnail!==undefined)?val.thumbnail:'';
			  			var autor = (val.custom_fields.autor!==undefined)?val.custom_fields.autor:'';
			  			var content = (val.content!==undefined)?val.content:'';
						var animated = 'animated slideInLeft'; //(key & 1)?"animated slideInRight":"animated slideInLeft";

			  			var card = 
			  				'<div class="panel panel-default ' + animated + '">' +
		  						'<div class="panel-body">' +
					  				'<div class="media">' + 
										'<img src="' + thumbnail + '" alt="' + autor + '" title="' + autor + '" class="mr-3">' +
										'<div class="media-body">' +
											'<h4 class="mt-0 small">' + autor + '</h4>' +
											'<p class="small"><a href="#" title="Enllaç a l\'experiència ' + title + '" data-ga="click" data-ga-action="link" data-toggle="modal" data-target="#experiencia' + id + '">' + title + '</a></p>' +
										'</div>' +
									'</div>' + 
								'</div>' + 
							'</div>';

						var navigation = '';
						var modal = 
							'<div class="modal fade" id="experiencia' + id + '" tabindex="-1" role="dialog" aria-labelledby="experiencia'+ id +'_title" aria-hidden="true">' + 
								'<div class="modal-dialog" role="document">' + 
									'<div class="modal-content">' + 
										'<div class="modal-body">' + 
											'<button type="button" class="close" data-dismiss="modal" aria-label="Tancar">' + 
												'<span aria-hidden="true">&times;</span>' + 
											'</button>' + 
											'<h4>' + autor + '</h4>' + 
											'<span class="small">' + content + '</span>' + 
											navigation +
										'</div>' + 
									'</div>' + 
								'</div>' + 
							'</div>';

			  			items.push(
			  				'<div class="col-sm-6">' +
			  					card + 
			  					modal +
							'</div>');
			  		}
		  		});
		  	}

			var html="";			
			$.each(items, function(key, value) {
				html+=value;
			});
			$("#experiencies-loader").addClass("hidden");
			$("#experiencies-content").html(html);
	    },
	    error: function(error) {
	    	console.log(error); //todo
	    }
	});	
}