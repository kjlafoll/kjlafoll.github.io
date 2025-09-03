// Family Decision Game — Qualtrics-integrated (no survey popups, no REDCap)

let trials = [];
let practiceTrials = [];
let mainTrials = [];
let currentTrialIndex = 0;
let results = [];
let requeueTrials = [];
let startTime;
let participantID = "";
let trialTimeout;
let inPractice = true;
let popupActive = true;
let trialActive = false;

// --- Input mode detection (robust in iframes) ---
const isTouch =
  (window.matchMedia && window.matchMedia("(hover: none) and (pointer: coarse)").matches) ||
  "ontouchstart" in window ||
  navigator.maxTouchPoints > 0;
let isMobile = isTouch;

function applyInputModeClasses() {
  document.body.classList.toggle("mobile", isMobile);
  document.body.classList.toggle("desktop", !isMobile);
}

// --- UI elements ---
const optionA = document.getElementById("optionA");
const optionB = document.getElementById("optionB");
const statusText = document.getElementById("status");
const orLabel = document.getElementById("orLabel");

// --- intro (no PID prompt; no questionnaires) ---
const introMessages = [
  "Welcome to the Family Decision Game!",
  isMobile
    ? "You must respond within 20 seconds on each trial. On a mobile device, tap the option you prefer. Please choose as quickly and as accurately as possible."
    : "You must respond within 20 seconds on each trial. On a computer, press the A key for LEFT and the L key for RIGHT. Please choose as quickly and as accurately as possible.",
  "Press Start to complete a short practice before the main task."
];
let introStep = 0;

// --- util ---
function getParam(name) {
  try { return new URL(window.location.href).searchParams.get(name); } catch { return null; }
}

document.addEventListener("DOMContentLoaded", function () {
  applyInputModeClasses();
  adjustForMobile();
  window.addEventListener("resize", adjustForMobile);
  const numberButtons = document.getElementById("popupButtons");
  if (numberButtons) numberButtons.style.display = "none";

  // Pull PID from URL (Prolific)
  const pidFromURL = getParam("pid") || getParam("PROLIFIC_PID") || getParam("workerId");
  participantID = (pidFromURL || "").trim();

  // Intro
  document.getElementById("introText").textContent = introMessages[introStep];
  document.getElementById("startButton").addEventListener("click", handleIntroSteps);

  // Space-to-continue only when a popup/overlay is visible
  document.addEventListener("keydown", (e) => {
    if (!popupActive) return;
    const activeInput = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName || "");
    if (activeInput) return;
    if (e.code === "Space") {
      e.preventDefault();
      const instr = document.getElementById("instructionOverlay");
      const pop = document.getElementById("popupOverlay");
      if (instr && instr.style.display !== "none") document.getElementById("startButton").click();
      if (pop && pop.style.display !== "none") document.getElementById("popupContinue").click();
    }
  });

  // Choice handlers
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

  // Load trials
  fetch('trials.csv')
    .then(resp => resp.text())
    .then(text => {
      const data = Papa.parse(text, { header: true }).data;
      const allTrials = data.filter(row => row.ImmediateAmount && row.DelayedAmount);
      const realTrials = allTrials.filter(row => row.AttentionCheck != "1");
      const attentionTrials = allTrials.filter(row => row.AttentionCheck == "1");

      shuffleArray(realTrials);
      shuffleArray(attentionTrials);

      practiceTrials = realTrials.slice(0, 8);
      mainTrials = realTrials.slice(8, 65).concat(attentionTrials); // change to 108 for full
      shuffleArray(mainTrials);

      trials = practiceTrials; // start with practice
    });
});

function adjustForMobile() {
  const width = window.innerWidth, height = window.innerHeight;
  if (width <= 768) {
    document.body.classList.add("mobile"); document.body.classList.remove("desktop");
    [optionA, optionB].forEach(box => {
      box.style.height = Math.floor(height * 0.18) + "px";
      box.style.fontSize = Math.max(12, Math.min(width * 0.04, height * 0.04)) + "px";
    });
  } else {
    document.body.classList.add("desktop"); document.body.classList.remove("mobile");
    [optionA, optionB].forEach(box => {
      box.style.width = "220px";
      box.style.height = Math.floor(height * 0.25) + "px";
      box.style.fontSize = "1.2em";
    });
  }
}

/** ---------------- INTRO STEPS (no PID prompt) ---------------- */
function handleIntroSteps() {
  if (introStep < introMessages.length - 1) {
    introStep++;
    document.getElementById("introText").textContent = introMessages[introStep];
    if (introStep === introMessages.length - 1) {
      document.getElementById("startButton").textContent = "Start";
    }
    return;
  }
  // Hide instructions and begin practice
  const instr = document.getElementById("instructionOverlay");
  if (instr) instr.style.display = "none";
  popupActive = false;
  startPractice();
}

/* ------------------------ TRIAL FLOW ------------------------ */

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
  const kA = document.getElementById("keyLabelA");
  const kB = document.getElementById("keyLabelB");
  if (kA && kB) {
    kA.style.visibility = "hidden";
    kB.style.visibility = "hidden";
  }

  orLabel.textContent = "+";
  orLabel.classList.add("cross-visible");

  setTimeout(() => {
    optionA.classList.remove("hidden-transparent");
    optionB.classList.remove("hidden-transparent");
    orLabel.textContent = "OR";
    orLabel.classList.remove("cross-visible");
    if (!isMobile && kA && kB) {
      kA.style.visibility = "visible";
      kB.style.visibility = "visible";
    }
    startTrial();
  }, 1000);
}

