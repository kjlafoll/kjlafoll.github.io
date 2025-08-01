let trials = [];
let practiceTrials = [];
let mainTrials = [];
let currentTrialIndex = 0;
let results = [];
let requeueTrials = [];
let startTime;
let participantID = "";
let preInstructions = "";
let trialTimeout;
let isMobile = /android|iphone|ipad|mobile/i.test(navigator.userAgent);
let inPractice = true;
let introCompleted = false;
let popupActive = true;   // Prevent input during popups
let trialActive = false;  // Prevent input except during active trial

// Intro popup steps
const introMessages = [
  "Welcome to the Delay Discounting Game!\n\nYou will make choices between two monetary rewards on each trial. Some rewards are immediate, others are delayed.",
  "You must respond within 5 seconds on each trial. If you respond too slowly or too quickly (<150ms), the trial will be repeated later.\n\nUse the A and L keys on a computer or tap the left/right boxes on mobile.",
  "Before we begin, please enter your Participant ID and briefly describe how you will make your choices."
];
let introStep = 0;

// DOM references
const optionA = document.getElementById("optionA");
const optionB = document.getElementById("optionB");
const statusText = document.getElementById("status");
const orLabel = document.getElementById("orLabel");

document.addEventListener("DOMContentLoaded", function () {
  adjustForMobile();
  window.addEventListener("resize", adjustForMobile);

  fetch('trials.csv')
    .then(response => response.text())
    .then(text => {
      let data = Papa.parse(text, { header: true }).data;
      trials = data.filter(row => row.ImmediateAmount && row.DelayedAmount);
      shuffleArray(trials);

      // First 8 are practice, rest are main trials
      practiceTrials = trials.slice(0, 8);
      mainTrials = trials.slice(8);
      trials = practiceTrials;
    });

  document.getElementById("introText").textContent = introMessages[introStep];
  document.getElementById("startButton").addEventListener("click", handleIntroSteps);

  // Spacebar listeners for both intro and popup overlays
  document.addEventListener("keydown", (e) => {
    if (popupActive) {
      if (document.getElementById("instructionOverlay").style.display !== "none" && e.code === "Space") {
        e.preventDefault();
        document.getElementById("startButton").click();
      }
      if (document.getElementById("popupOverlay").style.display !== "none" && e.code === "Space") {
        e.preventDefault();
        document.getElementById("popupContinue").click();
      }
    }
  });

  if (!isMobile) {
    document.addEventListener("keydown", handleKeyChoice);
  } else {
    optionA.addEventListener("touchstart", () => {
      if (!popupActive && trialActive) handleChoice(optionA.dataset.choice);
    });
    optionB.addEventListener("touchstart", () => {
      if (!popupActive && trialActive) handleChoice(optionB.dataset.choice);
    });
  }
});

function adjustForMobile() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  if (width <= 768) {
    document.body.classList.add("mobile");
    document.body.classList.remove("desktop");

    [optionA, optionB].forEach(box => {
      box.style.height = Math.floor(height * 0.18) + "px";
      box.style.fontSize = Math.max(12, Math.min(width * 0.04, height * 0.04)) + "px";
    });

    const popupFontSize = Math.max(12, Math.min(width * 0.045, height * 0.025));
    document.querySelectorAll(".instruction-content").forEach(p => {
      p.style.width = Math.floor(width * 0.9) + "px";
      p.style.maxWidth = Math.floor(width * 0.9) + "px";
      p.style.maxHeight = Math.floor(height * 0.8) + "px";
      p.style.fontSize = popupFontSize + "px";
      p.style.overflowY = "auto";
    });
  } else {
    document.body.classList.add("desktop");
    document.body.classList.remove("mobile");
    [optionA, optionB].forEach(box => {
      box.style.width = "220px";
      box.style.height = "150px";
      box.style.fontSize = "1.2em";
    });
    document.querySelectorAll(".instruction-content").forEach(p => {
      p.style.maxWidth = "500px";
      p.style.fontSize = "16px";
    });
  }
}

