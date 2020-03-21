$(document).ready(function() {	
  
  var mymap = L.map('mapid').setView([41.5504024, 2.0814082], 13);

	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox.streets'
  }).addTo(mymap);
  
  var marker = L.marker([41.5504024, 2.0814082]).addTo(mymap);
  marker.bindPopup("<div class=\'infoWindows\'><b>Associació Juvenil Esquitx</b><br>c\\Turina, 44 Sabadell<br><br><a href=\'https://www.google.com/maps/dir//Carrer+de+Turina,+44,+08206+Sabadell,+Barcelona,+Espanya/@41.5503777,2.0814309,17z\' target=\'_blank\' title=\'Com arribar-hi?\'><i class=\'fa fa-location-arrow \' aria-hidden=\'true\'></i> Com arribar-hi?</a></div>").openPopup();

});