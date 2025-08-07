// Rating Game: JS file

let trials = [];
let practiceTrials = [];
let mainTrials = [];
let currentTrialIndex = 0;
let results = [];
let requeueTrials = [];
let startTime;
let participantID = "";
let trialTimeout;
let isMobile = /android|iphone|ipad|mobile/i.test(navigator.userAgent);
let inPractice = true;
let popupActive = true;
let trialActive = false;

const optionWarm = document.getElementById("warmButton");
const optionCold = document.getElementById("coldButton");
const statusText = document.getElementById("status");
const fixation = document.getElementById("fixation");
const stimulusImage = document.getElementById("stimulusImage");

const allImageFilenames = Array.from({ length: 1000 }, (_, i) => `${(i + 1).toString().padStart(4, '0')}.png`);
shuffleArray(allImageFilenames);
practiceTrials = allImageFilenames.slice(0, 8);
mainTrials = allImageFilenames.slice(8, 108);
trials = practiceTrials;

const introMessages = [
  "Welcome to the Rating Game!",
  isMobile
    ? "Tap the left or right side of the screen to rate each face as 'Cold' or 'Warm'. You have 5 seconds to respond."
    : "Press 'A' for COLD or 'L' for WARM to rate each face. You have 5 seconds to respond.",
  "Please enter your Participant ID below."
];

let introStep = 0;

/** ------------------ SETUP ------------------ */
document.addEventListener("DOMContentLoaded", function () {
  adjustForMobile();
  window.addEventListener("resize", adjustForMobile);

  document.getElementById("introText").textContent = introMessages[introStep];
  document.getElementById("startButton").addEventListener("click", handleIntroSteps);

  document.addEventListener("keydown", (e) => {
    if (popupActive && e.code === "Space" && document.getElementById("popupOverlay").style.display !== "none" && !isMobile) {
      e.preventDefault();
      document.getElementById("popupContinue").click();
    }
    if (popupActive && e.code === "Space" && document.getElementById("instructionOverlay").style.display !== "none") {
      e.preventDefault();
      document.getElementById("startButton").click();
    }
  });

  if (!isMobile) {
    document.addEventListener("keydown", handleKeyChoice);
  } else {
    document.addEventListener("touchstart", handleMobileTouch);
  }
});

function adjustForMobile() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  if (width <= 768) {
    document.body.classList.add("mobile");
    document.body.classList.remove("desktop");
  } else {
    document.body.classList.add("desktop");
    document.body.classList.remove("mobile");
  }
}

function handleIntroSteps() {
  if (introStep < introMessages.length - 1) {
    introStep++;
    document.getElementById("introText").textContent = introMessages[introStep];
    if (introStep === introMessages.length - 1) {
      document.getElementById("participantFields").style.display = "block";
      document.getElementById("startButton").textContent = "Start";
    }
    return;
  }

  participantID = document.getElementById("participantID").value.trim();
  if (!participantID) {
    alert("Please enter a valid Participant ID.");
    return;
  }

  document.getElementById("instructionOverlay").style.display = "none";
  popupActive = false;
  startPractice();
}

function startPractice() {
  inPractice = true;
  trials = practiceTrials;
  currentTrialIndex = 0;
  showFixationCross();
}

function startMainGame() {
  inPractice = false;
  trials = mainTrials;
  currentTrialIndex = 0;
  showFixationCross();
}

function showFixationCross() {
  trialActive = false;
  statusText.textContent = "";
  stimulusImage.style.display = "none";
  fixation.style.display = "block";

  setTimeout(() => {
    fixation.style.display = "none";
    stimulusImage.style.display = "block";
    startTrial();
  }, 1000);
}

function startTrial() {
  const trial = trials[currentTrialIndex];
  const imagePath = `Faces/${trial}`;
  stimulusImage.src = imagePath;
  trialActive = true;
  startTime = new Date().getTime();
  clearTimeout(trialTimeout);
  trialTimeout = setTimeout(() => handleLapse(trial), 5000);
}

