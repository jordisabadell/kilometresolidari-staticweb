var _GAAPI = function() {}

_GAAPI.prototype.clickTracker = function() {
	
	var action = $(this).attr('data-ga-action'); //link (enllaç a tercers), share (social), form, info
	var label = $(this).attr('data-ga-label');
	var category = $(this).attr('data-ga-category');

	if(!label) {
		label = $(this).attr('title');
	}
	
	if(!category) {
		category = (action=='share')?"Xarxes socials":"Genèric";
	}

	ga('send', 'event', {'eventCategory': category, 'eventAction': action, 'eventLabel': label});
};

var GAAPI = new _GAAPI();
$(document).ready(function() {  
	
	$('[data-ga=click]').on('click', GAAPI.clickTracker);
});