var userName;
var description;
var storyURL;
function setRegistrationState(){
	$("div#registration").show();
	$("div#main").hide();
}

function getRegInfo(){
	userName = $("input#archivistname").val();
	description = $("input#description").val();
	storyURL = $("input#urlLink").val();
	
	$("source#FFYouTube").attr("src",storyURL);
}




function setReadyState(){
	$("div#registration").hide();
	$("div#main").show();
	getRegInfo();
	
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
	setRegistrationState();
	$('div#viz').click(function() {
			$(this).toggle("waitslidein");
	});


	
});