//webkitURL is deprecated but nevertheless
URL = window.URL || window.webkitURL;

var textlist = {
	1: 'You will now see four shapes. Please attend to all images presented.',
	2: 'There will be a total of three (3) sequences to learn. Each of these sequences are eight (8) rings in length, and are composed of a combination of all eight (8) rings. Each sequence will also be associated with a color cue. At the start of each trial, you will be shown either a blue, red, or grey square. Your job is to learn which cue is associated with which sequence. The color cues will help you prepare your pathing. You will perform better by learning the color cues.',
	3: 'You will now play through a training period where you will learn the sequences and color cues. This training period will be followed by a testing period, during which you can earn cash bonuses. Please now focus on the task at hand; the task will start as soon as you press the Continue button. Good luck!'
}

var listc = 1
var inst;

var continueButton = document.getElementById("continueButton");
var prestext = document.getElementById("screen");
var endButton;

continueButton.addEventListener("click", continueAction);

function instructions() {
	var checkers = JSON.parse(localStorage.getItem('mysetup'))
	insttext = JSON.stringify(checkers[listc-1])
	// insttext = textlist[listc]
	prestext.innerHTML = "<body>" +
		insttext +
		"</body>" +
		'<div id="controls">' +
  	 	'<button id="continueButton">Continue</button>' +
    	'</div>';
    var continueButton = document.getElementById("continueButton");
    continueButton.addEventListener("click", continueAction);
	listc++; 
}

function trial() {
	var s = document.createElement("script");
	s.type = "text/javascript";
	s.innerHTML = 'document.body.style.cursor = "none"'
	$("head").append(s);
	prestext.innerHTML = '<span id="circle" class="circle">' +
		'</span>';
}

function stopAction() {
	if (listc == 1) {
		listc = 2;
		continueAction();
	}
	else {
	stopRecording();
	prestext.innerHTML = '<ol id="recordingsList"></ol>';
	}
}

function continueAction() {
	// if (listc == 1 || listc == 2 || listc == 3) {
	// 	instructions();
	if (listc <=14){
		instructions();
	} else if (listc > 14) {
		// trial();
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