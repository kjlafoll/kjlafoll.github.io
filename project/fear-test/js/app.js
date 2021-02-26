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

userid = Math.random().toString(36).substr(2, 9);
today = new Date();
userdate = today.getFullYear() + "-" + today.getMonth() + "-" +
	today.getDate() + "-" + today.getHours() + "-" + today.getMinutes() + "-" +
	today.getSeconds();

var listc = 1;
var inst;
var img;
var action = "False";
var clickAction = "False";
var startTime; var endTime; var usTime;
var fslist = [];
var rtlist = [];

var mysetup = JSON.parse(localStorage.getItem('mysetup'));
var continueButton = document.getElementById("continueButton");
var prestext = document.getElementById("screen");
var endButton;
var nextscreen = "instructions";

continueButton.addEventListener("click", continueAction);

document.addEventListener('keyup', event => {
	if (event.code === 'Space') {
		endTime = new Date();
		if (action == "True") {
			rtlist.push(endTime - usTime);
			clearTimeout(nextscreen);
			duration = 0.2;
			postus = setTimeout(runFeedback, 1000*duration);
		} else {
			fslist.push(endTime - startTime);
		}
	}
})

document.addEventListener('click', event => {
	if (clickAction == "True") {
		endTime = new Date();
		if (action == "True") {
			rtlist.push(endTime - usTime);
			clearTimeout(nextscreen);
			duration = 0.2;
			postus = setTimeout(runFeedback, 1000*duration);
		} else {
			fslist.push(endTime - startTime);
		}
	}
})

function instructions(text) {
	redcap();
	clickAction = "False";
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
	clickAction = "True";
	prestext.innerHTML = "<fixation>" +
		"+" +
		"</fixation>";
	nextscreen = setTimeout(runCS, 1000*mysetup[listc-1]["iti_duration"]);
}

function runCS() {
	endTime = new Date();
	mysetup[listc-1]['cs_onset'] = endTime - startTime;
	if (mysetup[listc-1]["cs_type"] == "CS-") {
		srcfile = '<image src=' + '"Resources_CONDexp/CS_IMAGES/CS_NEG.png"' +
			' style="height:12.5vh;margin-top:-15vh"' + '>';
	} else if (mysetup[listc-1]["cs_type"] == "CS+") {
		srcfile = '<image src=' + '"Resources_CONDexp/CS_IMAGES/CS_POS.png"' +
			' style="height:12.5vh;margin-top:-15vh"' + '>';
	}
	prestext.innerHTML = srcfile;
	if (mysetup[listc-1]["overlap"] == "True") {
		duration = mysetup[listc-1]["cs_duration"] - mysetup[listc-1]["us_duration"];
	} else {
		duration = mysetup[listc-1]["cs_duration"];
	}
	nextscreen = setTimeout(runUS, 1000*duration);
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
	action = "True"
	usTime = new Date();
	mysetup[listc-1]['us_onset'] = usTime - startTime;
	if ((mysetup[listc-1]["cs_type"] == "CS+") && (mysetup[listc-1]["reinforced"] == "True")) {
		srcfile = '<image src=' + '"Resources_CONDexp/US_PRESENT_IMAGES/' +
		mysetup[listc-1]["us_stimulus_name"] + '" style="height:40vh;margin-top:15vh"' + '>';
	} else if ((mysetup[listc-1]["cs_type"] == "CS-") && (mysetup[listc-1]["reinforced"] == "True")) {
		srcfile = '<image src=' + '"Resources_CONDexp/US_ABSENT_IMAGES/' +
		mysetup[listc-1]["us_stimulus_name"] + '" style="height:40vh;margin-top:15vh"' + '>';
	} else {
		mysetup[listc-1]["us_onset"] = "NA - Habituation";
		mysetup[listc-1]["us_rt"] = "NA - Habituation";
		mysetup[listc-1]["us_offset"] = "NA - Habituation";
		usexist = "False";
	}
	if (usexist == "True") {
		prestext.innerHTML += srcfile;
		duration = mysetup[listc-1]["us_duration"];
		nextscreen = setTimeout(runFeedback, 1000*duration);
	} else {
		savedata();
	}
}

function runFeedback() {
	if (rtlist.length == 1) {
		text = "GOOD";
	} else {
		text = "NO RESPONSE";
	}
	if (fslist.length != 0) {
		text = text + "</br> FALSE START DETECTED EARLIER";
	}
	prestext.innerHTML = "<stimPres>" +
		"</br> </br> </br> </br> </br>" +
		text +
		"</stimPres>";
	nextscreen = setTimeout(savedata, 1000);
}

function savedata() {
	endTime = new Date();
	if (mysetup[listc-1]['overlap'] == "True") {
		mysetup[listc-1]['cs_offset'] = endTime - startTime;
	}
	mysetup[listc-1]['us_offset'] = endTime - startTime;
	if (rtlist.length == 0) {
		mysetup[listc-1]['us_rt'] = "NR";
	} else {
		mysetup[listc-1]['us_rt'] = rtlist;
	}
	if (fslist.length == 0) {
		mysetup[listc-1]['fs_response_time'] = "NA";
	} else {
		mysetup[listc-1]['fs_response_time'] = fslist;
	}
	rtlist = [];
	fslist = [];
	mysetup[listc-1]['trial'] = listc;
	mysetup[listc-1]['id'] = userid;
	mysetup[listc-1]['date'] = userdate;
	mysetup[listc-1]['useragent'] = navigator.userAgent;
	listc++;
	action = "False";
	redcap();
	post(mysetup);
	if ((mysetup[listc-1]["us_duration"] != "NA - Habituation") && (mysetup[listc-2]["us_duration"] == "NA - Habituation")) {
		nextscreen = "instructions";
		instructions(textlist["2"]);
	} else if (mysetup.length == listc) {
		runEnd();
	} else {
		runFixation();
	}
}

function runEnd() {
	prestext.innerHTML = "<stimPres>" +
		"End OF TASK </br> </br> Please use the unique completion code below to finish the MTurk task." +
		"</br> </br>" + userid +
		"</stimPres>";
}

function continueAction() {
	if (mysetup == null) {
		mysetup = JSON.parse(localStorage.getItem('mysetup'));
	}
	if ((mysetup[listc-1]["us_stimulus_name"] == "NA - Habituation") && (nextscreen == "instructions")) {
		startTime = new Date();
		instructions(textlist["1"]);
	} else if ((mysetup[listc-1]["us_stimulus_name"] != "NA - Habituation") && (nextscreen == "trial")) {
		startTime = new Date();
		runFixation();
	} else if ((mysetup[listc-1]["us_stimulus_name"] == "NA - Habituation") && (nextscreen == "trial")) {
		runFixation();
	}
}

function post(data) {
	$.post("https://kvdb.io/UnUVNhYvkJupGjqZopqh9K/" + userid + "_" + userdate, JSON.stringify(data));
}

function redcap() {
	$.ajax({
		url: 'savedata.php'
	})
}
