// Rating Game: JS file with skewed image sampling

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
let ratingMap = {}; // { '0001.png': 5.32, ... }

const optionWarm = document.getElementById("optionA");
const optionCold = document.getElementById("optionB");
const statusText = document.getElementById("status");
const orLabel = document.getElementById("orLabel");
const stimulusImage = document.getElementById("stimulusImage");
const fixation = document.getElementById("fixation");

const introMessages = [
  "Welcome to the Rating Game!",
  isMobile
    ? "Tap left or right to rate the friendliness of each person. You have 5 seconds to respond."
    : "Press 'A' for NO or 'L' for YES to rate the friendliness of each person. You have 5 seconds to respond.",
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
    if (popupActive && e.code === "Space" && document.getElementById("popupOverlay").style.display !== "none") {
      e.preventDefault();
      document.getElementById("popupContinue").click();
    } else if (popupActive && e.code === "Space" && document.getElementById("instructionOverlay").style.display !== "none") {
      e.preventDefault();
      document.getElementById("startButton").click();
    }
  });

  if (!isMobile) {
    document.addEventListener("keydown", handleKeyChoice);
  } else {
    document.addEventListener("touchstart", handleTouchChoice);
  }

  loadCSV("target_means.csv", processCSVAndStartGame);
});

function adjustForMobile() {
  const width = window.innerWidth;
  document.body.classList.toggle("mobile", width <= 768);
  document.body.classList.toggle("desktop", width > 768);
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
  fixation.style.display = "block";
  stimulusImage.style.display = "none";
  setTimeout(() => {
    fixation.style.display = "none";
    stimulusImage.style.display = "block";
    startTrial();
  }, 1000);
}

function startTrial() {
  const trial = trials[currentTrialIndex];
  stimulusImage.src = `Faces/${trial}`;
  trialActive = true;
  startTime = Date.now();
  clearTimeout(trialTimeout);
  trialTimeout = setTimeout(() => handleLapse(trial), 5000);
}

function handleKeyChoice(e) {
  if (!trialActive || popupActive) return;
  const key = e.key.toLowerCase();
  if (key === 'a') handleChoice("No");
  if (key === 'l') handleChoice("Yes");
}

function handleTouchChoice(e) {
  if (!trialActive || popupActive) return;
  const x = e.touches[0].clientX;
  const choice = x < window.innerWidth / 2 ? "No" : "Yes";
  handleChoice(choice);
}

function handleChoice(choice) {
  trialActive = false;
  clearTimeout(trialTimeout);
  const rt = Date.now() - startTime;
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
      showPopup("Practice complete!", startMainGame);
    } else {
      endGame();
    }
  } else {
    showFixationCross();
  }
}

function handleLapse(trial) {
  trialActive = false;
  popupActive = true;
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
  showPopup("Too slow!", () => {
    popupActive = false;
    currentTrialIndex++;
    showFixationCross();
  });
}

function showPopup(message, callback) {
  popupActive = true;
  document.getElementById("popupMessage").textContent = message;
  document.getElementById("popupOverlay").style.display = "flex";
  document.getElementById("popupContinue").onclick = () => {
    document.getElementById("popupOverlay").style.display = "none";
    popupActive = false;
    callback();
  };
}

async function endGame() {
  statusText.textContent = "All done! Saving data...";
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

function loadCSV(url, callback) {
  Papa.parse(url, {
    download: true,
    header: true,
    complete: function (results) {
      if (!results || !results.data || results.data.length === 0) {
        console.error("❌ PapaParse failed or CSV empty");
        return;
      }
      callback(results.data);
    },
    error: function (err) {
      console.error("❌ Failed to parse CSV with PapaParse:", err);
    }
  });
}

function processCSVAndStartGame(data) {
  console.log("🚀 processCSVAndStartGame triggered");

  // Filter for Friendliness rows and build ratingMap
  data.forEach(row => {
    const stereotype = row["stereotype"]?.trim();
    const targetId = row["target_id"]?.trim();
    const rating = parseFloat(row["rating"]);

    if (stereotype === "Friendliness" && !isNaN(rating)) {
      const paddedId = targetId.padStart(4, '0');  // Pad with zeros
      ratingMap[`${paddedId}.png`] = rating;
    }
  });

  const skewParam = new URLSearchParams(window.location.search).get("sk");
  const all = Object.entries(ratingMap);

  const filtered = skewParam === "l"
    ? all.filter(([_, val]) => Math.random() < Math.pow(val / 7, 3))   // left-skewed
    : skewParam === "r"
      ? all.filter(([_, val]) => Math.random() < Math.pow(1 - val / 7, 3)) // right-skewed
      : all;

  shuffleArray(filtered);
  mainTrials = filtered.slice(0, 100).map(([filename]) => filename);
  const shuffled = [...Object.keys(ratingMap)];
  shuffleArray(shuffled);
  practiceTrials = shuffled.slice(0, 8);

  // ✅ Sanity check
  const sampledMeans = mainTrials.map(img => ratingMap[img]);
  const meanSampledValue = sampledMeans.reduce((acc, val) => acc + val, 0) / sampledMeans.length;
  console.log("✅ Mean friendliness of sampled main images:", meanSampledValue.toFixed(3));
}

