// Rating Game: JS file with skewed image sampling

let trials = [];
let practiceTrials = [];
let mainTrials = [];
let sampledMeans = 0;
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
let populationRatings = {
  Ideology: [],
};
let redoSet = new Set();
let inRedoPass = false;
const MAX_TOTAL_TRIALS = 150; 
function completedChoicesCount() {
  return results.filter(r => !r.lapse).length; // non-lapse trials recorded
}

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

const cond = (getParam("cond") || "").toLowerCase();
const cond2 = (getParam("cond2") || "").toLowerCase();

const TRAIT_VARIANTS = { adj: 'Ideological', noun: 'Ideology', code: 'ideological' };

// Pick one variant and keep it for the whole experiment
const chosenTrait = TRAIT_VARIANTS;

const introMessages = [
  "Welcome to the Rating Game!",
  isMobile
    ? `Tap left or right to rate the ${chosenTrait.noun.toLowerCase()} of each person. You have 5 seconds to respond.`
    : `Press 'A' for NO or 'L' for YES to rate the ${chosenTrait.noun.toLowerCase()} of each person. You have 5 seconds to respond.`,
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
    promptEl.textContent = `${chosenTrait.adj}?`;
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
    startTrial();
  }, 1000);
}

async function startTrial() {
  const trial = trials[currentTrialIndex];
  const path = `Faces/${trial}`;
  stimulusImage.style.display = "none";

  const img = new Image();
  img.decoding = "async";
  const ready = new Promise((res, rej) => { img.onload = res; img.onerror = rej; });
  img.src = path;
  await ready;
  try { if (img.decode) await img.decode(); } catch {}

  stimulusImage.src = img.src;
  stimulusImage.style.display = "block";
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
    redoSet.delete(trial);
  }

  currentTrialIndex++;
  proceedAfterTrial();
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
    redoSet.add(trial);
  }
  showPopup("Too slow!", () => {
    popupActive = false;
    currentTrialIndex++;
    proceedAfterTrial();
  });
}