function handleKeyChoice(event) {
  if (popupActive || !trialActive) return;
  if (event.key.toLowerCase() === 'a') handleChoice("Cold");
  if (event.key.toLowerCase() === 'l') handleChoice("Warm");
}

function handleMobileTouch(event) {
  if (popupActive || !trialActive) return;
  const x = event.touches[0].clientX;
  const screenWidth = window.innerWidth;
  if (x < screenWidth / 2) {
    handleChoice("Cold");
  } else {
    handleChoice("Warm");
  }
}

function handleChoice(choice) {
  if (popupActive || !trialActive) return;
  trialActive = false;
  const rt = new Date().getTime() - startTime;
  clearTimeout(trialTimeout);
  const trial = trials[currentTrialIndex];

  if (!inPractice) {
    results.push({
      participantID,
      trialNumber: results.length + 1,
      image: trial,
      choice,
      rt,
      lapse: false,
      startTimeAbsolute: new Date(startTime).toISOString(),
      endTimeAbsolute: new Date().toISOString()
    });
  }

  currentTrialIndex++;
  if (currentTrialIndex >= trials.length) {
    if (inPractice) {
      popupActive = true;
      showPopup("Practice complete!" + (isMobile ? " Tap Continue to start the real game." : " Press SPACE or tap Continue to start the real game."), () => {
        popupActive = false;
        startMainGame();
      });
    } else {
      endGame();
    }
  } else {
    showFixationCross();
  }
}

function handleLapse(trial) {
  popupActive = true;
  trialActive = false;
  if (!inPractice) {
    results.push({
      participantID,
      trialNumber: results.length + 1,
      image: trial,
      choice: null,
      rt: null,
      lapse: true,
      startTimeAbsolute: new Date(startTime).toISOString(),
      endTimeAbsolute: new Date().toISOString()
    });
  }
  showPopup("Too slow! You have 5 seconds to respond." + (isMobile ? " Tap Continue." : " Press SPACE or tap Continue."), () => {
    popupActive = false;
    currentTrialIndex++;
    showFixationCross();
  });
}

function showPopup(message, callback) {
  popupActive = true;
  const popup = document.getElementById("popupOverlay");
  document.getElementById("popupMessage").textContent = message;
  popup.style.display = "flex";

  const btn = document.getElementById("popupContinue");
  btn.onclick = () => {
    popup.style.display = "none";
    popupActive = false;
    callback();
  };
}

async function endGame() {
  statusText.textContent = "All trials completed! Saving data...";
  const filename = `rating_game_${participantID}.json`;
  const dataStr = JSON.stringify(results, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url_local = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url_local;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  await sendToRedCap(results, filename);
}

async function sendToRedCap(dataArray, filename) {
  const url = 'https://redcap.case.edu/api/';
  const timestamp = Date.now().toString();
  const fileContent = JSON.stringify(dataArray);

  const dataDict = { "record_id": timestamp };
  const body = {
    method: 'POST',
    token: '2C941E2CCA757DF649E150366AD3904E',
    content: 'record',
    format: 'json',
    type: 'flat',
    overwriteBehavior: 'normal',
    forceAutoNumber: 'false',
    data: JSON.stringify([dataDict]),
    returnContent: 'count',
    returnFormat: 'json'
  };

  $.post(url, body);
  await delay(700);

  const file = new File([fileContent], filename, { type: "application/json" });
  const formData = new FormData();
  formData.append('token', '2C941E2CCA757DF649E150366AD3904E');
  formData.append('content', 'file');
  formData.append('action', 'import');
  formData.append('field', 'prt_data_json');
  formData.append("overwriteBehavior", "normal");
  formData.append('record', timestamp);
  formData.append('file', file);

  $.ajax({ url, type: 'POST', data: formData, contentType: false, processData: false });
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}