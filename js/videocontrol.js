

var keyUpStamp = Date.now();
var spacebarIsBeingPressed = false;

$("#darkPane").hide();
$("#mainBox").hide();

$("#infoButton").hover(function(){
	$("#darkPane").show();
    $("#mainBox").show();
	$("#infoButton").css("right",0);
	$("#infoButton").css("opacity",1);
});

$("#infoButton").mouseleave(function(){
	$("#darkPane").hide();
    $("#mainBox").hide();
	$("#infoButton").css("right",-5);
	$("#infoButton").css("opacity",.5);
});



$(document).ready(function(){
	setUpWaveformUI();
});
	
// Call this function once, when the document is ready, to set up the waveform UI.
function setUpWaveformUI(){
	var audioChannels = 4; // #todo change this later to refer to master list of audio

	for(var i=0;i<audioChannels;i++){
		$("#audioScrubberUI").append("<canvas class=\"waveform-ui\" width=1335 height=60></canvas>");
		// create a <canvas> for every waveform. This canvas exists ontop of the waveform!
	}
	$("#seek-bar").hide() //hide the seek bar
	$("#audioScrubberUI").hide(); // hide the UI. (wait until we get user input)

	// just one waveform
	$("#audioScrubberUI").append("<canvas class=\"waveform-scrubber\" width=1335 height=300></canvas>");

	$(".waveform-ui").on("mousemove",function(e){
		var w = $(this).width()
        var x = (e.pageX - $(this).offset().left);
        //drawCursor($(this), x)
        $(".waveform-ui").each(function(){
        	drawHighlightCursor($(this), x)
        })
	});
	$(".waveform-ui").on("mouseup",function(e){
		var w = $(this).width()
        var x = (e.pageX - $(this).offset().left); 
        $(".waveform-ui").each(function(){
        	drawHighlightCursor($(this), x)
        })
	});
	$(".waveform-ui").on("mousedown",function(e){
		var w = $(this).width()
        var x = (e.pageX - $(this).offset().left);
        $(".waveform-ui").each(function(){
        	hideHighlightCursor($(this))
        })
        //console.log(w,x)
        scrub(x/w);
	});
	$(".waveform-ui").on("mouseout",function(e){
		$(".waveform-ui").each(function(){
        	hideHighlightCursor($(this))
        })
	});
};
// draws the highlight cursor on given canvas at position x
function drawHighlightCursor(canvas, x){
	var w = canvas.width()
	var h = canvas.height()
	var context = canvas[0].getContext("2d");
	context.clearRect(0,0,w,h)
	context.lineWidth = 3;
    context.strokeStyle = "#55aa77";
	context.strokeRect(x,0,3,h);
}
// draws the scrubber position cursor on given canvas at position x
function drawScrubberCursor(canvas, x){
	var w = canvas.width()
	var h = canvas.height()
	var context = canvas[0].getContext("2d");
	context.clearRect(0,0,w,h)
	context.lineWidth = 3;
    context.strokeStyle = "#ffff00";
	context.strokeRect(x,0,3,h);
}

// hides the scrubber cursor from given canvas 
function hideHighlightCursor(canvas){
	var w = canvas.width()
	var h = canvas.height()
	var context = canvas[0].getContext("2d");
	context.clearRect(0,0,w,h)
}
// Move the all the media to a point in time.   
// timePercentage is a float from 0 to 1. 
function scrub(timePercentage){
	console.log(timePercentage);
	$("#seek-bar")[0].value = timePercentage * 100;
	updateVideoAndAudioPosition();
	$("#seek-bar").trigger("change");
	document.getElementById("mainVideo").play()
}
// call this when the video position gets updated 
// timePercentage is a float from 0 to 1. 
function updateAudioScrubberCursor(timePercentage){
	$(".waveform-scrubber").each(function(){
		var x = timePercentage * $(this).width();
        drawScrubberCursor($(this),x)
    })
}






function showDetailBehindVideo(){

	$("#audioScrubberUI").show();
	$("#mainVideo").addClass("transparentVideo");
	$("#seek-bar").addClass("opaqueBar");
}

function hideDetailBehindVideo(){
	$("#audioScrubberUI").hide();
	$("#mainVideo").removeClass("transparentVideo");
	$("#seek-bar").removeClass("opaqueBar");
}