function proceedAfterTrial() {
  // safety cap (optional)
  if (!inPractice && results.length >= MAX_TOTAL_TRIALS) {
    console.warn("Reached safety cap; ending.");
    endGame();
    return;
  }

  if (currentTrialIndex < trials.length) {
    showFixationCross();
    return;
  }

  // finished a pass
  if (inPractice) {
    showPopup("Practice complete!", startMainGame);
    return;
  }

  // main task: if any lapsed images remain unresolved, do a redo pass
  if (redoSet.size > 0) {
    const remaining = Array.from(redoSet);
    shuffleArray(remaining);         // avoid same order
    trials = remaining;
    currentTrialIndex = 0;
    inRedoPass = true;
    popupActive = false;
    showFixationCross();
    return;
  }

  // all images have a choice → done
  inRedoPass = false;
  endGame();
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
  const filename = `rating_game_${participantID}.json`;
  const dataStr = JSON.stringify(results, null, 2);
  showKDEQuiz();
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
  populationRatings.Ideology = [];
  ratingMap = {};
  const targetStereotype = "Ideology";

  // Filter for Ideology rows and build ratingMap
  data.forEach(row => {
    const stereotype = row["stereotype"]?.trim();
    const targetId = row["target_id"]?.trim();
    const rating = parseFloat(row["rating"]);
    if (!isNaN(rating)) {
      if (stereotype === "Ideology") populationRatings.Ideology.push(rating);
    }
    if (stereotype === targetStereotype && !isNaN(rating)) {
      const paddedId = targetId.padStart(4, '0');  // Pad with zeros
      ratingMap[`${paddedId}.png`] = rating;
    }
  });

  // const all = Object.entries(ratingMap);
  // const filtered = skewParam === "l"
  //   ? all.filter(([_, val]) => Math.random() < Math.pow(val / 7, 3))   // left-skewed
  //   : skewParam === "r"
  //     ? all.filter(([_, val]) => Math.random() < Math.pow(1 - val / 7, 3)) // right-skewed
  //     : all;

  const selectedFilenames = selectTargetedImages(ratingMap, {
    cond,           // 'r' => center ~5, 'l' => center ~3
    cond2,          // 'h' => inflate variance, else equal-variance baseline
    n: 100
  });

  mainTrials = selectedFilenames;

  // shuffleArray(filtered);
  // mainTrials = filtered.slice(0, 100).map(([filename]) => filename);
  
  const shuffled = [...Object.keys(ratingMap)];
  shuffleArray(shuffled);
  practiceTrials = shuffled.slice(0, 8);

  // ✅ Sanity check
  sampledMeans = mainTrials.map(img => ratingMap[img]);
  const n = sampledMeans.length;

  function median(arr) {
    const a = [...arr].sort((x, y) => x - y);
    const mid = Math.floor(a.length / 2);
    return (a.length % 2) ? a[mid] : (a[mid - 1] + a[mid]) / 2;
  }

  function skewnessFisherPearson(arr) {
    const n = arr.length;
    if (n < 3) return 0;
    const mean = arr.reduce((s, v) => s + v, 0) / n;
    const s2 = arr.reduce((s, v) => s + (v - mean) ** 2, 0) / (n - 1);
    const s = Math.sqrt(s2);
    if (!isFinite(s) || s === 0) return 0;
    let m3c = 0; // sum of (x - mean)^3
    for (let i = 0; i < n; i++) {
      const d = arr[i] - mean;
      m3c += d * d * d;
    }
    // Adjusted Fisher–Pearson sample skewness
    return (n * m3c) / ((n - 1) * (n - 2) * s * s * s);
  }

  const med = median(sampledMeans);
  const skew = skewnessFisherPearson(sampledMeans);

  console.log("✅ Median:", med.toFixed(3));
  console.log("✅ Skew (adj. Fisher–Pearson):", skew.toFixed(3), "| cond:", cond, "| cond2:", cond2);
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

function drawKDE(canvas, xVals, yBlack, yRed, axisLabels) {
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0,0,W,H);

  // Margins
  const m = { l:50, r:50, t:10, b:35 };
  const plotW = W - m.l - m.r;
  const plotH = H - m.t - m.b;

  // Scales
  const xMin = 1, xMax = 7;
  const yMax = Math.max(...yBlack, ...yRed, 0.001);

  const xPix = x => m.l + ((x - xMin)/(xMax - xMin)) * plotW;
  const yPix = y => m.t + (1 - y / yMax) * plotH;

  // Axes
  ctx.strokeStyle = '#666'; ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(m.l, m.t); ctx.lineTo(m.l, m.t+plotH); ctx.lineTo(m.l+plotW, m.t+plotH);
  ctx.stroke();

  // X ticks at integers 1..7
  ctx.fillStyle = '#444'; ctx.font = '12px Arial'; ctx.textAlign = 'center';
  const xticks = [
    {x:1, label:axisLabels.left},
    {x:4, label:axisLabels.mid},
    {x:7, label:axisLabels.right}
  ];
  xticks.forEach(t => {
    const xp = xPix(t.x);
    ctx.beginPath(); ctx.moveTo(xp, m.t+plotH); ctx.lineTo(xp, m.t+plotH+5); ctx.stroke();
    ctx.save();
    ctx.translate(xp, m.t+plotH+18);
    ctx.fillText(t.label, 0, 0);
    ctx.restore();
  });

  // Y label: "Frequency"
  ctx.save();
  ctx.translate(16, m.t + plotH/2);
  ctx.rotate(-Math.PI/2);
  ctx.textAlign = 'center';
  ctx.fillText(axisLabels.y || 'Frequency', 0, 0);
  ctx.restore();

  // Draw black curve (real)
  ctx.strokeStyle = '#000'; ctx.lineWidth = 4;
  ctx.beginPath();
  for (let i=0; i<xVals.length; i++) {
    const xp = xPix(xVals[i]), yp = yPix(yBlack[i]);
    if (i===0) ctx.moveTo(xp, yp); else ctx.lineTo(xp, yp);
  }
  ctx.stroke();

  // Draw red curve (sampled)
  ctx.strokeStyle = '#c62828'; ctx.lineWidth = 4;
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
  // Build KDEs for the two REAL distributions
  const popI = populationRatings.Ideology.filter(Number.isFinite);
  if (!popI.length) {
    console.warn("Population arrays missing; skipping KDE quiz.");
    finishAndSend(); // fail-safe
    return;
  }

  // X grid 1..7
  const xVals = []; for (let x=1; x<=7; x+=0.05) xVals.push(+x.toFixed(2));
  const yBlack = kdeEstimate(xVals, popI, silvermanBandwidth(popI)); // Black = Ideology (population)
  const yRed   = kdeEstimate(xVals, sampledMeans, silvermanBandwidth(sampledMeans)); // Red   = Ideology (sampled)

  // Show overlay & size canvas compactly
  const overlay = document.getElementById('kdeOverlay');
  overlay.style.display = 'flex';

  const c = document.getElementById('kdeCanvas');
  const DPR = window.devicePixelRatio || 1;
  const cssWidth  = Math.min(c.getBoundingClientRect().width || 480, 560);
  const cssHeight = 200; // compact
  c.style.width  = cssWidth + "px";
  c.style.height = cssHeight + "px";
  c.width  = Math.round(cssWidth * DPR);
  c.height = Math.round(cssHeight * DPR);

  const notAdj = `Not ${chosenTrait.adj}`;
  const axisLabels = { left: notAdj, mid: "Neutral", right: chosenTrait.adj, y: "Frequency" };
  drawKDE(c, xVals, yBlack, yRed, axisLabels);

  // Enable Continue when both answers selected
  const btn = document.getElementById('kdeSubmit');
  kdeAnswers = { real_choice: null, exp_choice: null };
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
    finishAndSend(); // proceed
  }, { once:true });
}

