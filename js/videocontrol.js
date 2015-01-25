

var keyUpStamp = Date.now();
var spacebarIsBeingPressed = false;

function showDetailBehindVideo(){

	$("#mainVideo").addClass("transparentVideo");
}

function hideDetailBehindVideo(){
	$("#mainVideo").removeClass("transparentVideo");
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



$(window).keydown(function(e){
	
	var keyDownStamp = Date.now();

	//do this after waiting for one second


		if(spacebarIsBeingPressed === false){
			
			setTimeout(function(){
				if (keyUpStamp > keyDownStamp) {

			playOrPauseVideo();

			
			} else {

				showDetailBehindVideo();	
				spacebarIsBeingPressed = true;
			}	

			}, 600);

			
			
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
	spacebarIsBeingPressed = false;
	keyUpStamp = Date.now();
	//console.log("keyup detected " + e.keyCode);
	hideDetailBehindVideo();
});

//scrubber
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
		} else {
			$(this).removeClass("faceIconLock");
			avatar1Lock = false;
		}
		
	});

	$("#avatar2").click(function(){
		if (avatar2Lock === false) {
			$(this).addClass("faceIconLock");
			$("#audioTwo")[0].volume = 0.2;
			avatar2Lock = true;	
		} else {
			$(this).removeClass("faceIconLock");
			avatar2Lock = false;
		}
	});

	$("#avatar3").click(function(){
		if (avatar3Lock === false) {
			$(this).addClass("faceIconLock");
			$("#audioThree")[0].volume = 0.2;
			avatar3Lock = true;	
		} else {
			$(this).removeClass("faceIconLock");
			avatar3Lock = false;
		}
	});

	$("#avatar4").click(function(){

		if (avatar4Lock === false) {
			$(this).addClass("faceIconLock");
			$("#audioFour")[0].volume = 0.2;
			avatar4Lock = true;	
		} else {
			$(this).removeClass("faceIconLock");
			avatar4Lock = false;
		}
	});

});


var updateAudio = function(audioArg){
	var audioTime = audioArg.duration * (seekBar.value / 100)
	audioArg.currentTime = audioTime;	
};

seekBar.addEventListener("change", function(){
	var time = video.duration * (seekBar.value / 100);

	video.currentTime = time;
	console.log(audio);
	$.each($(".audio"), function(i, v){
		updateAudio(v)	
	});
});

// Update the seek bar as the video plays
video.addEventListener("timeupdate", function() {
  // Calculate the slider value
  var value = (100 / video.duration) * video.currentTime;

  // Update the slider value
  seekBar.value = value;
});

// Pause the video when the slider handle is being dragged
seekBar.addEventListener("mousedown", function() {
  video.pause();
});

// Play the video when the slider handle is dropped
seekBar.addEventListener("mouseup", function() {
  video.play();
});




