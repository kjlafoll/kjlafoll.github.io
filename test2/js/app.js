//webkitURL is deprecated but nevertheless
URL = window.URL || window.webkitURL;

var textlist = {
	"1": ["dog", "cat", "mouse", "snake", "bird", "snail"],
	"2": ["car", "boat", "truck", "train", "raft", "plane"]
}
var listc = "1"
var counter = 0;
var inst;

var continueButton = document.getElementById("continueButton");
var prestext = document.getElementById("screen");
var endButton;

continueButton.addEventListener("click", continueAction);

function instructions() {
	// list = textlist[listc]
	// prestext.innerHTML = "<stimPres>" +
	// 	list[counter] +
	// 	"</stimPres>";
	var s = document.createElement("script");
	s.type = "text/javascript";
	s.innerHTML = 'document.body.style.cursor = "none"'
	$("head").append(s);
	prestext.innerHTML = '<span id="circle" class="circle">' +
		'</span>';
	prestext.innerHTML += '<image src=' + '"Flanker Task Instructions.pdf"' +
	' style="height:12.5vh;margin-top:-15vh"' + '>';
	// if (counter == list.length) {
	// 	clearInterval(inst);
	// 	breakPoint();
	// }
	// counter++;
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
		instructions();
	}
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

jQuery(document).ready(function() {
  var mouseX = 0, mouseY = 0;
  var xp = 0, yp = 0;  
  $(document).mousemove(function(e){
    mouseX = e.pageX - 30;
    mouseY = e.pageY - 30; 
  });   
  setInterval(function(){
    xp += ((mouseX - xp)/1);
    yp += ((mouseY - yp)/1);
    $("#circle").css({left: xp +'px', top: yp +'px'});
  }, 20);
});

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