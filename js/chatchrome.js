
if (!console || !console.log) {
  var console = {
    log: function() {}
  };
}

// Ugh, globals.
var peerc;
var myUserID;
var mainRef = new Firebase("https://vivid-torch-484.firebaseio.com/gupshup");


$("#incomingCall").modal();
$("#incomingCall").modal("hide");

function prereqs() {
  if (!navigator.webkitGetUserMedia) {
    error("Sorry, getUserMedia is not available! (Did you set media.navigator.enabled?)");
    return;
  }
  if (!window.webkitRTCPeerConnection) {
    error("Sorry, PeerConnection is not available! (Did you set media.peerconnection.enabled?)");
    return;
  }

  // Ask user to login.
  var name = prompt("Enter your username", "Guest" + Math.floor(Math.random()*100)+1);

  // Set username & welcome.
  document.getElementById("username").innerHTML = name;
  document.getElementById("welcome").style.display = "block";

  myUserID = btoa(name);
  var userRef = mainRef.child(myUserID);
  var userSDP = userRef.child("sdp/");
  var userStatus = userRef.child("presence");

  userSDP.onDisconnect().set(null);
  userStatus.onDisconnect().set(false);

  $(window).unload(function() {
    userSDP.set(null);
    userStatus.set(false);
  });

  // Now online.
  userSDP.set("test/");
  userStatus.set(true);

  mainRef.on("child_added", function(snapshot) {
    var data = snapshot.val();
    if (data.presence) {
      appendUser(snapshot.key());
    }
  });

  mainRef.on("child_changed", function(snapshot) {
    var data = snapshot.val();
    if (data.presence) {
      removeUser(snapshot.key());
      appendUser(snapshot.key());
    }
    if (!data.presence) {
      removeUser(snapshot.key());
    }


    if (data.sdp && data.sdp.to == myUserID) {
      if (data.sdp.type == "offer") {
        incomingOffer(data.sdp.offer, data.sdp.from)
        userSDP.set(null);
      }
      if (data.sdp.type == "answer") {
        incomingAnswer(data.sdp.answer);
        userSDP.set(null);
      }
    }
  });
}



function error(msg) {
  document.getElementById("message").innerHTML = msg;
  document.getElementById("alert").style.display = "block";
}

$("#incomingCall").on("hidden", function() {
  document.getElementById("incomingRing").pause();
});

function incomingOffer(offer, fromUser) {
  document.getElementById("incomingUser").innerHTML = atob(fromUser);
  document.getElementById("incomingAccept").onclick = function() {
    $("#incomingCall").modal("hide");
    acceptCall(offer, fromUser);
  };
  $("#incomingCall").modal();
  //document.getElementById("incomingRing").play();
};

function incomingAnswer(answer) {
  peerc.setRemoteDescription(new RTCSessionDescription(JSON.parse(answer)), function() {
    log("Call established!");
  }, error);
};

function log(info) {
  var d = document.getElementById("debug");
  d.innerHTML += info + "\n\n";
}

function appendUser(userid) {
  if (userid == myUserID) return;
  var d = document.createElement("div");
  d.setAttribute("id", userid);

  var a = document.createElement("a");
  a.setAttribute("class", "btn btn-block btn-inverse");
  a.setAttribute("onclick", "initiateCall('" + userid + "');");
  a.innerHTML = "<i class='icon-user icon-white'></i> " + atob(userid);

  d.appendChild(a);
  d.appendChild(document.createElement("br"));
  document.getElementById("users").appendChild(d);
}

function removeUser(userid) {
  var d = document.getElementById(userid);
  if (d) {
    document.getElementById("users").removeChild(d);
  }
}

