$(function() {

	$('#new-work').bind('click', function(e) {
		e.preventDefault();
		newPop = $('#block-upload').bPopup();
	});

	$('#close-form').bind('click', function(e) {
		e.preventDefault();
		newPop.close();
	});

});