function handleIntroSteps() {
  if (introStep < introMessages.length - 1) {
    introStep++;
    document.getElementById("introText").textContent = introMessages[introStep];

    if (introStep === introMessages.length - 1) {
      document.getElementById("participantFields").style.display = "block";
      document.getElementById("startButton").textContent = "Start Game";
    }
    return;
  }

  participantID = document.getElementById("participantID").value.trim();
  preInstructions = document.getElementById("instructionsFreeText").value.trim();

  if (!participantID || !preInstructions) {
    alert("Please complete all fields before starting.");
    return;
  }
  introCompleted = true;
  document.getElementById("instructionOverlay").style.display = "none";
  popupActive = true; 
  showPopup("You will begin with 8 practice trials.\nPress SPACE or tap Continue to start.", () => {
    popupActive = false;
    startPractice();
  });
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

  optionA.classList.add("hidden-transparent");
  optionB.classList.add("hidden-transparent");

  orLabel.textContent = "+";
  orLabel.classList.add("cross-visible");

  setTimeout(() => {
    optionA.classList.remove("hidden-transparent");
    optionB.classList.remove("hidden-transparent");
    orLabel.textContent = "OR";
    orLabel.classList.remove("cross-visible");
    startTrial();
  }, 1000);
}

function startTrial() {
  orLabel.textContent = "OR";
  orLabel.classList.remove("cross-visible");

  if (currentTrialIndex >= trials.length) {
    if (inPractice) {
      popupActive = true;
      showPopup("Practice complete! Press SPACE or tap Continue to start the real game.", () => {
        popupActive = false;
        startMainGame();
      });
      return;
    }
    if (requeueTrials.length > 0) {
      trials = [...requeueTrials];
      requeueTrials = [];
      currentTrialIndex = 0;
      shuffleArray(trials);
      showFixationCross();
      return;
    } else {
      endGame();
      return;
    }
  }

  const trial = trials[currentTrialIndex];

  const immText = trial.ImmediateDelay == 0 ? "now" : `in ${trial.ImmediateDelay} days`;
  const delText = trial.DelayedDelay == 0 ? "now" : `in ${trial.DelayedDelay} days`;

  optionA.style.border = "2px solid #000";
  optionB.style.border = "2px solid #000";

  if (trial.NowOnLeft == "1") {
    optionA.textContent = `$${trial.ImmediateAmount} ${immText}`;
    optionB.textContent = `$${trial.DelayedAmount} ${delText}`;
    optionA.dataset.choice = "A";
    optionB.dataset.choice = "B";
  } else {
    optionA.textContent = `$${trial.DelayedAmount} ${delText}`;
    optionB.textContent = `$${trial.ImmediateAmount} ${immText}`;
    optionA.dataset.choice = "B";
    optionB.dataset.choice = "A";
  }

  statusText.textContent = "Make your choice! (A / L or tap)";
  trialActive = true;
  startTime = new Date().getTime();

  clearTimeout(trialTimeout);
  trialTimeout = setTimeout(() => handleLapse(trial), 5000);
}

function handleKeyChoice(event) {
  if (popupActive || !trialActive) return;
  if (event.key.toLowerCase() === 'a') handleChoice(optionA.dataset.choice);
  if (event.key.toLowerCase() === 'l') handleChoice(optionB.dataset.choice);
}

function handleChoice(choice) {
  if (popupActive || !trialActive) return;
  trialActive = false;

  const trialStart = startTime;
  const rt = new Date().getTime() - trialStart;
  clearTimeout(trialTimeout);
  const trial = trials[currentTrialIndex];
  const isFalseStart = rt < 150;

  if (optionA.dataset.choice === choice) {
    optionA.style.border = "4px solid green";
  }
  if (optionB.dataset.choice === choice) {
    optionB.style.border = "4px solid green";
  }

  if (!inPractice && !isFalseStart) {
    results.push({
      participantID,
      trialNumber: results.length + 1,
      choice,
      rt,
      lapse: false,
      false_start: false,
      ImmediateAmount: trial.ImmediateAmount,
      ImmediateDelay: trial.ImmediateDelay,
      DelayedAmount: trial.DelayedAmount,
      DelayedDelay: trial.DelayedDelay,
      NowOnLeft: trial.NowOnLeft,
      PreInstructions: preInstructions,
      startTimeAbsolute: new Date(trialStart).toISOString(),
      endTimeAbsolute: new Date().toISOString()
    });
  }

  if (isFalseStart && !inPractice) {
    showWarning("Too fast! (False Start)");
    requeueTrials.push(trial);
  }

  setTimeout(() => {
    currentTrialIndex++;
    showFixationCross();
  }, 300);
}

function handleLapse(trial) {
  popupActive = true;
  trialActive = false;
  showPopup("Too slow! Press SPACE or tap Continue to move on.", () => {
    popupActive = false;
    if (!inPractice) requeueTrials.push(trial);
    currentTrialIndex++;
    setTimeout(showFixationCross, 500);
  });
}

function showWarning(message) {
  statusText.textContent = message;
}

function showPopup(message, callback) {
  popupActive = true;
  trialActive = false;
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
  const filename = `delay_discounting_${participantID}.json`;
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