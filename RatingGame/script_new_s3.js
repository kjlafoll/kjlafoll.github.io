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
    n: 10
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
  const mean = sampledMeans.reduce((acc, v) => acc + v, 0) / n;
  const variance = n > 1
    ? sampledMeans.reduce((acc, v) => acc + (v - mean) ** 2, 0) / (n - 1)
    : 0;
  const sd = Math.sqrt(variance);
  console.log("✅ Mean:", mean.toFixed(3));
  console.log("✅ Variance:", variance.toFixed(3));
  console.log("✅ SD:", sd.toFixed(3));
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
  { cond = 'r', cond2 = 'n', n = 100, binWidth = 0.25, meanTol = 0.10, varTol = 0.10 } = {}
) {
  const entries = Object.entries(ratingMap).filter(([, v]) => Number.isFinite(v));
  if (entries.length < n) throw new Error(`Not enough items in ratingMap (have ${entries.length}, need ${n}).`);

  const filenames = entries.map(([k]) => k);
  const values = entries.map(([, v]) => v);

  // ---- Targets ----
  const muBase = (cond === 'r') ? 5 : 3;
  const muTarget = clamp(muBase + (Math.random() * 0.2 - 0.1), 1.1, 6.9); // small jitter ±0.1
  const varTarget = (cond2 === 'h') ? 1.0 : 0.2;
  const sdTarget = Math.sqrt(varTarget);

  // ---- Truncated-normal mass → desired counts per bin ----
  const minX = 1, maxX = 7;
  const edges = [];
  for (let x = minX; x < maxX; x += binWidth) edges.push(+x.toFixed(6));
  edges.push(maxX + 1e-9);
  const centers = Array.from({ length: edges.length - 1 }, (_, i) => (edges[i] + edges[i + 1]) / 2);

  // bin index lookup
  const binToIdxs = Array.from({ length: centers.length }, () => []);
  for (let i = 0; i < values.length; i++) {
    const b = findBin(values[i], edges);
    if (b >= 0) binToIdxs[b].push(i);
  }

  // truncated normal CDF
  function normCdf(x, mu, s) {
    const z = (x - mu) / (s * Math.SQRT2);
    const sign = z < 0 ? -1 : 1;
    const a1 = 0.278393, a2 = 0.230389, a3 = 0.000972, a4 = 0.078108;
    const az = Math.abs(z);
    const t = 1 / (1 + a1 * az + a2 * az * az + a3 * az ** 3 + a4 * az ** 4);
    const erf = sign * (1 - t ** 4);
    return 0.5 * (1 + erf);
  }

  // Use sdTarget directly so the intended variance is baked into the target shape
  const Z = normCdf(maxX, muTarget, sdTarget) - normCdf(minX, muTarget, sdTarget);
  const mass = centers.map((_, b) => {
    const p = (normCdf(edges[b + 1], muTarget, sdTarget) - normCdf(edges[b], muTarget, sdTarget)) / (Z || 1e-9);
    return Math.max(p, 0);
  });
  const msum = mass.reduce((a, b) => a + b, 0) || 1;
  for (let i = 0; i < mass.length; i++) mass[i] /= msum;

  // integer desired counts summing to n
  const want = mass.map(p => p * n);
  const caps = want.map(Math.floor);
  let rem = n - caps.reduce((a, b) => a + b, 0);
  const frac = want.map((v, i) => [i, v - Math.floor(v)]).sort((a, b) => b[1] - a[1]);
  for (let k = 0; k < rem; k++) caps[frac[k][0]]++;

  // feasibility: cap by availability, then redistribute to bins with spare, preferring near muTarget
  let deficit = 0;
  for (let b = 0; b < caps.length; b++) {
    const avail = binToIdxs[b].length;
    if (caps[b] > avail) {
      deficit += caps[b] - avail;
      caps[b] = avail;
    }
  }
  if (deficit > 0) {
    const order = Array.from({ length: caps.length }, (_, b) => b)
      .sort((i, j) => (mass[j] * 2 - Math.abs(centers[j] - muTarget)) - (mass[i] * 2 - Math.abs(centers[i] - muTarget)));
    for (const b of order) {
      if (deficit <= 0) break;
      const spare = Math.max(0, binToIdxs[b].length - caps[b]);
      const take = Math.min(spare, deficit);
      caps[b] += take;
      deficit -= take;
    }
  }

  // ensure sum == n
  let sumCaps = caps.reduce((a, b) => a + b, 0);
  if (sumCaps !== n) {
    const byNear = Array.from({ length: caps.length }, (_, b) => b)
      .sort((i, j) => Math.abs(centers[i] - muTarget) - Math.abs(centers[j] - muTarget));
    if (sumCaps < n) {
      let need = n - sumCaps;
      for (const b of byNear) {
        const spare = Math.max(0, binToIdxs[b].length - caps[b]);
        const add = Math.min(spare, need);
        caps[b] += add; need -= add;
        if (!need) break;
      }
    } else {
      let cut = sumCaps - n;
      const byFar = byNear.slice().reverse();
      for (const b of byFar) {
        const rm = Math.min(caps[b], cut);
        caps[b] -= rm; cut -= rm;
        if (!cut) break;
      }
    }
  }

  // draw indices per bin (without replacement)
  const chosenIdxs = [];
  for (let b = 0; b < caps.length; b++) {
    if (caps[b] <= 0) continue;
    const pool = binToIdxs[b].slice();
    shuffleArray(pool);
    chosenIdxs.push(...pool.slice(0, caps[b]));
  }

  // ---- Post-selection tightening: greedy swaps to hit mean & variance bands ----
  const target = { mu: muTarget, var: varTarget, meanTol, varTol };

  const resultIdxs = tightenMoments(chosenIdxs, values, target);

  // Map back to filenames
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
 * Greedy swap phase that nudges the sample mean toward mu and variance toward var,
 * without transforming values. It only swaps selected vs unselected items.
 */
function tightenMoments(chosenIdxs, values, { mu, vartarget, meanTol, varTol }) {
  const n = chosenIdxs.length;
  const inChosen = new Set(chosenIdxs);
  const selected = chosenIdxs.map(i => ({ i, v: values[i] })).sort((a, b) => a.v - b.v);
  const unselected = [];
  for (let i = 0; i < values.length; i++) if (!inChosen.has(i)) unselected.push({ i, v: values[i] });
  unselected.sort((a, b) => a.v - b.v);

  // Maintain sums for O(1) updates
  let sumX = selected.reduce((s, o) => s + o.v, 0);
  let sumX2 = selected.reduce((s, o) => s + o.v * o.v, 0);
  function stats(sum, sum2) {
    const mean = sum / n;
    const variance = (sum2 - n * mean * mean) / (n - 1);
    return { mean, variance };
  }
  function err(mean, variance) {
    return Math.abs(mean - mu) / meanTol + Math.abs(variance - vartarget) / varTol;
  }

  let { mean, variance } = stats(sumX, sumX2);
  let bestScore = err(mean, variance);
  let swapsLeft = 1200;

  // Try targeted moves first (mean correction), then variance tuning.
  while ((Math.abs(mean - mu) > meanTol || Math.abs(variance - vartarget) > varTol) && swapsLeft-- > 0) {
    let improved = false;

    // --- Phase A: fix mean if needed
    if (Math.abs(mean - mu) > meanTol) {
      if (mean < mu) {
        // Raise mean: swap out a low selected for a high unselected
        const low = selected[0], high = unselected[unselected.length - 1];
        if (!low || !high) break;
        const newSum = sumX - low.v + high.v;
        const newSum2 = sumX2 - low.v * low.v + high.v * high.v;
        const st = stats(newSum, newSum2);
        const sc = err(st.mean, st.variance);
        if (sc < bestScore) {
          // commit
          bestScore = sc; improved = true;
          sumX = newSum; sumX2 = newSum2; mean = st.mean; variance = st.variance;
          // move elements between lists
          inChosen.delete(low.i); inChosen.add(high.i);
          selected.shift(); // remove low
          unselected.pop(); // remove high
          // insert keep sorted
          insertSorted(selected, high);
          insertSorted(unselected, low);
        }
      } else {
        // Lower mean: swap out a high selected for a low unselected
        const high = selected[selected.length - 1], low = unselected[0];
        if (!high || !low) break;
        const newSum = sumX - high.v + low.v;
        const newSum2 = sumX2 - high.v * high.v + low.v * low.v;
        const st = stats(newSum, newSum2);
        const sc = err(st.mean, st.variance);
        if (sc < bestScore) {
          bestScore = sc; improved = true;
          sumX = newSum; sumX2 = newSum2; mean = st.mean; variance = st.variance;
          inChosen.delete(high.i); inChosen.add(low.i);
          selected.pop();    // remove high
          unselected.shift(); // remove low
          insertSorted(selected, low);
          insertSorted(unselected, high);
        }
      }
    }

    // --- Phase B: tune variance if needed (try to keep mean within band)
    if (!improved && Math.abs(variance - vartarget) > varTol) {
      if (variance < vartarget) {
        // Need more spread: replace a near-mean selected with a far-from-mean unselected
        const midIdx = nearestIdx(selected, mu);
        const farIdx = farthestIdx(unselected, mu);
        if (midIdx == null || farIdx == null) break;
        const a = selected[midIdx], b = unselected[farIdx];
        const newSum = sumX - a.v + b.v;
        const newSum2 = sumX2 - a.v * a.v + b.v * b.v;
        const st = stats(newSum, newSum2);
        const sc = err(st.mean, st.variance);
        // also ensure mean doesn't leave the tolerance band by too much
        if (sc < bestScore || (Math.abs(st.mean - mu) <= Math.abs(mean - mu) && Math.abs(st.variance - vartarget) < Math.abs(variance - vartarget))) {
          bestScore = sc; improved = true;
          sumX = newSum; sumX2 = newSum2; mean = st.mean; variance = st.variance;
          inChosen.delete(a.i); inChosen.add(b.i);
          selected.splice(midIdx, 1);
          unselected.splice(farIdx, 1);
          insertSorted(selected, b);
          insertSorted(unselected, a);
        }
      } else {
        // Too much spread: replace an extreme selected with a near-mean unselected
        const extremeIdx = farthestIdx(selected, mu);
        const nearIdx = nearestIdx(unselected, mu);
        if (extremeIdx == null || nearIdx == null) break;
        const a = selected[extremeIdx], b = unselected[nearIdx];
        const newSum = sumX - a.v + b.v;
        const newSum2 = sumX2 - a.v * a.v + b.v * b.v;
        const st = stats(newSum, newSum2);
        const sc = err(st.mean, st.variance);
        if (sc < bestScore || (Math.abs(st.mean - mu) <= Math.abs(mean - mu) && Math.abs(st.variance - vartarget) < Math.abs(variance - vartarget))) {
          bestScore = sc; improved = true;
          sumX = newSum; sumX2 = newSum2; mean = st.mean; variance = st.variance;
          inChosen.delete(a.i); inChosen.add(b.i);
          selected.splice(extremeIdx, 1);
          unselected.splice(nearIdx, 1);
          insertSorted(selected, b);
          insertSorted(unselected, a);
        }
      }
    }

    if (!improved) break; // no better single-swap found → stop
  }

  return selected.map(o => o.i);

  // helpers for sorted arrays of {i,v}
  function insertSorted(arr, obj) {
    // binary insert by value
    let lo = 0, hi = arr.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (arr[mid].v <= obj.v) lo = mid + 1; else hi = mid;
    }
    arr.splice(lo, 0, obj);
  }
  function nearestIdx(arr, target) {
    if (!arr.length) return null;
    let best = 0, bestD = Math.abs(arr[0].v - target);
    for (let k = 1; k < arr.length; k++) {
      const d = Math.abs(arr[k].v - target);
      if (d < bestD) { best = k; bestD = d; }
    }
    return best;
  }
  function farthestIdx(arr, target) {
    if (!arr.length) return null;
    let best = 0, bestD = Math.abs(arr[0].v - target);
    for (let k = 1; k < arr.length; k++) {
      const d = Math.abs(arr[k].v - target);
      if (d > bestD) { best = k; bestD = d; }
    }
    return best;
  }
}

