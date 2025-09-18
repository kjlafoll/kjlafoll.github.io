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
const skipToKDE =
  ((getParam("skipkde") || "").toLowerCase() === "1") ||
  ((getParam("skipkde") || "").toLowerCase() === "true");

const TRAIT_VARIANTS = [
  { adj: 'Liberal', noun: 'Liberality', code: 'liberal' },
  { adj: 'Traditional', noun: 'Traditionality', code: 'traditional' }
];

// Pick one variant and keep it for the whole experiment
const chosenTrait = TRAIT_VARIANTS[Math.random() < 0.5 ? 0 : 1];

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

  function variance(arr) {
    const N=arr.length; if (N<2) return 0;
    const mean = arr.reduce((s,x)=>s+x,0)/N;
    return arr.reduce((s,x)=>s+(x-mean)*(x-mean),0)/(N-1);
  };

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
  const varm = variance(sampledMeans);
  console.log("✅ Median:", med.toFixed(3)); 
  console.log("✅ Variance:", varm.toFixed(3)); 
  console.log("✅ Skew (adj. Fisher–Pearson):", skew.toFixed(3));

  // --- Skip straight to KDE quiz if toggled ---
  if (skipToKDE) {
    // Make sure overlays don’t block the quiz
    const instr = document.getElementById("instructionOverlay");
    if (instr) instr.style.display = "none";
    const popup = document.getElementById("popupOverlay");
    if (popup) popup.style.display = "none";
    popupActive = false;
    inPractice = false;
    trials = [];
    currentTrialIndex = 0;

    // Go directly to KDE quiz
    showKDEQuiz();
    return; // prevent starting practice/main flow
  }
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
    cond = 'r',            // 'r' -> target median ~5; 'l' -> ~3
    cond2 = 'n',           // 'n' -> skew≈0; 'h' -> skew≈±1.5 (sign by cond)
    n = 100,
    medTol = 0.10,
    skewTol = 0.10,
    varTarget = 1.0,
    varTol = 0.10,
    skewTargetstart = 2.0
  } = {}
) {
  const entries = Object.entries(ratingMap).filter(([, v]) => Number.isFinite(v));
  if (entries.length < n) throw new Error(`Need ${n} items; have ${entries.length}.`);

  // --- helpers
  const clamp = (x,a,b)=>Math.max(a,Math.min(b,x));
  const median = arr => {
    const a = [...arr].sort((x,y)=>x-y), N=a.length, m=N>>1;
    return (N&1) ? a[m] : 0.5*(a[m-1]+a[m]);
  };
  const varSample = arr => {
    const N=arr.length; if (N<2) return 0;
    const mean = arr.reduce((s,x)=>s+x,0)/N;
    return arr.reduce((s,x)=>s+(x-mean)*(x-mean),0)/(N-1);
  };
  const skewFisher = arr => {
    const N=arr.length; if (N<3) return 0;
    const mean = arr.reduce((s,x)=>s+x,0)/N;
    const s2 = arr.reduce((s,x)=>s+(x-mean)*(x-mean),0)/(N-1);
    const s = Math.sqrt(s2||1e-12);
    const m3 = arr.reduce((s,x)=>s+(x-mean)*(x-mean)*(x-mean),0);
    return (N*m3)/((N-1)*(N-2)*s*s*s);
  };
  const shuffle = a => { for (let i=a.length-1;i>0;i--){ const j=(Math.random()*(i+1))|0; [a[i],a[j]]=[a[j],a[i]]; } };

  // weighted sample (without replacement)
  function takeKWeighted(pool, weightFn, k){
    const out = [];
    const arr = pool.slice();
    while (out.length < k && arr.length) {
      const w = arr.map(weightFn);
      let sum = 0; for (let i=0;i<w.length;i++) sum += (w[i] > 0 ? w[i] : 0);
      if (sum <= 0) break;
      let r = Math.random() * sum;
      let idx = 0;
      for (; idx < arr.length-1; idx++) {
        r -= (w[idx] > 0 ? w[idx] : 0);
        if (r <= 0) break;
      }
      out.push(arr[idx]);
      arr.splice(idx,1);
    }
    return out;
  }

  const objs = entries.map(([k,v]) => ({k,v}));
  const half = Math.floor(n/2);

  let bestFiles = null, bestErr = Infinity;
  const MAX_RESTARTS = 8;

  for (let attempt = 0; attempt < MAX_RESTARTS; attempt++) {
    // --- targets
    const medBase   = (cond === 'r') ? 5 : 3;
    const medTarget = clamp(medBase + (Math.random()*0.16 - 0.08), 1.1, 6.9);
    const skewTarget = (cond2 === 'n') ? 0 : ((cond === 'r') ? -skewTargetstart : +skewTargetstart);

    const L = objs.filter(o => o.v <= medTarget);
    const R = objs.filter(o => o.v >= medTarget);

    const objective = vals => {
      const m = median(vals), v = varSample(vals), g = skewFisher(vals);
      return (Math.abs(m-medTarget)/medTol)
           + (Math.abs(v-varTarget)/varTol)
           + (Math.abs(g-skewTarget)/skewTol);
    };

    // --- seed
    let pick;

    if (cond2 === 'n') {
      // Unimodal neutral: core chunk tightly around median + tapered shoulders
      const bandCap = 1.5;

      // 1) Core chunk (tight band, uniform)
      let coreFrac = 0.50;                       // take ~50% from tight center
      let coreCount = Math.max( Math.floor(n*0.40), Math.min(Math.floor(n*0.60), Math.floor(n*coreFrac)) );
      let coreBand = 0.02;                       // ±0.22 around median to start
      let corePool = objs.filter(o => Math.abs(o.v - medTarget) <= coreBand);
      while (corePool.length < coreCount && coreBand < 0.45) {
        coreBand += 0.03;
        corePool = objs.filter(o => Math.abs(o.v - medTarget) <= coreBand);
      }
      if (corePool.length < Math.min(10, coreCount)) {
        // If pool is sparse right at the center, relax a bit more
        while (corePool.length < coreCount && coreBand < 0.60) {
          coreBand += 0.05;
          corePool = objs.filter(o => Math.abs(o.v - medTarget) <= coreBand);
        }
      }
      shuffle(corePool);
      const corePick = corePool.slice(0, Math.min(coreCount, corePool.length));

      // 2) Shoulder fill (wider band, distance-weighted)
      const remain = n - corePick.length;
      let shoulderBand = Math.max(0.8, coreBand + 0.4);  // ensure wider than core
      let shoulderPool = objs.filter(o => Math.abs(o.v - medTarget) <= shoulderBand && !corePick.includes(o));
      while (shoulderPool.length < remain && shoulderBand < bandCap) {
        shoulderBand += 0.1;
        shoulderPool = objs.filter(o => Math.abs(o.v - medTarget) <= shoulderBand && !corePick.includes(o));
      }
      const alpha = 1.4; // taper rate (lower -> flatter shoulders)
      let shoulderPick = takeKWeighted(shoulderPool, o => Math.exp(-alpha * Math.abs(o.v - medTarget)), remain);
      if (shoulderPick.length < remain) {
        // last resort: top up uniformly from what's left
        const topUp = shoulderPool.filter(o => !shoulderPick.includes(o)).slice(0, remain - shoulderPick.length);
        shoulderPick = shoulderPick.concat(topUp);
      }

      // Merge
      pick = corePick.concat(shoulderPick);
      if (pick.length < n) {
        // If still short, grab nearest-available items by closeness
        const left = objs.filter(o => !pick.includes(o))
                         .sort((a,b)=>Math.abs(a.v-medTarget)-Math.abs(b.v-medTarget))
                         .slice(0, n - pick.length);
        pick = pick.concat(left);
      }
    } else {
      // Skewed: keep left/right split seeding (then swaps will shape variance + skew)
      const bandCap = 1.5;
      let band = 0.8;
      let Lband = L.filter(o => o.v >= medTarget - band);
      let Rband = R.filter(o => o.v <= medTarget + band);
      while ((Lband.length < half || Rband.length < half) && band < bandCap) {
        band += 0.1;
        Lband = L.filter(o => o.v >= medTarget - band);
        Rband = R.filter(o => o.v <= medTarget + band);
      }
      if (Lband.length >= half && Rband.length >= half) {
        shuffle(Lband); shuffle(Rband);
        const Lpick = Lband.slice(0, half);
        const Rpool = Rband.filter(o => !Lpick.includes(o));
        const Rpick = Rpool.slice(0, half);
        pick = [...Lpick, ...Rpick];
      } else {
        const Ls = [...L]; const Rs = [...R]; shuffle(Ls); shuffle(Rs);
        pick = [...Ls.slice(0, half), ...Rs.slice(0, n-half)];
      }
    }

    // --- greedy unpaired swaps minimizing objective
    const pickVals = pick.map(o => o.v);
    let currErr = objective(pickVals);
    const inPick = new Set(pick.map(o=>o.k));
    const unpick = objs.filter(o => !inPick.has(o.k));

    const MAX_ITERS = 2000;
    const PROPOSALS = 1000;

    for (let it=0; it<MAX_ITERS; it++) {
      let bestI = -1, bestJ = -1, bestSwapErr = currErr;

      for (let t=0; t<PROPOSALS; t++) {
        const i = (Math.random()*pick.length)|0;
        const j = (Math.random()*unpick.length)|0;

        const vi = pick[i].v, vj = unpick[j].v;

        // soft guardrails so we don't wreck the intended center
        if (cond==='r' && vj < 2.4 && vi > 5.6) continue;
        if (cond==='l' && vj > 5.6 && vi < 2.4) continue;

        const old = pickVals[i];
        pickVals[i] = vj;
        const err = objective(pickVals);
        pickVals[i] = old;

        if (err + 1e-12 < bestSwapErr) {
          bestSwapErr = err; bestI = i; bestJ = j;
        }
      }

      if (bestI === -1) break;

      // commit swap
      const tmp = pick[bestI];
      pick[bestI] = unpick[bestJ];
      unpick[bestJ] = tmp;
      pickVals[bestI] = pick[bestI].v;
      currErr = bestSwapErr;

      const m = median(pickVals), v = varSample(pickVals), g = skewFisher(pickVals);
      if (Math.abs(m-medTarget)<=medTol && Math.abs(v-varTarget)<=varTol && Math.abs(g-skewTarget)<=skewTol) {
        const files = pick.map(o => o.k); shuffle(files); return files;
      }
    }

    // check attempt
    {
      const m = median(pickVals), v = varSample(pickVals), g = skewFisher(pickVals);
      if (Math.abs(m-medTarget)<=medTol && Math.abs(v-varTarget)<=varTol && Math.abs(g-skewTarget)<=skewTol) {
        const files = pick.map(o => o.k); shuffle(files); return files;
      }
    }

    if (currErr < bestErr) {
      bestErr = currErr;
      bestFiles = pick.map(o => o.k);
    }
  }

  if (bestFiles) { const files = bestFiles.slice(); shuffle(files); return files; }
  const keys = Object.keys(ratingMap); shuffle(keys); return keys.slice(0, n);
}
