// Inheritance Decision Game — Qualtrics-integrated (two-block version)

// ---------------- STATE ----------------
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

let blockIndex = 0; // start with self
const BLOCK_SELF = 0;
const BLOCK_PARTNER = 1;

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

// --- intros ---
// Kept your tone, added minimal scenario framing per block
const introSelf = [
  "Welcome to the Inheritance Decision Game!",
  "Scenario: You have been offered an inheritance. You can take a smaller amount right now, or let a financial advisor invest it and receive a larger amount later.",
  "In this first block, please make decisions for YOURSELF.",
  isMobile
    ? "You must respond within 20 seconds on each trial. On a mobile device, tap the option you prefer. Choose as quickly and accurately as possible."
    : "You must respond within 20 seconds on each trial. On a computer, press A for LEFT and L for RIGHT. Choose as quickly and accurately as possible.",
  "Press Start to complete a short practice before the main task."
];

const introPartner = [
  "Next: Partner Scenario",
  "Imagine you live with an imaginary domestic partner. They have received an inheritance and are deciding whether to take a smaller amount now or let a financial advisor invest it for a larger amount later.",
  "You are unsure about the relationship and have no solid, shared future plans with this partner. Please advise as best you can given this uncertainty.",
  "In this block, please make decisions for YOUR PARTNER.",
  isMobile
    ? "You must respond within 20 seconds on each trial. On a mobile device, tap the option you prefer. Choose as quickly and accurately as possible."
    : "You must respond within 20 seconds on each trial. On a computer, press A for LEFT and L for RIGHT. Choose as quickly and accurately as possible.",
  "Press Start when you are ready to begin."
];

let introStep = 0;
let currentIntro = introSelf;

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

  // Intro (SELF block first)
  setInstructionOverlayVisible(true);
  introStep = 0;
  currentIntro = introSelf;
  document.getElementById("introText").textContent = currentIntro[introStep];
  document.getElementById("startButton").textContent = "Next";
  document.getElementById("startButton").onclick = handleIntroSteps;

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

      practiceTrials = realTrials.slice(0, 3);

      shuffleArray(realTrials);

      // same as before; re-used in both blocks (reshuffled each time)
      mainTrials = realTrials.slice(0, 65).concat(attentionTrials); // change to 108 for full
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

function setInstructionOverlayVisible(visible) {
  const instr = document.getElementById("instructionOverlay");
  if (!instr) return;
  instr.style.display = visible ? "flex" : "none";
  popupActive = visible;
}

/** ---------------- INTRO STEPS ---------------- */
function handleIntroSteps() {
  if (introStep < currentIntro.length - 1) {
    introStep++;
    document.getElementById("introText").textContent = currentIntro[introStep];
    if (introStep === currentIntro.length - 1) {
      document.getElementById("startButton").textContent = "Start";
    }
    return;
  }
  // Hide instructions and begin practice (for Block 1 only)
  setInstructionOverlayVisible(false);
  startPractice();
}

// helper: block label + verb
function targetNoun() { return blockIndex === BLOCK_SELF ? "You" : "Your partner"; }
function receiveVerb() { return blockIndex === BLOCK_SELF ? "receive" : "receives"; }
function decisionTargetTag() { return blockIndex === BLOCK_SELF ? "self" : "partner"; }

/* ------------------------ TRIAL FLOW ------------------------ */

function startPractice() {
  inPractice = true;
  trials = practiceTrials;
  currentTrialIndex = 0;
  showFixationCross();
}

function startMainGame() {
  inPractice = false;
  // reshuffle full main trials fresh for each block
  trials = [...mainTrials];
  shuffleArray(trials);
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
      showPopup(
        "Practice complete! Press SPACE or tap Continue to start the real game.\nYou will now make decisions for YOURSELF.",
        () => {
          popupActive = false;
          startMainGame();
        }
      );
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
      // If we just finished Block 1 main trials, prepare Block 2 intro
      if (blockIndex === BLOCK_SELF) {
        blockIndex = BLOCK_PARTNER;
        // show intro for partner, then start partner block
        setInstructionOverlayVisible(true);
        introStep = 0;
        currentIntro = introPartner;
        document.getElementById("introText").textContent = currentIntro[introStep];
        document.getElementById("startButton").textContent = "Next";
        document.getElementById("startButton").onclick = function partnerIntroStepper() {
          if (introStep < currentIntro.length - 1) {
            introStep++;
            document.getElementById("introText").textContent = currentIntro[introStep];
            if (introStep === currentIntro.length - 1) {
              document.getElementById("startButton").textContent = "Start";
            }
            return;
          }
          // start partner block main trials
          setInstructionOverlayVisible(false);
          inPractice = false; // no practice again
          requeueTrials = [];
          currentTrialIndex = 0;
          trials = [...mainTrials];
          shuffleArray(trials);
          showFixationCross();
        };
        return;
      }
      // else finished Block 2 → end
      endGame();
      return;
    }
  }

  const trial = trials[currentTrialIndex];

  const immText = trial.ImmediateDelay == 0 ? "right now" : `in ${trial.ImmediateDelay} ${trial.ImmediateDelay === 1 ? "day" : "days"}`;
  const delText = (() => {
    const y = Number(trial?.DelayedDelay ?? 0);
    const m = Number(trial?.DelayedDelay_Month ?? 0);
    const yrs = Math.round((y + m / 12) * 10) / 10; // one decimal
    if (yrs === 0) return "right now";
    const label = yrs === 1 ? "year" : "years";
    return `in ${yrs.toFixed(1)} ${label}`;
  })();

  optionA.style.border = "2px solid #000";
  optionB.style.border = "2px solid #000";

  // minimal change: swap only the subject line based on block
  const subj = `${targetNoun()} ${receiveVerb()}`;

  if (trial.NowOnLeft == "1") {
    optionA.textContent = `${subj} $${Number(trial.ImmediateAmount).toLocaleString('en-US')} ${immText}`;
    optionB.textContent = `${subj} $${Number(trial.DelayedAmount).toLocaleString('en-US')} ${delText}`;
    optionA.dataset.choice = "A";
    optionB.dataset.choice = "B";
  } else {
    optionA.textContent = `${subj} $${Number(trial.DelayedAmount).toLocaleString('en-US')} ${delText}`;
    optionB.textContent = `${subj} $${Number(trial.ImmediateAmount).toLocaleString('en-US')} ${immText}`;
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
      decisionTarget: decisionTargetTag(), // NEW: "self" or "partner"
      ImmediateAmount: trial.ImmediateAmount,
      ImmediateDelay: trial.ImmediateDelay,
      DelayedAmount: trial.DelayedAmount,
      DelayedDelay: trial.DelayedDelay,
      DelayedDelay_Months: trial.DelayedDelay_Month,
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
    task: "family_delay_discounting_two_blocks",
    participantID,
    results, // full per-trial rows (now includes decisionTarget)
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