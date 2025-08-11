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
let inPractice = true;
let popupActive = true;
let trialActive = false;
let ratingMap = {}; // { '0001.png': 5.32, ... }

const isTouch =
  (window.matchMedia && window.matchMedia("(hover: none) and (pointer: coarse)").matches) ||
  "ontouchstart" in window ||
  navigator.maxTouchPoints > 0;
let isMobile = isTouch; // use this everywhere you branch instructions/UI

function applyInputModeClasses() {
  document.body.classList.toggle("mobile", isMobile);
  document.body.classList.toggle("desktop", !isMobile);
}

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
  applyInputModeClasses();
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
  const narrow = window.innerWidth <= 768;
  document.body.classList.toggle("narrow", narrow); // optional class for sizing if you want
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
  showKDEQuiz();

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
  mainTrials = filtered.slice(0, 10).map(([filename]) => filename);
  const shuffled = [...Object.keys(ratingMap)];
  shuffleArray(shuffled);
  practiceTrials = shuffled.slice(0, 8);

  // ✅ Sanity check
  const sampledMeans = mainTrials.map(img => ratingMap[img]);
  const meanSampledValue = sampledMeans.reduce((acc, val) => acc + val, 0) / sampledMeans.length;
  console.log("✅ Mean friendliness of sampled main images:", meanSampledValue.toFixed(3));
}

// --- KDE helpers ---
function gaussianKernel(u) { return Math.exp(-0.5 * u * u) / Math.sqrt(2 * Math.PI); }

// Silverman's rule-of-thumb bandwidth on 1–7 ratings (clamped to reasonable)
function silvermanBandwidth(arr) {
  if (!arr.length) return 0.3;
  const n = arr.length;
  const mean = arr.reduce((a,b)=>a+b,0)/n;
  const sd = Math.sqrt(arr.reduce((a,b)=>a+(b-mean)*(b-mean),0)/n) || 0.01;
  let h = 1.06 * sd * Math.pow(n, -1/5);
  if (h < 0.15) h = 0.15;
  if (h > 0.6)  h = 0.6;
  return h;
}

function kdeEstimate(xs, samples, h) {
  const n = samples.length;
  if (!n) return xs.map(()=>0);
  const invNh = 1 / (n * h);
  return xs.map(x => {
    let s = 0;
    for (let i=0; i<n; i++) s += gaussianKernel((x - samples[i]) / h);
    return s * invNh;
  });
}

function drawKDE(canvas, xVals, yBlack, yRed) {
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0,0,W,H);

  // Margins
  const m = { l:50, r:15, t:10, b:35 };
  const plotW = W - m.l - m.r;
  const plotH = H - m.t - m.b;

  // Scales
  const xMin = Math.min(...xVals), xMax = Math.max(...xVals);
  const yMax = Math.max(...yBlack, ...yRed, 0.001);

  function xPix(x){ return m.l + ((x - xMin)/(xMax - xMin)) * plotW; }
  function yPix(y){ return m.t + (1 - y / yMax) * plotH; }

  // Axes
  ctx.strokeStyle = '#666'; ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(m.l, m.t); ctx.lineTo(m.l, m.t+plotH); ctx.lineTo(m.l+plotW, m.t+plotH);
  ctx.stroke();

  // X ticks at integers 1..7
  ctx.fillStyle = '#444'; ctx.font = '12px Arial';
  for (let r=1; r<=7; r++) {
    const x = xPix(r);
    ctx.beginPath(); ctx.moveTo(x, m.t+plotH); ctx.lineTo(x, m.t+plotH+5); ctx.stroke();
    ctx.textAlign = 'center'; ctx.fillText(String(r), x, m.t+plotH+18);
  }
  ctx.save(); ctx.translate(14, m.t + plotH/2); ctx.rotate(-Math.PI/2);
  ctx.textAlign = 'center'; ctx.fillText('Density', 0, 0);
  ctx.restore();
  ctx.textAlign = 'center'; ctx.fillText('Rating', m.l + plotW/2, H - 5);

  // Draw black curve (real)
  ctx.strokeStyle = '#000'; ctx.lineWidth = 2;
  ctx.beginPath();
  for (let i=0; i<xVals.length; i++) {
    const xp = xPix(xVals[i]), yp = yPix(yBlack[i]);
    if (i===0) ctx.moveTo(xp, yp); else ctx.lineTo(xp, yp);
  }
  ctx.stroke();

  // Draw red curve (sampled)
  ctx.strokeStyle = '#c62828'; ctx.lineWidth = 2;
  ctx.beginPath();
  for (let i=0; i<xVals.length; i++) {
    const xp = xPix(xVals[i]), yp = yPix(yRed[i]);
    if (i===0) ctx.moveTo(xp, yp); else ctx.lineTo(xp, yp);
  }
  ctx.stroke();
}

// --- KDE Quiz flow ---
let kdeAnswers = { real_choice: null, exp_choice: null };

function showKDEQuiz() {
  // Build arrays from your data
  // ratingMap: { '0001.png': rating, ... } for chosen stereotype
  // mainTrials: the 100 (filenames) actually shown to the participant
  const population = Object.values(ratingMap).filter(v=>typeof v==='number' && !isNaN(v));
  const sampled = (mainTrials || []).map(fn => ratingMap[fn]).filter(v=>typeof v==='number' && !isNaN(v));

  // x grid across 1..7
  const xVals = [];
  for (let x=1; x<=7; x+=0.05) xVals.push(+x.toFixed(2));

  // KDEs
  const hPop = silvermanBandwidth(population);
  const hSamp = silvermanBandwidth(sampled);
  const yBlack = kdeEstimate(xVals, population, hPop); // black = real-world
  const yRed   = kdeEstimate(xVals, sampled, hSamp);   // red = experienced

  // Show overlay and draw
  const overlay = document.getElementById('kdeOverlay');
  overlay.style.display = 'flex';

  const c = document.getElementById('kdeCanvas');
  const DPR = window.devicePixelRatio || 1;
  // Ensure device-pixel crisp drawing
  const cssWidth  = Math.min(c.getBoundingClientRect().width || 480, 560);
  const cssHeight = 200; // smaller graph so the MCQs fit without clipping
  c.style.width  = cssWidth + "px";
  c.style.height = cssHeight + "px";
  c.width  = Math.round(cssWidth * DPR);
  c.height = Math.round(cssHeight * DPR)
  drawKDE(c, xVals, yBlack, yRed);

  // Enable Continue when both answers selected
  const btn = document.getElementById('kdeSubmit');
  function checkReady(){
    btn.disabled = !(kdeAnswers.real_choice && kdeAnswers.exp_choice);
  }
  document.querySelectorAll('input[name="kde_real_choice"]').forEach(el=>{
    el.addEventListener('change', e=>{ kdeAnswers.real_choice = e.target.value; checkReady(); });
  });
  document.querySelectorAll('input[name="kde_exp_choice"]').forEach(el=>{
    el.addEventListener('change', e=>{ kdeAnswers.exp_choice = e.target.value; checkReady(); });
  });

  btn.addEventListener('click', ()=> {
    overlay.style.display = 'none';
    finishAndSend(); // proceed to your existing completion (download + postMessage)
  }, { once:true });
}

function finishAndSend() {
  const payload = {
    participantID,
    results,
    kde_quiz: {
      real_choice: kdeAnswers.real_choice,        // "black" or "red"
      experienced_choice: kdeAnswers.exp_choice,  // "black" or "red"
      // hidden ground truth mapping used in the plot:
      mapping: { black: "real", red: "experienced" }
    }
  };
  window.parent.postMessage({ type: "RG_DONE", payload }, "*");
}
