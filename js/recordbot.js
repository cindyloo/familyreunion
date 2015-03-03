var userName;
var description;
var storyURL;
var mePlayer;
function setRegistrationState(){
	$("div#registration").show();
	$("div#main").hide();
}

function getRegInfo(){
	userName = $("input#archivistname").val();
	description = $("input#description").val();
	storyURL = $("input#urlLink").val();
	
	$("source#FFYouTube").attr("src",storyURL);
	var vplayer= $("#theplayer");	
	mePlayer = new MediaElementPlayer("#theplayer",{
	
		success: function (mediaElement, domObject) { 
	
       	 // call the play method
      	 // mediaElement.play();
         	//$(".mejs-overlay-button").css("background","none");
			setReadyState();
		
			$(".mejs-overlay-button").click(function(){
				toggleRecording(this);
				setRecordingState(); //this should be a toggle/mode too
			});
		},
		error: function(){
		
		}
    });
	
	
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