function finishAndSend() {
  // Colors in our plot: black = population, red = sampled
  const mapping = { black: "population", red: "sampled" };

  // Correct REAL answer should match cond2 (trait): f -> black, a -> red
  const correctReal = "black";

  // Correct EXPERIENCED answer should match skew cond: l -> left-skew (population -> black), r -> right-skew (sampled -> red)
  const correctExp = "red";

  const payload = {
    participantID,
    results,
    kde_quiz: {
      real_choice: kdeAnswers.real_choice || "",          // "black"|"red"
      experienced_choice: kdeAnswers.exp_choice || "",    // "black"|"red"
      mapping,                                            // ground truth of which color = which trait
      correct_real_color: correctReal,                    // what we expect for "real"
      correct_experienced_color: correctExp               // what we expect for "experienced"
    },
    label_variant: chosenTrait.code
  };

  // Send to Qualtrics parent
  try {
    window.parent.postMessage({ type: "RG_DONE", payload }, "*"); // or restrict origin
  } catch (e) {
    console.error("postMessage failed:", e);
  }
}

function selectTargetedImages(
  ratingMap,
  {
    cond = 'r',            // 'r' -> median ~5; 'l' -> median ~3
    cond2 = 'n',           // 'n' -> skew≈0; 'h' -> strong skew (sign set by cond)
    n = 100,
    binWidth = 0.25,
    medTol = 0.10,         // tolerance for median
    skewTol = 0.10,        // tolerance for skewness
    protectBand = 0.20     // keep boundary items within ± this of the target median
  } = {}
) {
  const entries = Object.entries(ratingMap).filter(([, v]) => Number.isFinite(v));
  if (entries.length < n) throw new Error(`Not enough items in ratingMap (have ${entries.length}, need ${n}).`);

  const filenames = entries.map(([k]) => k);
  const values = entries.map(([, v]) => v);

  // --- Targets ---
  const medBase = (cond === 'r') ? 5 : 3;
  const medTarget = clamp(medBase + (Math.random() * 0.2 - 0.1), 1.1, 6.9); // jitter ±0.1
  const wantLeft  = Math.floor(n / 2);
  const wantRight = n - wantLeft;

  // --- Binning across [1,7] ---
  const minX = 1, maxX = 7;
  const edges = [];
  for (let x = minX; x < maxX; x += binWidth) edges.push(+x.toFixed(6));
  edges.push(maxX + 1e-9);
  const centers = Array.from({ length: edges.length - 1 }, (_, i) => (edges[i] + edges[i + 1]) / 2);

  // Map pool indices to bins
  const binToIdxs = Array.from({ length: centers.length }, () => []);
  for (let i = 0; i < values.length; i++) {
    const b = findBin(values[i], edges);
    if (b >= 0) binToIdxs[b].push(i);
  }

  // Helper: truncated normal mass around medTarget (symmetric base shape)
  function normCdf(x, mu, s) {
    const z = (x - mu) / (s * Math.SQRT2);
    const sign = z < 0 ? -1 : 1;
    const a1 = 0.278393, a2 = 0.230389, a3 = 0.000972, a4 = 0.078108;
    const az = Math.abs(z);
    const t = 1 / (1 + a1*az + a2*az**2 + a3*az**3 + a4*az**4);
    const erf = sign * (1 - t**4);
    return 0.5 * (1 + erf);
  }
  const sdShape = (cond2 === 'h') ? 0.80 : 0.65; // a bit wider when skewing
  const Z = normCdf(maxX, medTarget, sdShape) - normCdf(minX, medTarget, sdShape);
  const baseMass = centers.map((_, b) => {
    const p = (normCdf(edges[b + 1], medTarget, sdShape) - normCdf(edges[b], medTarget, sdShape)) / (Z || 1e-9);
    return Math.max(p, 0);
  });

  // --- Build side-specific masses so that left/right each get exactly 50% ---
  const isLeftBin  = centers.map(c => c <= medTarget);
  const leftMass  = baseMass.slice();
  const rightMass = baseMass.slice();

  if (cond2 === 'h') {
    // Strong skew: emphasize far tail on one side, compress the other (within side only)
    const gamma = 3.0; // strength
    if (cond === 'r') {
      // negative skew: heavy left tail, compressed right
      for (let b = 0; b < centers.length; b++) {
        const d = Math.abs(centers[b] - medTarget);
        if (isLeftBin[b]) leftMass[b]  *= Math.exp(gamma * d);
        else              rightMass[b] *= Math.exp(-gamma * d);
      }
    } else {
      // positive skew: heavy right tail, compressed left
      for (let b = 0; b < centers.length; b++) {
        const d = Math.abs(centers[b] - medTarget);
        if (!isLeftBin[b]) rightMass[b] *= Math.exp(gamma * d);
        else               leftMass[b]  *= Math.exp(-gamma * d);
      }
    }
  }

  // Normalize each side separately to sum to 0.5 probability
  const sumLeft  = leftMass .reduce((s, v, i) => s + (isLeftBin[i] ? v : 0), 0) || 1;
  const sumRight = rightMass.reduce((s, v, i) => s + (!isLeftBin[i] ? v : 0), 0) || 1;

  // Desired counts per bin (left/right separately)
  const wantCounts = new Array(centers.length).fill(0);
  {
    // left side
    const wants = centers.map((_, i) => isLeftBin[i] ? (leftMass[i] / sumLeft) * wantLeft : 0);
    const floors = wants.map(x => Math.floor(x));
    let rem = wantLeft - floors.reduce((s, v) => s + v, 0);
    const frac = wants.map((v, i) => [i, v - Math.floor(v)]).sort((a, b) => b[1] - a[1]);
    for (let k = 0; k < rem; k++) floors[frac[k][0]]++;
    for (let i = 0; i < centers.length; i++) wantCounts[i] += floors[i];
  }
  {
    // right side
    const wants = centers.map((_, i) => !isLeftBin[i] ? (rightMass[i] / sumRight) * wantRight : 0);
    const floors = wants.map(x => Math.floor(x));
    let rem = wantRight - floors.reduce((s, v) => s + v, 0);
    const frac = wants.map((v, i) => [i, v - Math.floor(v)]).sort((a, b) => b[1] - a[1]);
    for (let k = 0; k < rem; k++) floors[frac[k][0]]++;
    for (let i = 0; i < centers.length; i++) wantCounts[i] += floors[i];
  }

  // Feasibility: cap by available counts per bin; keep side totals fixed if possible
  function redistributeWithinSide(sideIsLeft, targetTotal) {
    let caps = wantCounts.map((c, i) => {
      if (!!isLeftBin[i] === sideIsLeft) {
        const avail = binToIdxs[i].length;
        return Math.min(c, avail);
      }
      return 0;
    });
    let have = caps.reduce((s, v) => s + v, 0);
    if (have < targetTotal) {
      // Fill remaining within this side, preferring bins consistent with skew shape
      const order = Array.from({ length: centers.length }, (_, i) => i)
        .filter(i => !!isLeftBin[i] === sideIsLeft)
        .sort((i, j) => {
          // prefer larger weight for the side
          const wi = sideIsLeft ? leftMass[i] : rightMass[i];
          const wj = sideIsLeft ? leftMass[j] : rightMass[j];
          return wj - wi;
        });
      for (const i of order) {
        const avail = binToIdxs[i].length;
        const add = Math.min(avail - caps[i], targetTotal - have);
        if (add > 0) { caps[i] += add; have += add; }
        if (have === targetTotal) break;
      }
    }
    return caps;
  }
  const leftCaps  = redistributeWithinSide(true,  wantLeft);
  const rightCaps = redistributeWithinSide(false, wantRight);

  // Select concrete indices per bin (without replacement)
  const chosenIdxs = [];
  for (let b = 0; b < centers.length; b++) {
    const need = (isLeftBin[b] ? leftCaps[b] : rightCaps[b]);
    if (!need) continue;
    const pool = binToIdxs[b].slice();
    shuffleArray(pool);
    chosenIdxs.push(...pool.slice(0, need));
  }

  // --- Tighten skew while preserving the anchored median ---
  const skewTarget = (cond2 === 'n') ? 0 : ((cond === 'r') ? -2 : +2);
  const resultIdxs = tightenMedianSkewFixedMedian(chosenIdxs, values, {
    med: medTarget, skew: skewTarget, medTol, skewTol, protectBand,
    favorSkew: (cond2 === 'h') ? 2.5 : 1.0
  });

  return resultIdxs.map(i => filenames[i]);

  // ---- helpers ----
  function findBin(x, edges) {
    let lo = 0, hi = edges.length - 2;
    if (x < edges[0] || x > edges[edges.length - 1]) return -1;
    while (lo <= hi) {
      const mid = (lo + hi) >> 1;
      if (x >= edges[mid] && x < edges[mid + 1]) return mid;
      if (x < edges[mid]) hi = mid - 1; else lo = mid + 1;
    }
    return edges.length - 2;
  }
  function clamp(x, a, b) { return Math.max(a, Math.min(b, x)); }
  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
}