// TODO: refactor, this function is almost identical to initiateCall().
function acceptCall(offer, fromUser) {
  log("Incoming call with offer " + offer);
  document.getElementById("main").style.display = "none";
  document.getElementById("call").style.display = "block";

  navigator.webkitGetUserMedia({video:true, audio:false}, function(vs) {
     var video = document.getElementById('localvideo');
    video.src = (window.URL || window.webkitURL).createObjectURL(vs);
    document.getElementById("localvideo").play();

    
      var pc = new webkitRTCPeerConnection(null);
      pc.addStream(vs);
     pc.onicecandidate = function (evt) {
       if (evt.candidate) {
        var candidateStr = evt.candidate.candidate;
          if (candidateStr.indexOf('tcp') !== -1) {
            return ;
          }
          pc.addIceCandidate(evt.candidate);
          log('remote? ICE candidate: \n' + evt.candidate.candidate);
        }   
      };

      pc.onaddstream = function(obj) {

        log("Got onaddstream of type " + obj.type);
        //if (obj.type == "video") {
          var video = document.getElementById('remotevideo');
          window.stream = obj;
          video.src =  (window.URL || window.webkitURL).createObjectURL(obj.stream);
          video.play();
        //} 
        document.getElementById("dialing").style.display = "none";
        document.getElementById("hangup").style.display = "block";
      };

      

      pc.setRemoteDescription(new RTCSessionDescription(JSON.parse(offer)), function() {
        log("setRemoteDescription, creating answer");
        pc.createAnswer(function(answer) {
          pc.setLocalDescription(answer, function() {
            // Send answer to remote end.
            log("created Answer and setLocalDescription " + JSON.stringify(answer));
            peerc = pc;
            var toSend = {
              type: 'answer',
              to: fromUser,
              from: myUserID,
              answer: JSON.stringify(answer)
            };
            var toUser = mainRef.child(toSend.to);
            var toUserSDP = toUser.child("/sdp/");
            toUserSDP.set({
              type: 'answer',
              to: fromUser,
              from: myUserID,
              answer: JSON.stringify(answer)
            });

          }, error);
       
      }, error);
    }, error);
  }, error);
}

function initiateCall(userid) {
  document.getElementById("main").style.display = "none";
  document.getElementById("call").style.display = "block";

  navigator.webkitGetUserMedia({video:true,audio:false}, function(vs) {
    log("source" + vs.src);
     var video = document.getElementById('localvideo');
    video.src = (window.URL || window.webkitURL).createObjectURL(vs);
    document.getElementById("localvideo").play();

    

      var pc = new webkitRTCPeerConnection(null);

      pc.onicecandidate = function (evt) {
       if (evt.candidate) {
        var candidateStr = evt.candidate.candidate;
          if (candidateStr.indexOf('tcp') !== -1) {
            return ;
          }
          pc.addIceCandidate(evt.candidate);
          log('Local ICE candidate: \n' + evt.candidate.candidate);
        }   
      };

      pc.addStream(vs);
      

      pc.onaddstream = function(obj) {
        log("Got onaddstream of type " + obj.stream);
       // if (obj.type == "video") {
            var video = document.getElementById('remotevideo');
          window.stream = obj;
          video.src =  (window.URL || window.webkitURL).createObjectURL(obj.stream);
          video.play();
        //}
        document.getElementById("dialing").style.display = "none";
        document.getElementById("hangup").style.display = "block";
      };

      pc.createOffer(function(offer) {
        log("Created offer" + JSON.stringify(offer));
        pc.setLocalDescription(new RTCSessionDescription(offer), function() {
          // Send offer to remote end.
          log("setLocalDescription, sending to remote");
          peerc = pc;
          var toSend = {
            type: "offer",
            to: userid,
            from: myUserID,
            offer: JSON.stringify(offer)
          };
          var toUser = mainRef.child(toSend.to);
          var toUserSDP = toUser.child("/sdp/");
          toUserSDP.set({
            type: "offer",
            to: userid,
            from: myUserID,
            offer: JSON.stringify(offer)
          });
        }, error);
      
    }, error);
  }, error);
}

function endCall() {
  log("Ending call");
  document.getElementById("call").style.display = "none";
  document.getElementById("main").style.display = "block";

  document.getElementById("localvideo").pause();
  document.getElementById("localaudio").pause();
  document.getElementById("remotevideo").pause();
  document.getElementById("remoteaudio").pause();

  document.getElementById("localvideo").src = null;
  document.getElementById("localaudio").src = null;
  document.getElementById("remotevideo").src = null;
  document.getElementById("remoteaudio").src = null;

  peerc = null;
}

function error(e) {
  if (typeof e == typeof {}) {
    alert("Oh no! " + JSON.stringify(e));
  } else {
    alert("Oh no! " + e);
  }
  endCall();
}

prereqs();

