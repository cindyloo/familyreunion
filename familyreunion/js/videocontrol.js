

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