/**
 * Preserve the median by:
 *  - Keeping left/right counts fixed (n/2 each).
 *  - Never swapping the two boundary items (max of left side, min of right side).
 * Skew is adjusted via within-side swaps only.
 */
function tightenMedianSkewFixedMedian(chosenIdxs, values, { med, skew, medTol, skewTol, protectBand = 0.2, favorSkew = 1.0 }) {
  const n = chosenIdxs.length;
  const selected = chosenIdxs.map(i => ({ i, v: values[i] })).sort((a,b)=>a.v-b.v);
  const inChosen = new Set(chosenIdxs);
  const unselected = [];
  for (let i = 0; i < values.length; i++) if (!inChosen.has(i)) unselected.push({ i, v: values[i] });
  unselected.sort((a,b)=>a.v-b.v);

  // Running moment sums for skewness
  let sumX  = selected.reduce((s,o)=>s+o.v, 0);
  let sumX2 = selected.reduce((s,o)=>s+o.v*o.v, 0);
  let sumX3 = selected.reduce((s,o)=>s+o.v*o.v*o.v, 0);

  function stats(sum1, sum2, sum3) {
    const mean = sum1 / n;
    const s2 = (sum2 - n*mean*mean) / (n - 1);
    const s  = Math.sqrt(Math.max(s2, 1e-12));
    const m3c = sum3 - 3*mean*sum2 + 2*n*mean*mean*mean;
    const g1 = (n > 2) ? (n*m3c) / ((n-1)*(n-2)*s*s*s) : 0;
    return { mean, s2, g1 };
  }
  function sampleMedian() {
    // even n assumed (100)
    const L = selected[(n/2) - 1].v;
    const R = selected[(n/2)].v;
    return 0.5 * (L + R);
  }
  function score(medNow, skewNow) {
    return Math.abs(medNow - med) / medTol + favorSkew * Math.abs(skewNow - skew) / skewTol;
  }

  let medNow = sampleMedian();
  let { g1: skewNow } = stats(sumX, sumX2, sumX3);
  let best = score(medNow, skewNow);
  let swaps = 1600;

  // indices for the two boundary items in the sorted selected array
  function boundaryIdx() { return { Lidx: (n/2) - 1, Ridx: (n/2) }; }

  // Convenience: get within-side windows excluding boundaries
  function leftSideRange()  { const { Lidx } = boundaryIdx(); return [0, Math.max(0, Lidx - 1)]; }
  function rightSideRange() { const { Ridx } = boundaryIdx(); return [Math.min(selected.length-1, Ridx + 1), selected.length - 1]; }

  // Unselected pools split by median
  const unL = unselected.filter(o => o.v <= med).sort((a,b)=>a.v-b.v);        // left pool
  const unR = unselected.filter(o => o.v >= med).sort((a,b)=>a.v-b.v);        // right pool

  function trySwap(selIdx, unPool, unIndex) {
    const a = selected[selIdx], b = unPool[unIndex];
    if (!a || !b) return false;

    // Apply swap virtually
    const newSumX  = sumX  - a.v + b.v;
    const newSumX2 = sumX2 - a.v*a.v + b.v*b.v;
    const newSumX3 = sumX3 - a.v*a.v*a.v + b.v*b.v*b.v;

    // Update sorted arrays virtually: replace a with b and reinsert
    // For correctness, forbid touching boundary items
    const { Lidx, Ridx } = boundaryIdx();
    if (selIdx === Lidx || selIdx === Ridx) return false;

    // Enforce boundary guards: keep boundary items within protectBand of med
    const leftBoundaryVal  = (selIdx === Lidx-1) ? b.v : selected[Lidx].v;
    const rightBoundaryVal = (selIdx === Ridx+1) ? b.v : selected[Ridx].v;
    if (Math.abs(leftBoundaryVal  - med) > protectBand)  return false;
    if (Math.abs(rightBoundaryVal - med) > protectBand)  return false;

    // Compute new median & skew
    // (We conservatively recompute median using a small local rebuild.)
    const oldVal = a.v, newVal = b.v;

    // Commit virtually in arrays for median computation
    removeAt(selected, selIdx);
    insertSorted(selected, b);

    const newMed = sampleMedian();
    const { g1: newSkew } = stats(newSumX, newSumX2, newSumX3);

    // Acceptance rules:
    // 1) Median must remain within tolerance.
    // 2) If median is already within tol, accept if skew moves toward target.
    // 3) Otherwise, accept only if overall score improves.
    const medOK = Math.abs(newMed - med) <= medTol;
    const skewCloser = Math.abs(newSkew - skew) < Math.abs(skewNow - skew);
    const newScore = score(newMed, newSkew);

    let accept = false;
    if (medOK && skewCloser) accept = true;
    else if (newScore < best) accept = true;

    if (accept) {
      // finalize: update sums and pools
      best = newScore;
      sumX = newSumX; sumX2 = newSumX2; sumX3 = newSumX3;
      medNow = newMed; skewNow = newSkew;

      // Move swapped items between unselected pools
      const sidePool = (unPool === unL) ? unL : unR;
      removeAt(sidePool, unIndex); // remove b
      insertSorted(sidePool, { i: a.i, v: oldVal }); // put back a
      return true;
    } else {
      // rollback the virtual array change
      const pos = binarySearch(selected, newVal);
      removeAt(selected, pos);
      insertSorted(selected, a);
      return false;
    }
  }

  // Main loop
  while ((Math.abs(medNow - med) > medTol || Math.abs(skewNow - skew) > skewTol) && swaps-- > 0) {
    let improved = false;

    // A) If median out of band, nudge boundaries with conservative within-side swaps
    if (Math.abs(medNow - med) > medTol) {
      const { Lidx, Ridx } = boundaryIdx();
      if (medNow < med) {
        // Raise median: increase right boundary or raise left boundary
        // Try: swap the smallest RIGHT (index Ridx+1 is safest) with a slightly larger unR near med
        const [rs, re] = rightSideRange();
        const selIdx = Math.min(re, Ridx + 1);
        const j = Math.min(2, unR.length - 1); // one of the nearest-to-median right candidates
        if (trySwap(selIdx, unR, Math.max(0, j))) improved = true;
      } else {
        // Lower median: decrease left boundary or lower right boundary
        const [ls, le] = leftSideRange();
        const selIdx = Math.max(ls, le); // pick near boundary but not the boundary itself
        const j = Math.max(0, unL.length - 3); // one of the nearest-to-median left candidates from high end
        if (trySwap(selIdx, unL, j)) improved = true;
      }
    }

    // B) Skew tuning while keeping median inside tolerance (within-side only)
    if (!improved && Math.abs(skewNow - skew) > skewTol) {
      const wantPositive = (skewNow < skew);
      if (wantPositive) {
        // Increase right tail / soften left tail
        const [rs, re] = rightSideRange();
        if (rs <= re && unR.length) {
          // replace a near-median right selected with a far-right unselected
          const selIdx = rs;              // closest to boundary on right (not boundary)
          const unIdx  = unR.length - 1;  // far right
          if (trySwap(selIdx, unR, unIdx)) { improved = true; continue; }
        }
        const [ls, le] = leftSideRange();
        if (ls <= le && unL.length) {
          // replace a far-left selected with a near-median unselected-left
          const selIdx = ls; // far left
          const unIdx  = Math.max(0, unL.length - 1); // near med on left
          if (trySwap(selIdx, unL, unIdx)) { improved = true; continue; }
        }
      } else {
        // Increase left tail / soften right tail
        const [ls, le] = leftSideRange();
        if (ls <= le && unL.length) {
          const selIdx = le;             // near boundary on left (not boundary)
          const unIdx  = 0;              // far left
          if (trySwap(selIdx, unL, unIdx)) { improved = true; continue; }
        }
        const [rs, re] = rightSideRange();
        if (rs <= re && unR.length) {
          const selIdx = re;             // far right selected
          const unIdx  = 0;              // near median on right
          if (trySwap(selIdx, unR, unIdx)) { improved = true; continue; }
        }
      }
    }

    if (!improved) break;
  }

  return selected.map(o => o.i);

  // --- helpers for sorted arrays of {i,v} ---
  function insertSorted(arr, obj) {
    let lo = 0, hi = arr.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (arr[mid].v <= obj.v) lo = mid + 1; else hi = mid;
    }
    arr.splice(lo, 0, obj);
  }
  function removeAt(arr, idx) { if (idx >= 0 && idx < arr.length) arr.splice(idx, 1); }
  function binarySearch(arr, v) {
    let lo = 0, hi = arr.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (arr[mid].v < v) lo = mid + 1; else hi = mid;
    }
    return lo;
  }
}

