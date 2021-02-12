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
var mysetup = JSON.parse(localStorage.getItem('mysetup'));
var nextscreen = "instructions";

continueButton.addEventListener("click", continueAction);

function instructions(text) {
	prestext.innerHTML = "<stimPres>" +
		text +
		"</stimPres>" +
		'<div id="controls">' +
  	 	'<button id="continueButton">Continue</button>' +
    	'</div>';
    var continueButton = document.getElementById("continueButton");
    continueButton.addEventListener("click", continueAction);
	nextscreen = "trial";
}

function runFixation() {
	prestext.innerHTML = "<fixation>" +
		"+" +
		"</fixation>";
	nextscreen = setTimeout(runCS, 1000*mysetup[listc-1]["iti_duration"])
}

function runCS() {
	trialtext = JSON.stringify(mysetup[listc-1])
	prestext.innerHTML = "<body>" +
		trialtext +
		"</body>" +
		'<div id="controls">' +
		'<button id="continueButton">Continue</button>' +
		'</div>';
	var img = document.createElement("img");
	if (mysetup[listc-1]["cs_type"] == "CS-") {
		srcfile = 'CS_NEG.png'
	} else if (mysetup[listc-1]["cs_type"] == "CS+") {
		srcfile = 'CS_POS.png'
	}
	img.src = 'Resources_CONDexp/CS_IMAGES/' + srcfile
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
	if ((mysetup[listc-1]["us_stimulus_name"] == "NA - Habituation") && (nextscreen == "instructions")) {
		instructions(textlist["1"]);
	} else if (mysetup[listc-1]["us_stimulus_name"] == "NA - Habituation" && nextscreen == "trial") {
		runFixation();
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
