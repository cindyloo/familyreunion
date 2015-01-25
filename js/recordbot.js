/*function toggleAudioWidgetFeedback(e){
	if (e.classList.contains("toggled"))
		e.classList.remove("slideleft");
	else
		e.classList.add("slideleft");
}*/

$( document ).ready(function() {

$('div#viz').click(function() {
		$(this).toggle("waitslidein");
	});
	
});