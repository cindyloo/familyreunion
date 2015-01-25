/*function toggleAudioWidgetFeedback(e){
	if (e.classList.contains("toggled"))
		e.classList.remove("slideleft");
	else
		e.classList.add("slideleft");
}*/

function setReadyState(){
$('div#saveState ').css("visibility","hidden");
$('div#saveState ').css("display","none");
$('div#recordingState ').css("visibility","hidden");
$('div#recordingState ').css("display","none");
$('div#readyState ').css("visibility","visible");
$('div#readyState ').css("display","flex");
$('div#savedState').css("visibility","hidden");
$('div#savedState').css("display","none");
}

function setRecordingState(){
$('div#saveState ').css("visibility","hidden");
$('div#saveState ').css("display","none");
$('div#recordingState').css("visibility","visible");
$('div#recordingState').css("display","flex");
$('div#readyState').css("visibility","hidden");
$('div#readyState').css("visibility","none");
$('div#savedState').css("visibility","hidden");
$('div#savedState').css("display","none");
}

function setSaveState(){
$('div#recordingState').css("visibility","hidden");
$('div#recordingState').css("display","none");
$('div#readyState').css("visibility","hidden");
$('div#readyState').css("display","none");
$('div#saveState').css("visibility","visible");
$('div#saveState').css("display","flex");
}


function setSavedState(){
$('div#recordingState').css("visibility","hidden");
$('div#recordingState').css("display","none");
$('div#readyState').css("visibility","hidden");
$('div#readyState').css("display","none");
$('div#saveState').css("visibility","hidden");
$('div#saveState').css("display","none");
$('div#savedState').css("visibility","visible");
$('div#savedState').css("display","flex");
}


$( document ).ready(function() {
	setReadyState();
	$('div#viz').click(function() {
			$(this).toggle("waitslidein");
	});
	
	

	
});