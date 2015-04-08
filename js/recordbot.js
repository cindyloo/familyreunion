var 	BASEURL = "https://vivid-torch-484.firebaseio.com/";
var archivistName, 
	archivistId,
	description,
	storyURL,
	familymemberName,
	mePlayer,
	blobWAV,
	firebase = new Firebase(BASEURL),
	firebaseKey,
	firebaseURL,
	firebaseSessionKey,
	firebaseSessionKeyForEmail,
	firebaseSessionKey;

var urlParams;

(window.onpopstate = function () {
    var match,
        pl     = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query  = window.location.search.substring(1);

    urlParams = {};
    while (match = search.exec(query))
       urlParams[decode(match[1])] = decode(match[2]);
})();

function initHostState(){
	$("div#hostreg").show();
	$("div#familyRegistration").hide();
	$("div#hostsendlink").hide();
	$("div#main").hide();
}
function setupFirebaseURL(){
	archivistNameuser = $("#archivistname").val();
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
				archivistId = userData.uid.slice(userData.uid.lastIndexOf(":") + 1,userData.uid.length);
				firebaseURL =  BASEURL+ "/users/" + archivistId ;
				firebaseSessionKeyForEmail = "&id=" + archivistId + "&key=/" + Date.now().toString().slice(0,9) + "&story=" + storyURL;
				firebaseSessionKey = firebaseURL + "#" + Date.now().toString().slice(0,9);
				var userIdAsNumber = parseInt(archivistId);
				
				var user = firebase.child("users/" + archivistId);


				user.set({

							name:archivistName,
							userId:archivistId,
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
			//setReadyState();
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

	var userIdAsNumber = parseInt(archivistId);
				
	var emailList = firebase.child("users/" + archivistId + "/emails/");
	var list = $("#familyEmails").val().split(";");
	
	list.forEach(function(e){
		emailList.set({
		email:e, 
		sessionKey:firebaseSessionKey,
		storyURL:storyURL});
	});


	$("input#copylink").text(encodeURIComponent("http://www.pastportinteractive.com:8080/recordbot.html#") +
				encodeURIComponent(firebaseSessionKeyForEmail));
	
				//populate fields for user's email
				var emailString = "mailto:"+ encodeURI(list) +"?subject="+encodeURI("Family Reunion Video")+
				"&body="+encodeURI($("#emailBody").val()) +"\n " +encodeURIComponent("http://www.pastportinteractive.com:8080/recordbot.html#") +
				encodeURIComponent(firebaseSessionKeyForEmail);
				console.log(emailString);
				window.location = emailString;
	
	$("div#hostsendlink").add("p").text("Success sending email");


}


/////////////////////////////
//ENTRY POINT for FAMILY 


function setRegistrationState(){

if (Object.keys(urlParams).length > 0){
	storyURL = urlParams.story;
	archivistId = urlParams.id;
	archivistname = urlParams.id;
	
	$("#theplayer source").src=storyURL;
	$("source#FFYouTube").attr("src",storyURL);
//divy up urlParams.
	$("div#familyRegistration").show();
	$("div#hostsendlink").hide();
	$("div#main").hide();
	$("div#hostreg").hide();
	$("div#main").hide();
	}
}    


function setReadyState(){
	console.log("hello, ready state");

	$("div#main").show();
	familymemberName = $("#familyname").val();
	firebaseURL = BASEURL+ "users/" + archivistId ;

    $.ajax({
      url: "gupshup_snippet1.html",
      context: document.body,
      success: function(response){
      	console.log("found a response! :\n");
      	debugger;
        $("div#main").prepend(response);
      },
      error: function(response){
      	console.log("oops!" + response);
      }
    });

	$("label#welcome").text("Welcome " + familymemberName + ". Please wait until " + archivistName + "is ready");
	$("div#familyRegistration").hide();
	$("div#registration").hide();
	$("div#hostsendlink").hide();
	$("div#hostreg").hide();

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
		data.append('archname',archivistName);
		data.append('famname',archivistName);
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

//do we have parameters? host state or registration state?
if (Object.keys(urlParams).length == 0){
	initHostState();
}else{
	setRegistrationState();
}
	

	//interpret hash values in link
	var hashValues = window.location.hash.split("#");
	//just FYI
	var archivist = hashValues[1];
	var sessionId = hashValues[2];
	var youtubeLink = hashValues[3];

});