function startTrial() {
  orLabel.textContent = "OR";
  orLabel.classList.remove("cross-visible");

  if (currentTrialIndex >= trials.length) {
    if (inPractice) {
      popupActive = true;
      showPopup("Practice complete! Press SPACE or tap Continue to start the real game. You will now make 55 decisions for your family.", () => {
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
  const immText = trial.ImmediateDelay == 0 ? "right now" : `in ${trial.ImmediateDelay} ${trial.ImmediateDelay === 1 ? "day" : "days"}`;
  const delText = trial.DelayedDelay == 0 ? "right now" : `in ${trial.DelayedDelay} ${trial.DelayedDelay === 1 ? "day" : "days"}`;

  optionA.style.border = "2px solid #000";
  optionB.style.border = "2px solid #000";

  if (trial.NowOnLeft == "1") {
    optionA.textContent = `Your family receives $${trial.ImmediateAmount} ${immText}`;
    optionB.textContent = `Your family receives $${trial.DelayedAmount} ${delText}`;
    optionA.dataset.choice = "A";
    optionB.dataset.choice = "B";
  } else {
    optionA.textContent = `Your family receives $${trial.DelayedAmount} ${delText}`;
    optionB.textContent = `Your family receives $${trial.ImmediateAmount} ${immText}`;
    optionA.dataset.choice = "B";
    optionB.dataset.choice = "A";
  }

  statusText.textContent = isMobile
    ? "Tap to make your choice!"
    : "Make your choice! (Press 'A' for LEFT or 'L' for RIGHT)";

  trialActive = true;
  startTime = Date.now();

  clearTimeout(trialTimeout);
  trialTimeout = setTimeout(() => handleLapse(trial), 20000);
}

function handleKeyChoice(event) {
  if (popupActive || !trialActive) return;
  const k = event.key.toLowerCase();
  if (k === 'a') handleChoice(optionA.dataset.choice);
  if (k === 'l') handleChoice(optionB.dataset.choice);
}

function handleChoice(choice) {
  if (popupActive || !trialActive) return;
  trialActive = false;

  const rt = Date.now() - startTime;
  clearTimeout(trialTimeout);
  const trial = trials[currentTrialIndex];

  // simple attention scoring, kept from your original
  const correctChoice =
    (trial.ImmediateAmount > trial.DelayedAmount && trial.ImmediateDelay <= trial.DelayedDelay) ? "A" :
    (trial.DelayedAmount > trial.ImmediateAmount && trial.DelayedDelay <= trial.ImmediateDelay) ? (trial.NowOnLeft == "1" ? "B" : "A") :
    null;

  if (optionA.dataset.choice === choice) optionA.style.border = "4px solid green";
  if (optionB.dataset.choice === choice) optionB.style.border = "4px solid green";

  // false start definition unchanged (<150ms)
  const isFalseStart = rt < 150;

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
      AttentionCheck: trial.AttentionCheck || 0,
      PassedAttention: (trial.AttentionCheck == "1" && choice === correctChoice) ? 1 : (trial.AttentionCheck == "1" ? 0 : null),
      startTimeAbsolute: new Date(startTime).toISOString(),
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
  showPopup("Too slow! You have 20 seconds to respond. Press SPACE or tap Continue to move on.", () => {
    popupActive = false;
    if (!inPractice) requeueTrials.push(trial);
    currentTrialIndex++;
    setTimeout(showFixationCross, 500);
  });
}

// --- simple popup used for practice-complete & lapses ---
function showPopup(message, callback) {
  popupActive = true;
  trialActive = false;
  const popup = document.getElementById("popupOverlay");
  const msgEl = document.getElementById("popupMessage");
  const btn = document.getElementById("popupContinue");
  const numberButtons = document.getElementById("popupButtons");
  if (numberButtons) numberButtons.style.display = "none"
  msgEl.textContent = message;
  popup.style.display = "flex";
  btn.onclick = () => {
    popup.style.display = "none";
    popupActive = false;
    callback();
  };
}

function showWarning(message) {
  statusText.textContent = message;
}

// ---------------- END: send to Qualtrics ----------------
let __RG_DONE_SENT__ = false;
function sendRGDoneOnce(payload) {
  if (__RG_DONE_SENT__) return;
  __RG_DONE_SENT__ = true;
  try {
    window.parent.postMessage({ type: "RG_DONE", payload }, "*"); // parent filters origin
  } catch (e) {
    console.error("postMessage failed:", e);
  }
}

function endGame() {
  statusText.textContent = "All trials completed! Saving data...";

  // Build a compact summary in addition to the raw results
  const nTrials = results.length;
  const nLapses = results.filter(r => r.lapse).length;
  const rts = results.filter(r => !r.lapse && typeof r.rt === "number").map(r => r.rt);
  const meanRT = rts.length ? Math.round(rts.reduce((a,b)=>a+b,0)/rts.length) : null;
  const nAttention = results.filter(r => String(r.AttentionCheck) === "1").length;
  const nAttentionPassed = results.filter(r => String(r.AttentionCheck) === "1" && r.PassedAttention === 1).length;

  const payload = {
    task: "family_delay_discounting",
    participantID,
    results, // full per-trial rows
    summary: {
      nTrials, nLapses, nAttention, nAttentionPassed
    }
  };

  sendRGDoneOnce(payload);
}

/* ---------------- util ---------------- */
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