function playOrPauseVideo(){
	var theVideo = document.getElementById("mainVideo");

	if(!theVideo.paused === true){

		theVideo.pause();
		$.each($(".audio"), function(i, v){
			v.pause();	
		});

	} else {

		theVideo.play();
		$.each($(".audio"), function(i, v){
			v.play();	
		});
	}
}


var delta = 500;
var lastKeyPressTimeA = 0;
var lastKeyPressTimeS = 0;
var lastKeyPressTimeD = 0;
var lastKeyPressTimeF = 0;

$(window).keydown(function(e){
	
	
if (e.keyCode === 65) {
	
	var thisKeyPressTime = new Date();
	if ( thisKeyPressTime - lastKeyPressTimeA <= delta )
      {
        //handle double-tap
		$("#avatar1").addClass("faceIconLock");
        thisKeyPressTime = 0;
      }
	  lastKeyPressTimeA = thisKeyPressTime;
	
	
	$("#audioOne")[0].volume = 0.8;
	$("#avatar1").addClass("faceIconLock");
}

if (e.keyCode === 83) {
	
	var thisKeyPressTime = new Date();
	if ( thisKeyPressTime - lastKeyPressTimeS <= delta )
      {
        //handle double-tap
		console.log("double tap!");
        thisKeyPressTime = 0;
      }
	  lastKeyPressTimeS = thisKeyPressTime;
	  
	$("#audioTwo")[0].volume = 0.8;
	$("#avatar2").addClass("faceIconLock");
}

if (e.keyCode === 68) {
	
	var thisKeyPressTime = new Date();
	if ( thisKeyPressTime - lastKeyPressTimeD <= delta )
      {
        //handle double-tap
		console.log("double tap!");
        thisKeyPressTime = 0;
      }
	  lastKeyPressTimeD = thisKeyPressTime;
	  
	$("#audioThree")[0].volume = 0.8;
	$("#avatar3").addClass("faceIconLock");
}

if (e.keyCode === 70) {
	
	var thisKeyPressTime = new Date();
	if ( thisKeyPressTime - lastKeyPressTimeF <= delta )
      {
        //handle double-tap
		console.log("double tap!");
        thisKeyPressTime = 0;
      }
	  lastKeyPressTimeF = thisKeyPressTime;
	  
	$("#audioFour")[0].volume = 0.8;
	$("#avatar4").addClass("faceIconLock");
}
	
if (e.keyCode === 32) {
		e.preventDefault();
	
	var keyDownStamp = Date.now();

	//do this after waiting for one second


		if(spacebarIsBeingPressed === false){
			
			setTimeout(function(){
				if (keyUpStamp > keyDownStamp) {

			

			
			} else {

				showDetailBehindVideo();	
				spacebarIsBeingPressed = true;
			}	

			}, 600);
		
	}
		
}	
	



	//console.log("keydown detected " + e.keyCode);
	

	//if keyup comes after less than one second

		//wait one second
		//check if last keyup stamp is after keydown stamp
			//if not,this means user is holding and call showDetail
		//else -- this is a tap, toggle play/pause

	//if keyup doesn't come for more than one second, user is holding down the key. Launch detail view

});



$(window).keyup(function(e){
	
	if (e.keyCode === 65) {
	$("#audioOne")[0].volume = 0.2;
	$("#avatar1").removeClass("faceIconLock");
	}

if (e.keyCode === 83) {
	$("#audioTwo")[0].volume = 0.2;
	$("#avatar2").removeClass("faceIconLock");
	}

if (e.keyCode === 68) {
	$("#audioThree")[0].volume = 0.2;
	$("#avatar3").removeClass("faceIconLock");
	}

if (e.keyCode === 70) {
	$("#audioFour")[0].volume = 0.2;
	$("#avatar4").removeClass("faceIconLock");
	}

	if (e.keyCode === 32) {
		if(!spacebarIsBeingPressed){
			playOrPauseVideo();
		}
		spacebarIsBeingPressed = false;
		keyUpStamp = Date.now();
		//console.log("keyup detected " + e.keyCode);
		hideDetailBehindVideo();
	}
});


// scrubber
var video = document.getElementById("mainVideo");
var videoDuration = video.duration;
var audio = document.getElementsByClassName("audio");

