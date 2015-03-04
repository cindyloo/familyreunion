Parse.initialize("J8coVdeK4qQ5caknkVPTtpVYdLw2Bnt4gi1AOIR0", "cGw7i8a9UzlX9lg7dbPddFoXXHx36qDH7q4klTGO");

$("#submit").click(function(e){
	e.preventDefault();
	var name = $("#nameField").val();
	var description = $("#descriptionField").val();

	var Participant = Parse.Object.extend("participant");
	participant = new Participant();
	//save a reference to the video here
	//participant.set("video", video);
	//participant.set("audio", audio);
	participant.set("name", name);
	participant.set("description", description);
	participant.save();
});

 var firebase = new Firebase("https://vivid-torch-484.firebaseio.com/");

var positionRef = new Firebase("https://vivid-torch-484.firebaseio.com/videoPosition"); 

	var videoPlayer = $("#theVideo")[0];
	
	videoPlayer.ontimeupdate = function(){
 	firebase.set({videoPosition: videoPlayer.currentTime} );
 	console.log("That's a time update");
 }

 positionRef.on('value', function(dataSnapshot){

 	console.log("the dataSnapshot is: " + dataSnapshot.val());
 	console.log("recorded a change in video position");
 	videoPlayer.currentTime = dataSnapshot.D.A;
 });
