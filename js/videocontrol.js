

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
	} else {

		theVideo.play();

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
var audio = document.getElementsByClassName("audio");
console.log("here's audio: " + audio.length);
var seekBar = document.getElementById("seek-bar");

var updateTime = function(updateThis){
	var time = video.duration * (seekBar.value / 100);
	updateThis.currentTime = time;
}
seekBar.addEventListener("change", updateTime(video));

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


