//webkitURL is deprecated but nevertheless
URL = window.URL || window.webkitURL;

var gumStream; 						//stream from getUserMedia()
var rec; 							//Recorder.js object
var input; 							//MediaStreamAudioSourceNode we'll be recording
var textlist = {
	"1": ["dog", "cat", "mouse", "snake", "bird", "snail"],
	"2": ["car", "boat", "truck", "train", "raft", "plane"]
}
var listc = "1"
var counter = 0;
var inst;

// shim for AudioContext when it's not avb. 
var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext //audio context to help us record

var continueButton = document.getElementById("continueButton");
var prestext = document.getElementById("screen");
// var recordingsList = document.getElementById("recordingsList");
var endButton;

//add events to those 2 buttons
continueButton.addEventListener("click", continueAction);

function change() {
	list = textlist[listc]
	prestext.innerHTML = "<stimPres>" +
		list[counter] +
		"</stimPres>";
	if (counter == list.length) {
		clearInterval(inst);
		breakPoint();
	}
	counter++;
}

function stopAction() {
	if (listc == "1") {
		listc = "2";
		counter = 0;
		continueAction();
	}
	else {
	stopRecording();
	prestext.innerHTML = '<ol id="recordingsList"></ol>';
	}
}

function continueAction() {
	if (listc == "1") {
		startRecording();
	}
	change();
	inst = setInterval(change, 1000);
}

function breakPoint() {
	prestext.innerHTML = "<stimPres>" +
		"RECALL" +
		"</stimPres>" +
		"<body>" +
		"Press END RECORDING when finished" +
		"</body>" +
		'<button id="endButton">END RECORDING</button>';
	endButton = document.getElementById("endButton");
	endButton.addEventListener("click", stopAction);
}

function startRecording(state) {
	console.log("recordButton clicked");

	/*
		Simple constraints object, for more advanced audio features see
		https://addpipe.com/blog/audio-constraints-getusermedia/
	*/
    
    var constraints = { audio: true, video:false }

	/*
    	We're using the standard promise based getUserMedia() 
    	https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
	*/

	navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
		console.log("getUserMedia() success, stream created, initializing Recorder.js ...");

		/*
			create an audio context after getUserMedia is called
			sampleRate might change after getUserMedia is called, like it does on macOS when recording through AirPods
			the sampleRate defaults to the one set in your OS for your playback device

		*/
		audioContext = new AudioContext();

		/*  assign to gumStream for later use  */
		gumStream = stream;
		
		/* use the stream */
		input = audioContext.createMediaStreamSource(stream);

		/* 
			Create the Recorder object and configure to record mono sound (1 channel)
			Recording 2 channels  will double the file size
		*/
		rec = new Recorder(input,{numChannels:1})

		//start the recording process
		rec.record()

		console.log("Recording started");

	}).catch(function(err) {
	  	prestext.innerHTML = "<body>" +
		"Error, mic permission denied" +
		"</body>";
	});
}

function stopRecording(state) {
	console.log("stopButton clicked");
	
	//tell the recorder to stop the recording
	rec.stop();

	//stop microphone access
	gumStream.getAudioTracks()[0].stop();

	if (state != "test") {
		//create the wav blob and pass it on to createDownloadLink
		rec.exportWAV(createDownloadLink);
	}
}

function createDownloadLink(blob) {
	
	var url = URL.createObjectURL(blob);
	var au = document.createElement('audio');
	var li = document.createElement('li');
	var link = document.createElement('a');

	//name of .wav file to use during upload and download (without extendion)
	var filename = new Date().toISOString();

	//add controls to the <audio> element
	au.controls = true;
	au.src = url;

	//save to disk link
	link.href = url;
	link.download = filename+".wav"; //download forces the browser to donwload the file using the  filename
	link.innerHTML = "Save to disk";

	//add the new audio element to li
	li.appendChild(au);
	
	//add the filename to the li
	li.appendChild(document.createTextNode(filename+".wav "))

	//add the save to disk link to li
	li.appendChild(link);
	
	// upload link
	// var upload = document.createElement('a');
	// upload.href="#";
	// upload.innerHTML = "Upload";
	// upload.addEventListener("click", function(event){
	// 	  var xhr=new XMLHttpRequest();
	// 	  xhr.onload=function(e) {
	// 	      if(this.readyState === 4) {
	// 	          console.log("Server returned: ",e.target.responseText);
	// 	      }
	// 	  };
	// 	  var fd=new FormData();
	// 	  fd.append("audio_data",blob, filename);
	// 	  xhr.open("POST","upload.php",true);
	// 	  xhr.send(fd);
	// })
	// li.appendChild(document.createTextNode (" "))//add a space in between
	// li.appendChild(upload)//add the upload link to li

	//add the li element to the ol
	recordingsList.appendChild(li);
}

startRecording("test");
stopRecording("test");