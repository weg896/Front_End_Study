var name;
var connectedUser = null;

var conn = new WebSocket("ws://localhost:8080", 'video-protocal');
conn.onopen = function(){
    console.log("connected to server");
}

conn.onmessage = function(msg){
    console.log("got message", msg.data);

    var data = JSON.parse(msg.data);

    switch(data.type){
        case "login":
            handleLogin(data.success);
            break;
        case "offer":
            handleOffer(data.offer, data.name);
            break;
        case "answer":
            handleAnswer(data.answer);
            break;
        case "candidate":
            handleCandidate(data.candidate);
            break;
        case "leave":
            handleLeave();
            break;
        default:
            break;
    }
}

conn.onerror = function(err){
    console.log("got error", err);
}

function send(message){
    if(connectedUser != null){
        message.name = connectedUser;
    }
    conn.send(JSON.stringify(message));
}

var loginPage = document.querySelector("#loginPage");
var usernameInput = document.querySelector("#usernameInput");
var loginBtn = document.querySelector("#loginBtn");

var callPage = document.querySelector("#callPage");
var callToUsernameInput = document.querySelector("#callToUsernameInput");
var callBtn = document.querySelector("#callBtn");

var hangUpBtn = document.querySelector("#hangUpBtn");
var localVideo = document.querySelector("#remoteVideo");

var yourConn;
var stream;

callPage.style.display ="none";

loginBtn.addEventListener("click", function(event){
    name = usernameInput.value;
    console.log(name);
    if(name.length > 0){
        send({type:"login", name:name});
    }
})

function handleLogin(success){
    if(success === false){
        console.log("login in false")
    }else{
        loginPage.style.display = "none";
        callPage.style.display = "block";

        navigator.getUserMedia({video:true, audio:true}, function(stream){
            localVideo.src = window.URL.createObjectURL(stream);
            yourConn = new RTCPeerConnection();
            yourConn.addStream(stream);

            yourConn.onaddstream = function(e){
                console.log("");
                remoteVideo.src = window.URL.createObjectURL(e.stream);
            }

            yourConn.onicecandidate = function(e){
                if(e.candidate){
                    send({type:"candidate", candidate:e.candidate});
                }
            }
        }, function(error){
            console.log(error);
        })
    }
}

callBtn.addEventListener("click", function(){
    var callToUsername = callToUsernameInput.value;
    if(callToUsername.length > 0){
        connectedUser = callToUsername;
        yourConn.createOffer(function(offer){
            send({type:"offer",offer:offer});
            yourConn.setLocalDescription(offer);
        }, function(error){
            console.log("error on creating offer");
        })
    }
})

function handleOffer(offer, name){
    connectedUser = name;
    yourConn.setRemoteDescription(new RTCSessionDescription(offer));

    yourConn.createAnswer(function(answer){
        yourConn.setLocalDescription(answer);
        send({type:"answer", answer:answer})
    }, function(error){
        console.log(error);
    })
}

function handleAnswer(answer){
    yourConn.setRemoteDescription(new RTCSessionDescription(answer));
}

function handleCandidate(candidate){
    yourConn.addIceCandidate(new RTCIceCandidate(candidate));
}

hangUpBtn.addEventListener("click", function(){
    send({type:"leave"});
    handleLeave();
})

function handleLeave(){
    connectedUser = null;
    remoteVideo.src = null;

    yourConn.close();
    yourConn.onicecandidate = null;
    yourConn.onaddstream = null;
}