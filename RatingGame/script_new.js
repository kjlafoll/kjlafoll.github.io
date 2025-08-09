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
let uaMobile = /android|iphone|ipad|mobile/i.test(navigator.userAgent);
let isMobile = uaMobile || window.innerWidth <= 768;
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

function getParam(name) {
  try {
    const u = new URL(window.location.href);
    return u.searchParams.get(name);
  } catch {
    return null;
  }
}

const cond2 = (getParam("cond2") || "").toLowerCase();
const traitWord = cond2 === "a" ? "attractiveness" : "friendliness";

function getSkParam() {
  const v = (getParam("sk") || getParam("cond") || getParam("condition") || "").toLowerCase();
  if (["l", "left", "low"].includes(v)) return "l";
  if (["r", "right", "high"].includes(v)) return "r";
  return null; // fall back to your default sampling when null
}

const introMessages = [
  "Welcome to the Rating Game!",
  isMobile
    ? `Tap left or right to rate the ${traitWord} of each person. You have 5 seconds to respond.`
    : `Press 'A' for NO or 'L' for YES to rate the ${traitWord} of each person. You have 5 seconds to respond.`,
  "Press Start to complete a short practice before the main task."
];

let introStep = 0;

/** ------------------ SETUP ------------------ */
document.addEventListener("DOMContentLoaded", function () {
  adjustForMobile();
  window.addEventListener("resize", adjustForMobile);

  const pidFromURL = getParam("pid") || getParam("PROLIFIC_PID") || getParam("workerId");
  participantID = (pidFromURL || "").trim();

  document.getElementById("introText").textContent = introMessages[introStep];
  document.getElementById("startButton").addEventListener("click", handleIntroSteps);
  const promptEl = document.getElementById("stimulusPrompt");
  if (promptEl) {
    promptEl.textContent = cond2 === "a" ? "Attractive?" : "Friendly?";
  }

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
      document.getElementById("startButton").textContent = "Start";
    }
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

  // (optional) keep local download:
  const blob = new Blob([dataStr], { type: "application/json" });
  const url_local = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url_local;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  // 🔁 NEW: send results to Qualtrics parent (the survey page)
  try {
    window.parent.postMessage(
      {
        type: "RG_DONE",
        payload: {
          participantID,
          results // array of trial objects
        }
      },
      "*" // you can harden this: replace "*" with your Qualtrics domain origin
    );
    statusText.textContent = "Uploaded to Qualtrics. Thanks!";
  } catch (e) {
    console.error("postMessage failed:", e);
    alert("Could not send data to Qualtrics. Please contact the researcher.");
  }
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
  const targetStereotype = cond2 === "a" ? "Attractiveness" : "Friendliness";

  // Filter for Friendliness rows and build ratingMap
  data.forEach(row => {
    const stereotype = row["stereotype"]?.trim();
    const targetId = row["target_id"]?.trim();
    const rating = parseFloat(row["rating"]);
    if (stereotype === targetStereotype && !isNaN(rating)) {
      const paddedId = targetId.padStart(4, '0');  // Pad with zeros
      ratingMap[`${paddedId}.png`] = rating;
    }
  });

  const skewParam = getSkParam();
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

