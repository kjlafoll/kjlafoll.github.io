//webkitURL is deprecated but nevertheless
URL = window.URL || window.webkitURL;

var textlist = {
	1: 'You will now see four simple shapes. </br>' +
	'Please attend to all shapes presented.',
	2: 'For the next 20 trials, you will see shapes and pictures. Your job is to press the SPACEBAR when you see the picture. </br>' +
	'A few moments after you respond, the picture will disappear. </br>' +
	'Try not to press the SPACEBAR when the picture is not present. If you make too many false starts, you will not be able to participate </br>' +
	'Please attend to all images presented.',
	3: 'You will now play through a training period where you will learn the sequences and color cues. This training period will be followed by a testing period, during which you can earn cash bonuses. Please now focus on the task at hand; the task will start as soon as you press the Continue button. Good luck!'
}

var listc = 1
var inst;
var img;

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
	nextscreen = setTimeout(runCS, 1000*mysetup[listc-1]["iti_duration"]);
}

function runCS() {
	trialtext = JSON.stringify(mysetup[listc-1]);
	if (mysetup[listc-1]["cs_type"] == "CS-") {
		srcfile = '<image src=' + '"Resources_CONDexp/CS_IMAGES/CS_NEG.png"' +
			' style="width:12.5vw;margin-top:-20%;margin-left:-6.25%"' + '>';
	} else if (mysetup[listc-1]["cs_type"] == "CS+") {
		srcfile = '<image src=' + '"Resources_CONDexp/CS_IMAGES/CS_POS.png"' +
			' style="width:12.5vw;margin-top:-20%;margin-left:-6.25%"' + '>';
	}
	prestext.innerHTML = "<body>" +
		trialtext +
		"</body>" +
		srcfile;
	if (mysetup[listc-1]["overlap"] == "True") {
		duration = mysetup[listc-1]["cs_duration"] - mysetup[listc-1]["us_duration"];
	} else {
		duration = mysetup[listc-1]["cs_duration"];
	}
	nextscreen = setTimeout(runUS, 1000*duration);
	document.addEventListener('keyup', event => {
		if (event.code === 'Space') {
			console.log('Space pressed')
		}
	})
}

function runTI() {
	trialtext = JSON.stringify(mysetup[listc-1]);
	prestext.innerHTML = "<body>" +
		trialtext +
		"</body>";
	nextscreen = setTimeout(runUS, 1000*mysetup[listc-1]["traceinterval_duration"]);
}

function runUS() {
	usexist = "True"
	trialtext = JSON.stringify(mysetup[listc-1]);
	if ((mysetup[listc-1]["cs_type"] == "CS+") && (mysetup[listc-1]["reinforced"] == "True")) {
		srcfile = '<image src=' + '"Resources_CONDexp/US_PRESENT_IMAGES/' +
		mysetup[listc-1]["us_stimulus_name"] + '" style="width:40vw;margin-top:7.5%;margin-left:-12.5%"' + '>';
	} else if ((mysetup[listc-1]["cs_type"] == "CS-") && (mysetup[listc-1]["reinforced"] == "True")) {
		srcfile = '<image src=' + '"Resources_CONDexp/US_ABSENT_IMAGES/' +
		mysetup[listc-1]["us_stimulus_name"] + '" style="width:40vw;margin-top:7.5%;margin-left:-12.5%"' + '>';
	} else {
		mysetup[listc-1]["us_onset"] = "NA - Habituation";
		mysetup[listc-1]["us_rt"] = "NA - Habituation";
		mysetup[listc-1]["us_offset"] = "NA - Habituation";
		usexist = "False";
	}
	if (usexist == "True") {
		prestext.innerHTML += srcfile;
		duration = mysetup[listc-1]["us_duration"];
		nextscreen = setTimeout(savedata, 1000*duration);
	} else {
		savedata();
	}
}

function savedata() {
	listc++;
	if ((mysetup[listc-1]["us_duration"] != "NA - Habituation") && (mysetup[listc-2]["us_duration"] == "NA - Habituation")) {
		nextscreen = "instructions";
		instructions(textlist["2"]);
	} else {
		runFixation();
	}
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
	} else if ((mysetup[listc-1]["us_stimulus_name"] != "NA - Habituation") && (nextscreen == "trial")) {
		runFixation();
	} else if ((mysetup[listc-1]["us_stimulus_name"] == "NA - Habituation") && (nextscreen == "trial")) {
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