console.log("here's audio: " + audio.length);
var seekBar = document.getElementById("seek-bar");

$(document).ready(function(){
	console.log("hi");
	video.volume = 0;
	$.each($(".audio"), function(i, v){
		v.volume = 0.2;
	});

	$("#infoButton").hover(function(){
		console.log("hover detected");
		$("#infoButton").toggleClass("infoButtonHover");
	});

	var avatar1Lock = false, avatar2Lock = false, avatar3Lock = false, avatar4Lock = false;

	$("#avatar1").hover(function(){
		$("#audioOne")[0].volume = 0.8;
	});

	$("#avatar2").hover(function(){

		$("#audioTwo")[0].volume = 0.8;
	});

	$("#avatar3").hover(function(){

		$("#audioThree")[0].volume = 0.8;
	});

	$("#avatar4").hover(function(){

		$("#audioFour")[0].volume = 0.8;
	});

	$("#avatar1").mouseleave(function(){
		if (avatar1Lock ===false) {
			$("#audioOne")[0].volume = 0.2;	
		};
		
	});

	$("#avatar2").mouseleave(function(){
		if (avatar2Lock === false) {
			$("#audioTwo")[0].volume = 0.2;	
		};
		
	});

	$("#avatar3").mouseleave(function(){
		if (avatar3Lock === false) {
			$("#audioThree")[0].volume = 0.2;	
		};
	});

	$("#avatar4").mouseleave(function(){
		if (avatar4Lock === false) {
			$("#audioFour")[0].volume = 0.2;	
		};
		
	});

	$("#avatar1").click(function(){
		if (avatar1Lock === false) {
			$(this).addClass("faceIconLock");
			$("#audioOne")[0].volume = 0.8;
			avatar1Lock = true;
			$("#avatar1").css('background-position','-70px 0px');
		} else {
			$(this).removeClass("faceIconLock");
			avatar1Lock = false;
			$("#avatar1").css('background-position','0px 0px');
		}
		
	});

	$("#avatar2").click(function(){
		if (avatar2Lock === false) {
			$(this).addClass("faceIconLock");
			$("#audioTwo")[0].volume = 0.2;
			avatar2Lock = true;	
			$("#avatar2").css('background-position','-70px 0px');
		} else {
			$(this).removeClass("faceIconLock");
			avatar2Lock = false;
			$("#avatar2").css('background-position','0px 0px');
		}
	});

	$("#avatar3").click(function(){
		if (avatar3Lock === false) {
			$(this).addClass("faceIconLock");
			$("#audioThree")[0].volume = 0.2;
			avatar3Lock = true;	
			$("#avatar3").css('background-position','-70px 0px');
		} else {
			$(this).removeClass("faceIconLock");
			avatar3Lock = false;
			$("#avatar3").css('background-position','0px 0px');
		}
	});

	$("#avatar4").click(function(){

		if (avatar4Lock === false) {
			$(this).addClass("faceIconLock");
			$("#audioFour")[0].volume = 0.2;
			avatar4Lock = true;	
			$("#avatar4").css('background-position','-70px 0px');
		} else {
			$(this).removeClass("faceIconLock");
			avatar4Lock = false;
			$("#avatar4").css('background-position','0px 0px');
		}
	});

});



var updateAudio = function(audioArg){
	var audioTime = audioArg.duration * (seekBar.value / 100)
	audioArg.currentTime = audioTime;	
};

seekBar.addEventListener("change", function(){
	updateVideoAndAudioPosition();
});

function updateVideoAndAudioPosition(){
	var time = video.duration * (seekBar.value / 100);

	video.currentTime = time;
	//console.log(audio);
	$.each($(".audio"), function(i, v){
		updateAudio(v)	
	});
}

// Update the seek bar as the video plays
video.addEventListener("timeupdate", function() {
  // Calculate the slider value
  var value = (100 / video.duration) * video.currentTime;

  // Update the slider value
  seekBar.value = value;
  updateAudioScrubberCursor(value/100);
});

// Pause the video when the slider handle is being dragged
seekBar.addEventListener("mousedown", function() {
  video.pause();
});

// Play the video when the slider handle is dropped
seekBar.addEventListener("mouseup", function() {
  video.play();
});


