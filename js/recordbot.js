var userName, 
	userId,
	description,
	storyURL,
	mePlayer,
	blobWAV,
	firebase = new Firebase("https://vivid-torch-484.firebaseio.com/"),
	firebaseKey,
	firebaseURL,
	firebaseSessionKey,
	BASEURL = "https://vivid-torch-484.firebaseio.com/";

function initHostState(){
	$("div#hostreg").show();
	$("div#familyRegistration").hide();
	$("div#hostsendlink").hide();
	$("div#main").hide();
}
function setupFirebaseURL(){
	userName = $("#archivistname").val();
	description = $("#description").val();
	storyURL = $("#hosturlLink").val();
	firebase= new Firebase(BASEURL);
	firebase.createUser({
		email:$("#hostemail").val(),
		password:"password"
		
	}, function (error, userData){
			if(error){
				console.log("Error creating user",error);
				alert("Error:\n" + error.message);
			}
			else{
				firebasekey = userData.uid;
				console.log("Success uuid: ", userData.uid);
				userId = userData.uid.slice(userData.uid.lastIndexOf(":") + 1,userData.uid.length);
				firebaseURL =  BASEURL+ userId ;
				firebaseSessionKey = firebaseURL + "#" + Date.now().toString().slice(0,9);
				var userIdAsNumber = parseInt(userId);
				
				var user = firebase.child("users/" + userId);

				user.set({
							name:userName,
							sessionKey:firebaseSessionKey
				});
			}
		});
	
	regEmails();
}


function getRegInfo(){
	
	$("source#FFYouTube").attr("src",storyURL);
	var vplayer= $("#theplayer");	
	mePlayer = new MediaElementPlayer("#theplayer",{
		timerRate: 1000,
		success: function (mediaElement, domObject) { 
		console.log("video creation success");
       	 // call the play method
      	 // mediaElement.play();
         	//$(".mejs-overlay-button").css("background","none");
			setReadyState();
			$(".mejs-overlay-button").unbind('click');

			$(".mejs-overlay-button").click(function(e){
				setRecordingState();
				if (toggleRecording(this) == -1){
					mePlayer.options.clickToPlayPause = false; //only way to not start movie if audio fails
					e.preventDefault();
					}
				else{
					mePlayer.options.clickToPlayPause = true;
					mePlayer.play();
					// mePlayer.setCurrentTime(0);
					 //this should be a toggle/mode too
				}
			});
			//firebase video syncing


			var positionRef = new Firebase(firebaseURL +"videoPosition"); 

			
			mediaElement.addEventListener("timeupdate", function(){

				firebase.set({videoPosition: mediaElement.currentTime})
			 }); 

			mediaElement.addEventListener("seeked", function(){

				//firebase.set({videoPosition: mediaElement.currentTime})
			 }); 
			
			positionRef.on('value', function(dataSnapshot){

			 	console.log("the dataSnapshot is: " + dataSnapshot.val());
			 	console.log("recorded a change in video position");
			 	console.log("the video player's time is: " + mediaElement.currentTime);
			 	if (Math.abs(dataSnapshot.val() - mediaElement.currentTime)) {
			 		console.log("the difference is: " + Math.abs(dataSnapshot.val() - mediaElement.currentTime));
			 		mePlayer.setCurrentTime(dataSnapshot.val());	
			 	};


			 });	

		},
		error: function(e){
			console.log("error");
		},
		
		seeked: function(e){
			console.log("seeking");
		}
	});
}
function regEmails(){
	$("div#hostsendlink").show();
	$("div#hostreg").hide();
	$("div#familyRegistration").hide();
	$("div#main").hide();
}

function sendFamilyEmails(){

	var userIdAsNumber = parseInt(userId);
				
	var emailList = firebase.child("users/" + userId + "/emails/");
	var list = $("#familyEmails").val().split(";");
	
	list.forEach(function(e){
		emailList.push({email:e, sessionKey:firebaseSessionKey});
	});
	//noah code
	//
	
	var family =firebase.child("family" + userId);
				family.set({
					email:emailArray
				});

				//populate fields for user's email
				var emailString = "mailto:"+ encodeURI(emailArray) +"?subject="+encodeURI("Family Reunion Video")+"&body="+encodeURI($("#emailBody").val()) +"\n " +encodeURIComponent("http://localhost:8080/recordbot.html#");
				console.log(emailString);
				window.location = emailString;
	
	$("div#hostsendlink").add("p").text("Success sending email");


}

function setRegistrationState(){
	$("div#familyRegistration").show();
	$("div#hostreg").hide();
	$("div#main").hide();
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
function uploadBlob(blob) {
    
 var link = document.getElementById("save");
    var fname = link.download;
     var data = new FormData();
      data.append('file', blob);
      data.append('filename',fname);
		data.append('username',userName);
		data.append('tmp-name','test.txt');

      $.ajax({
        url :  "uploadaudio.php",
        type: 'POST',
        data: data,
        contentType: false,
        processData: false,
        success: function(data) {
          console.log("Success uploading!" + data);
          },    
        error: function(event) {
          console.log("Failed to upload." + event);
        }
      });
}
function upload(blob) {

    var link = document.getElementById("save");
    var fname = link.download;
    
  var xhr=new XMLHttpRequest();
  xhr.onload=function(e) {
 	 xhr.sendAsBinary(evt.target.result);
      if(this.readyState === 4) {
          console.log("Server returned: ",e.target.responseText);
      }
  };
  var fd=new FormData();
  fd.append("data",blob);
  xhr.open("POST","uploadaudio.php",true);
  xhr.send(fd);
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
// mePlayer.setCurrentTime(0);

	uploadBlob(blobWAV);

}


$( document ).ready(function() {
	initHostState();
	$('div#viz').click(function() {
			$(this).toggle("waitslidein");
	});
});


