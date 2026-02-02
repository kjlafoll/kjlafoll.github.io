/***********************
 * Adjustable values
 ***********************/
const CONFIG = {
  // LLM proxy (Cloudflare worker)
  LLM_ENDPOINT: "https://solitary-sea-dff4.kylelafollette.workers.dev",

  // Data files
  GAME_JSON_PATH: "./HeddenDataOld.json",
  TOM_CSV_PATH: "test_battery2.csv",

  // Training slice
  TRAINING_TRIALS_TO_KEEP: 8,

  // Username constraints
  USERNAME_MAX_LEN: 24,
  USERNAME_ALLOWED_RE: /[^\w\- ]/g, // remove anything not letter/number/_/-/space

  // Matchmaking animation timing
  MATCHMAKING_MS_MIN: 5000,
  MATCHMAKING_MS_MAX: 10000,

  // Opponent "thinking" delay
  OPPONENT_DELAY_MS_MIN: 1000,
  OPPONENT_DELAY_MS_MAX: 3000,

  // UI layout stability
  STATUS_PLACEHOLDER: "\u00A0", // non-breaking space

  // VFX physics
  VFX: {
    BASE_PARTICLES: 5,
    PARTICLES_PER_POINT: 5,
    GRAVITY: 2200,
    DRAG: 0.985,
    LIFE_MS_MIN: 1800,
    LIFE_MS_MAX: 2800,
    FONT_SIZE_MIN: 70,
    FONT_SIZE_JITTER: 28,
    SPEED_MIN: 900,
    SPEED_JITTER: 700,
    ANGLE_SPREAD: 1.35,
    ANGLE_CENTER: -Math.PI / 2,
    SPIN_DEG_JITTER: 900
  },

  // ToM inventories (one question sampled from each)
  TOM_COLUMNS: [
    "FalseBeliefQuestions",
    "IronyQuestions",
    "StrangeStoriesQuestions",
    "HintingQuestions",
    "FauxPasQuestions"
  ]
};

/***********************
 * State
 ***********************/
let gameData;
let currentGameIndex = 0;

let player1Data = [];
let totalPoints = 0;

let selectedQuestions = []; // [{ inventory, question }]
let ToMResponses = [];      // [{ inventory, question, answer }]

let llmCache = { Test1: null, Test2: null };
let llmPreloadPromise = null;

let trainingEndIndex = 0;
let test1EndIndex = 0;

let sectionInfo = {
  Training: { start: 0, len: 0 },
  Test1: { start: 0, len: 0 },
  Test2: { start: 0, len: 0 }
};

let player1Username = "";
let opponentUsernames = { Test1: "", Test2: "" };

/***********************
 * Small helpers
 ***********************/
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Keep layout stable: never truly empty the status line
function setStatus(text) {
  const el = document.getElementById("status");
  const t = (text ?? "").trim();
  el.textContent = t === "" ? CONFIG.STATUS_PLACEHOLDER : t;
}

function isTrialRow(row) {
  return row && Object.prototype.hasOwnProperty.call(row, "trial_index");
}

function numTrialRows() {
  return player1Data.reduce((acc, r) => acc + (isTrialRow(r) ? 1 : 0), 0);
}

/***********************
 * Usernames
 ***********************/
function sanitizeUsername(raw) {
  if (!raw) return "";
  return String(raw)
    .trim()
    .slice(0, CONFIG.USERNAME_MAX_LEN)
    .replace(CONFIG.USERNAME_ALLOWED_RE, "");
}

function commitOpponentUsername(phase, rawName) {
  if (phase !== "Test1" && phase !== "Test2") return;

  const clean = sanitizeUsername(rawName);
  if (!clean) return;

  opponentUsernames[phase] = clean;

  // log once when we first learn it
  player1Data.push({
    meta_type: "opponent_username",
    phase,
    opponent_username: clean
  });
}

function logAllUsernamesSnapshot() {
  player1Data.push({
    meta_type: "usernames_snapshot",
    player1_username: player1Username || "",
    opponent_test1_username: opponentUsernames.Test1 || "",
    opponent_test2_username: opponentUsernames.Test2 || ""
  });
}

/***********************
 * Sections
 ***********************/
function getSectionForIndex(globalIndex) {
  if (globalIndex < sectionInfo.Test1.start) return { name: "Training", ...sectionInfo.Training };
  if (globalIndex < sectionInfo.Test2.start) return { name: "Test1", ...sectionInfo.Test1 };
  return { name: "Test2", ...sectionInfo.Test2 };
}

function resetForNewSection(sectionName) {
  totalPoints = 0;
  document.getElementById("totalPoints").textContent = totalPoints;

  player1Data.push({
    meta_type: "section_reset",
    section: sectionName,
    at_global_index: currentGameIndex
  });
}

/***********************
 * LLM instructions
 ***********************/
function sampleIntensities() {
  // 1 = none, 10 = moderately present (per your spec)
  return {
    loaded_language: randInt(1, 10),
    absolutist: randInt(1, 10),
    threat_panic: randInt(1, 10),
    us_vs_them: randInt(1, 10),
    engagement_bait: randInt(1, 10)
  };
}

function zeroIntensities() {
  return {
    loaded_language: 0,
    absolutist: 0,
    threat_panic: 0,
    us_vs_them: 0,
    engagement_bait: 0
  };
}

function fallbackInstructionText(phase) {
  // phase is "Test1" or "Test2" (or any string you pass)
  return (
    `Welcome to the Matrix Game!\n\n` +
    `Your goal is to maximize the number of points you earn over the course of the following trials.\n\n` +
    `Your payoff at the end of each round will be the left number shown in the cell that the game ends on.\n` +
    `You will begin in cell A and can decide to Stay (end the game in the current cell) or Move (to the next cell).\n\n` +
    `You will be playing against another player who receives the right number as payoff and is also trying to maximize their total points.`
  );
}

async function preloadLLMInstructions() {
  const phases = ["Test1", "Test2"];

  const reqs = phases.map(async (phase) => {
    const sampled = sampleIntensities();

    try {
      const res = await fetch(CONFIG.LLM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phase, intensities: sampled })
      });

      if (!res.ok) throw new Error(`LLM proxy HTTP ${res.status}`);

      const obj = await res.json();

      const safeObj = {
        phase,
        model: obj?.model || "proxy",
        text: typeof obj?.text === "string" && obj.text.trim()
          ? obj.text
          : fallbackInstructionText(phase),
        opponent_username: typeof obj?.opponent_username === "string" ? obj.opponent_username : "",
        intensities: obj?.intensities && typeof obj.intensities === "object"
          ? obj.intensities
          : zeroIntensities()
      };

      llmCache[phase] = safeObj;
      commitOpponentUsername(phase, safeObj.opponent_username);

      player1Data.push({
        meta_type: safeObj.model === "fallback" ? "llm_instructions_fallback" : "llm_instructions",
        phase,
        ...safeObj
      });

      if (obj?.error) {
        player1Data.push({
          meta_type: "llm_proxy_error_detail",
          phase,
          error: obj.error
        });
      }

      return safeObj;

    } catch (err) {
      console.warn(`LLM proxy failed for ${phase}. Using fallback.`, err);

      const fallback = {
        phase,
        model: "fallback",
        text: fallbackInstructionText(phase),
        intensities: zeroIntensities()
      };

      llmCache[phase] = fallback;

      player1Data.push({
        meta_type: "llm_instructions_fallback",
        phase,
        error: String(err),
        ...fallback
      });

      return fallback;
    }
  });

  await Promise.all(reqs);
  logAllUsernamesSnapshot();
}

async function getLLMForPhase(phase) {
  if (llmCache[phase]) return llmCache[phase];
  if (llmPreloadPromise) await llmPreloadPromise;
  return llmCache[phase] || { text: "Loading instructions…", intensities: null };
}

/***********************
 * Username entry UI
 ***********************/
function showUsernameEntrySlide() {
  return new Promise(resolve => {
    let overlay = document.getElementById("usernameOverlay");

    if (!overlay) {
      overlay = document.createElement("div");
      overlay.id = "usernameOverlay";

      Object.assign(overlay.style, {
        position: "fixed",
        inset: "0",
        background: "rgba(0,0,0,0.85)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: "1000000"
      });

      overlay.innerHTML = `
        <div style="width:min(560px, 92vw); background:#111; color:#fff; padding:22px; border-radius:14px; box-shadow:0 10px 40px rgba(0,0,0,0.5);">
          <div style="font-size:18px; font-weight:800; margin-bottom:10px;">Choose a username</div>
          <div style="font-size:14px; opacity:0.9; margin-bottom:12px;">
            This will be shown as <b>Player 1</b>. You can leave it blank.
          </div>
          <input id="usernameInput" type="text" placeholder="e.g., BlueTiger_7"
                 style="width:100%; padding:10px 12px; border-radius:10px; border:1px solid #333; background:#0b0b0b; color:#fff; font-size:15px;" />
          <div style="display:flex; gap:10px; margin-top:14px; justify-content:flex-end;">
            <button id="usernameContinue" style="padding:10px 14px; border-radius:10px; border:none; background:#2d6cdf; color:#fff; font-weight:700; cursor:pointer;">
              Continue
            </button>
          </div>
        </div>
      `;
      document.body.appendChild(overlay);
    }

    overlay.style.display = "flex";

    const input = document.getElementById("usernameInput");
    const btn = document.getElementById("usernameContinue");

    input.value = player1Username || "";

    const onContinue = () => {
      player1Username = sanitizeUsername(input.value);

      player1Data.push({
        meta_type: "player1_username",
        player1_username: player1Username
      });

      overlay.style.display = "none";
      btn.removeEventListener("click", onContinue);
      resolve();
    };

    btn.addEventListener("click", onContinue);
    input.focus();
  });
}

/***********************
 * ToM text cleaning
 ***********************/
const TOM_PREAMBLE_RE = new RegExp(
  '^\\s*' +
  'I\\s*(?:am|[’\']m)\\s+going\\s+to\\s+tell\\s+you\\s+a\\s+short\\s+story\\s+about\\s+some\\s+people\\.?\\s+' +
  'At\\s+the\\s+end\\s+of\\s+this\\s+story\\s+a\\s+person\\s+will\\s+say\\s+or\\s+do\\s+something\\.?\\s+' +
  'When\\s+I[’\']?ve\\s+finished\\s+telling\\s+it\\s+I\\s+will\\s+ask\\s+you\\s+some\\s+questions?\\s+about\\s+what\\s+happened\\s+in\\s+the\\s+story\\.?\\s*',
  'i'
);

function stripToMPreamble(raw) {
  if (!raw) return raw;

  // Normalize only newlines/tabs -> spaces, but DO NOT collapse double spaces
  let t = String(raw).replace(/[\r\n\t]+/g, " ").trim();

  // Remove the preamble if it appears at the start
  t = t.replace(TOM_PREAMBLE_RE, "");

  // Keep remaining spacing (including double spaces), just remove leading whitespace
  return t.replace(/^\s+/, "");
}

function fixToMPunctuation(raw) {
  if (!raw) return raw;

  // Normalize newlines/tabs to spaces but keep intentional double-spaces as boundaries
  let t = String(raw).replace(/[\r\n\t]+/g, " ").trim();

  // Split on 2+ spaces (your sentence boundaries)
  const parts = t.split(/ {2,}/).map(s => s.trim()).filter(Boolean);

  if (parts.length <= 1) {
    t = t.replace(/\s+/g, " ").trim();
    if (!/[.!?]$/.test(t)) t += ".";
    return t;
  }

  return parts
    .map(seg => {
      const s = seg.replace(/\s+/g, " ").trim();
      return /[.!?]$/.test(s) ? s : (s + ".");
    })
    .join(" ");
}

/***********************
 * Mobile detection
 ***********************/
function mobileAndTabletCheck() {
  let check = false;
  (function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)
    ) check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
}

const isMobile = mobileAndTabletCheck();
console.log("isMobile:", isMobile);

/***********************
 * VFX (dollar burst)
 ***********************/
function ensureVfxLayer() {
  let layer = document.getElementById("vfxLayer");
  if (!layer) {
    layer = document.createElement("div");
    layer.id = "vfxLayer";
    document.body.appendChild(layer);
  }

  Object.assign(layer.style, {
    position: "fixed",
    left: "0",
    top: "0",
    right: "0",
    bottom: "0",
    width: "100vw",
    height: "100vh",
    pointerEvents: "none",
    zIndex: "999999",
    overflow: "hidden",
    margin: "0",
    padding: "0"
  });

  return layer;
}

function getCellCenterViewport(cellEl) {
  const r = cellEl.getBoundingClientRect();
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
}

function emitDollarVFX(cellId, pointsAdded) {
  if (!pointsAdded || pointsAdded <= 0) return;

  const cellEl = document.getElementById(cellId);
  if (!cellEl) return;

  const layer = ensureVfxLayer();
  const origin = getCellCenterViewport(cellEl);

  // 5 base → 10/15/20 for 2/3/4
  const count = Math.max(5, Math.round(pointsAdded * 5));

  const particles = [];
  const born = performance.now();

  // Physics tuning
  const gravity = 2200;     // px/s^2
  const drag = 0.985;       // air resistance
  const lifeMin = 1800;     // ms
  const lifeMax = 2800;     // ms

  // Show the earned value as the particle text
  const particleText = `${pointsAdded}`;

  for (let i = 0; i < count; i++) {
    const el = document.createElement("span");
    el.className = "dollar-particle";
    el.textContent = particleText;

    // FORCE particle styling in JS too (robust to CSS parse issues)
    const st = el.style;
    st.position = "absolute";
    st.left = `${origin.x}px`;
    st.top = `${origin.y}px`;
    st.transform = "translate3d(-50%, -50%, 0)";
    st.fontSize = `${70 + Math.floor(Math.random() * 28)}px`;
    st.fontWeight = "900";
    st.color = "#18ff5b";
    st.textShadow =
      "0 2px 0 rgba(0,0,0,0.35), 0 0 10px rgba(24,255,91,0.65), 0 0 18px rgba(24,255,91,0.45)";
    st.willChange = "transform, opacity";
    st.userSelect = "none";
    st.pointerEvents = "none";
    st.display = "block";
    st.opacity = "1";

    layer.appendChild(el);

    // Upward burst with random angle spread
    const angle = (-Math.PI / 2) + (Math.random() * 1.35 - 0.675);
    const speed = 900 + Math.random() * 700;

    const vx = Math.cos(angle) * speed;
    const vy = Math.sin(angle) * speed;

    const spin = (Math.random() * 900 - 450);
    const life = lifeMin + Math.random() * (lifeMax - lifeMin);

    particles.push({
      el,
      x: origin.x,
      y: origin.y,
      vx,
      vy,
      spin,
      born,
      life
    });
  }

  let last = performance.now();

  function step(t) {
    const dt = Math.min(0.033, (t - last) / 1000);
    last = t;

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      const age = t - p.born;

      // Integrate physics
      p.vy += gravity * dt;
      p.vx *= Math.pow(drag, 60 * dt);
      p.vy *= Math.pow(drag, 60 * dt);
      p.x += p.vx * dt;
      p.y += p.vy * dt;

      // Fade near end
      const alpha = Math.max(0, 1 - age / p.life);
      const rot = (1 - alpha) * p.spin;

      p.el.style.transform =
        `translate3d(calc(-50% + ${p.x - origin.x}px), calc(-50% + ${p.y - origin.y}px), 0) rotate(${rot}deg)`;
      p.el.style.opacity = alpha.toFixed(3);

      if (age >= p.life) {
        p.el.remove();
        particles.splice(i, 1);
      }
    }

    if (particles.length) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

/***********************
 * Slides / overlays
 ***********************/
function showWelcomeSlide() {
  return new Promise(resolve => {
    const overlay = document.getElementById("trialInstructionOverlay");
    const textEl = document.getElementById("trialInstructionText");
    const btn = document.getElementById("continueButton");

    textEl.textContent =
      "Welcome! First we'll ask you to answer 5 questions. After, we'll ask you to play a decision-making game. All together, this should take about 5 minutes.";
    overlay.style.display = "flex";

    const onContinue = () => {
      overlay.style.display = "none";
      btn.removeEventListener("click", onContinue);
      resolve();
    };

    btn.addEventListener("click", onContinue);
  });
}

function showToMIntroSlide() {
  return new Promise(resolve => {
    const overlay = document.getElementById("trialInstructionOverlay");
    const textEl = document.getElementById("trialInstructionText");
    const btn = document.getElementById("continueButton");

    textEl.textContent =
      "I am going to tell you some short stories about some people. " +
      "At the end of each of these stories a person will say or do something. " +
      "When I’ve finished telling each story, I will ask you a question about what happened in the story.";

    overlay.style.display = "flex";

    const onContinue = () => {
      overlay.style.display = "none";
      btn.removeEventListener("click", onContinue);
      resolve();
    };

    btn.addEventListener("click", onContinue);
  });
}

function showOpponentIntroSlide(opponentNum) {
  return new Promise(resolve => {
    const overlay = document.getElementById("trialInstructionOverlay");
    const textEl = document.getElementById("trialInstructionText");
    const btn = document.getElementById("continueButton");

    textEl.textContent = `You will now play against a real player (Opponent ${opponentNum}).`;
    overlay.style.display = "flex";

    const onContinue = () => {
      overlay.style.display = "none";
      btn.removeEventListener("click", onContinue);
      resolve();
    };

    btn.addEventListener("click", onContinue);
  });
}

function showMatchmakingVisual(opponentUsername = "") {
  return new Promise(resolve => {
    const overlay = document.getElementById("trialInstructionOverlay");
    const textEl = document.getElementById("trialInstructionText");
    const btn = document.getElementById("continueButton");

    btn.style.display = "none";
    overlay.style.display = "flex";

    textEl.innerHTML = `
      <div style="font-size:18px; font-weight:600; margin-bottom:12px;">Matchmaking…</div>
      <div id="mmDots" style="font-size:22px; letter-spacing:3px;">● ○ ○</div>
      <div style="margin-top:12px; font-size:14px; opacity:0.9;">Searching for competitor</div>
    `;

    const dotsEl = document.getElementById("mmDots");
    let k = 0;
    const frames = ["● ○ ○", "○ ● ○", "○ ○ ●"];

    const anim = setInterval(() => {
      if (!dotsEl) return;
      dotsEl.textContent = frames[k % frames.length];
      k++;
    }, 350);

    const ms = randInt(CONFIG.MATCHMAKING_MS_MIN, CONFIG.MATCHMAKING_MS_MAX);

    setTimeout(() => {
      clearInterval(anim);

      const nameLine = opponentUsername
        ? `<div style="font-size:16px; margin-top:6px; opacity:0.95;">Opponent: <b>${opponentUsername}</b></div>`
        : "";

      textEl.innerHTML = `
        <div style="font-size:18px; font-weight:800; margin-bottom:6px;">Competitor found</div>
        ${nameLine}
      `;

      setTimeout(() => {
        overlay.style.display = "none";
        btn.style.display = "";
        resolve();
      }, 3000);
    }, ms);
  });
}

function showLLMInstructionsSlide(instructionsText, metaObj) {
  return new Promise(resolve => {
    const overlay = document.getElementById("trialInstructionOverlay");
    const textEl = document.getElementById("trialInstructionText");
    const btn = document.getElementById("continueButton");

    textEl.textContent = instructionsText || "Loading instructions…";
    overlay.style.display = "flex";

    const onContinue = () => {
      overlay.style.display = "none";
      btn.removeEventListener("click", onContinue);
      resolve();
    };

    btn.addEventListener("click", onContinue);
  });
}

// Uses your existing instructionOverlay, advances via startButton
function showInstructionImageOverlay() {
  return new Promise(resolve => {
    const instructionOverlay = document.getElementById("instructionOverlay");
    const startButton = document.getElementById("startButton");
    const instructionText = document.getElementById("instructionText");

    instructionText.innerHTML = `<strong style="font-size: 20px;">Welcome to the Matrix Game!</strong><br><br>
      Your goal is to maximize the number of points you earn over the course of the following trials.<br><br>
      Your payoff at the end of each round will be the left number shown in the cell that the game ends on.<br>
      You will begin in cell A (as shown below) and can decide to Stay (end the game in the current cell) or Move (to the next cell).<br><br>

      <img src="./images/instructionscreenshot.png" alt="Matrix Game Screenshot" class="instruction-img">

      <br>You will be playing against another player who receives the right number as payoff and is also trying to maximize their total points over the rounds.`;

    instructionOverlay.style.display = "flex";

    const onStart = () => {
      instructionOverlay.style.display = "none";
      startButton.removeEventListener("click", onStart);
      resolve();
    };

    startButton.addEventListener("click", onStart);
  });
}

/***********************
 * ToM battery UI
 ***********************/
function askOneToMQuestion(qObj) {
  return new Promise(resolve => {
    const overlay = document.getElementById("tomBatteryOverlay");
    const textEl = document.getElementById("ToMText");
    const btn = document.getElementById("continueButton2");
    const input = document.getElementById("userInstructionInput2");

    let err = document.getElementById("tomError");
    if (!err) {
      err = document.createElement("div");
      err.id = "tomError";
      err.style.color = "red";
      err.style.marginTop = "10px";
      err.style.fontSize = "14px";
      input.parentElement.appendChild(err);
    }

    const cleaned = fixToMPunctuation(stripToMPreamble(qObj.question));
    textEl.textContent = cleaned;

    input.value = "";
    err.textContent = "";
    overlay.style.display = "flex";

    btn.disabled = true;
    const onInput = () => {
      const ok = input.value.trim().length > 0;
      btn.disabled = !ok;
      if (ok) err.textContent = "";
    };
    input.addEventListener("input", onInput);

    const onContinue = () => {
      const answer = input.value.trim();
      if (!answer) {
        err.textContent = "Please type at least something before continuing.";
        btn.disabled = true;
        return;
      }

      ToMResponses.push({ inventory: qObj.inventory, question: cleaned, answer });

      overlay.style.display = "none";
      btn.removeEventListener("click", onContinue);
      input.removeEventListener("input", onInput);
      resolve();
    };

    btn.addEventListener("click", onContinue);
  });
}

async function runFrontloadedToMBattery() {
  for (const qObj of selectedQuestions) {
    await askOneToMQuestion(qObj);
  }

  player1Data.push({
    meta_type: "tom",
    tom_questions: selectedQuestions.map(x => ({
      inventory: x.inventory,
      question: fixToMPunctuation(stripToMPreamble(x.question))
    })),
    tom_responses: ToMResponses
  });
}

/***********************
 * Data loading
 ***********************/
const loadGameDataPromise = fetch(CONFIG.GAME_JSON_PATH)
  .then(response => {
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  })
  .then(data => {
    const normalized = data.map(g => ({ ...g, Trial: Number(g.Trial) }));

    const training = normalized
      .filter(g => String(g.Round).trim() === "Training")
      .sort((a, b) => a.Trial - b.Trial)
      .slice(0, CONFIG.TRAINING_TRIALS_TO_KEEP);

    const isCatch = (g) => String(g.GameType || "").trim() === "Catch";

    const test1 = normalized
      .filter(g => String(g.Round).trim() === "Test1" && !isCatch(g))
      .sort((a, b) => a.Trial - b.Trial);

    const test2 = normalized
      .filter(g => String(g.Round).trim() === "Test2" && !isCatch(g))
      .sort((a, b) => a.Trial - b.Trial);

    trainingEndIndex = training.length;
    test1EndIndex = training.length + test1.length;

    sectionInfo.Training = { start: 0, len: training.length };
    sectionInfo.Test1 = { start: training.length, len: test1.length };
    sectionInfo.Test2 = { start: training.length + test1.length, len: test2.length };

    gameData = [...training, ...test1, ...test2];

    console.log("Filtered gameData length:", gameData.length);
    console.log("Round counts:", { Training: training.length, Test1: test1.length, Test2: test2.length });
  })
  .catch(error => console.error("Error loading HeddenDataOld.json:", error));

const loadToMPromise = fetch(CONFIG.TOM_CSV_PATH)
  .then(response => response.text())
  .then(csvText => {
    const results = Papa.parse(csvText, { header: true, skipEmptyLines: true }).data;

    selectedQuestions = CONFIG.TOM_COLUMNS.map(col => {
      const valid = results
        .map(row => row[col])
        .filter(q => q && q.trim() !== "" && q.trim().toUpperCase() !== "NA");

      if (!valid.length) {
        console.warn(`No valid ToM questions found for column: ${col}`);
        return { inventory: col, question: "[MISSING QUESTION]" };
      }

      const randIndex = Math.floor(Math.random() * valid.length);
      return { inventory: col, question: valid[randIndex] };
    });

    console.log("Selected ToM questions (1 per inventory):", selectedQuestions);
  })
  .catch(error => console.error("Error loading or parsing ToM CSV:", error));

/***********************
 * Game logic
 ***********************/
function highlightCell(cellId) {
  document.querySelectorAll("#gameBoard td").forEach(cell => cell.classList.remove("highlight"));
  document.getElementById(cellId).classList.add("highlight");
}

function decideComputerMove(quadruplet, player2Type) {
  const decisionIndex = player2Type === "Myopic" ? 0 : 1;
  return quadruplet[decisionIndex] === 1 ? "move" : "stay";
}

function hideButtons() {
  document.getElementById("controls").classList.add("controls-hidden");
}

function showButtons() {
  document.getElementById("controls").classList.remove("controls-hidden");
}

async function setupGame() {
  const controls = document.getElementById("controls");
  controls.innerHTML = '<button id="moveButton">Move</button><button id="stayButton">Stay</button>';

  if (!gameData || currentGameIndex >= gameData.length) {
    setStatus("All trials completed! Thanks for playing.");
    return;
  }

  const game = gameData[currentGameIndex];
  const sec = getSectionForIndex(currentGameIndex);
  const sectionTrialNum = (currentGameIndex - sec.start) + 1;

  // Top corner UI
  if (sec.name === "Training") {
    document.getElementById("trialType").textContent = "None (Training)";
  } else {
    const opp = (opponentUsernames?.[sec.name] || "").trim();
    document.getElementById("trialType").textContent = opp || sec.name;
  }

  document.getElementById("trialNumber").textContent = `${sectionTrialNum} / ${sec.len}`;

  // Reset board
  document.querySelectorAll("#gameBoard span").forEach(span => (span.textContent = ""));
  document.querySelectorAll("#gameBoard td").forEach(cell => cell.classList.remove("highlight"));

  await delay(700);

  const p1Payoff = game.P1Payoff.split(" ").map(Number);
  const p2Payoff = game.P2Payoff.split(" ").map(Number);
  const computerDecisionQuadruplet = game.Quadruplet.split(" ").map(Number);

  // Fill board
  document.getElementById("A-p1").textContent = p1Payoff[0];
  document.getElementById("A-p2").textContent = p2Payoff[0];
  document.getElementById("B-p1").textContent = p1Payoff[1];
  document.getElementById("B-p2").textContent = p2Payoff[1];
  document.getElementById("C-p1").textContent = p1Payoff[2];
  document.getElementById("C-p2").textContent = p2Payoff[2];
  document.getElementById("D-p1").textContent = p1Payoff[3];
  document.getElementById("D-p2").textContent = p2Payoff[3];

  showButtons();

  let currentCell = "A";
  highlightCell(currentCell);

  const p1Label = (player1Username && player1Username.trim()) ? player1Username.trim() : "Player 1";
  setStatus(`${p1Label}, make your move!`);

  // Replace buttons to avoid duplicate listeners
  const moveButton = document.getElementById("moveButton");
  const stayButton = document.getElementById("stayButton");
  moveButton.replaceWith(moveButton.cloneNode(true));
  stayButton.replaceWith(stayButton.cloneNode(true));

  const updatedMoveButton = document.getElementById("moveButton");
  const updatedStayButton = document.getElementById("stayButton");

  const startTime = Date.now();

  updatedMoveButton.addEventListener("click", () => {
    const decisiontime = Date.now() - startTime;

    if (numTrialRows() < (currentGameIndex + 1)) {
      const quadruplet = game.Quadruplet.split(" ").map(Number);

      let strategy = "trivial";
      const isTest = String(game.Round).startsWith("Test");
      if (isTest) {
        if (1 === quadruplet[2]) strategy = "myopic";
        else if (1 === quadruplet[3]) strategy = "predictive";
      }

      player1Data.push({
        trial: game.Trial,
        trial_index: currentGameIndex + 1,
        round: game.Round,
        first_move: "move",
        strategy,
        decisionTime: decisiontime,
        P1Payoff: game.P1Payoff,
        P2Payoff: game.P2Payoff,
        Quadruplet: game.Quadruplet,
        GameType: game.GameType
      });
    }

    if (currentCell === "A") currentCell = "B";
    else if (currentCell === "B") currentCell = "C";
    else if (currentCell === "C") currentCell = "D";
    else {
      setStatus("Game already ended!");
      return;
    }

    highlightCell(currentCell);

    if (currentCell === "D") {
      setStatus("Game end!");

      const pointsAdded = p1Payoff[3];
      totalPoints += pointsAdded;
      document.getElementById("totalPoints").textContent = totalPoints;

      emitDollarVFX(currentCell, pointsAdded);
      showNextTrialButton();
      return;
    }

    const oppLabel = (sec.name === "Training")
      ? "Player 2"
      : ((opponentUsernames?.[sec.name] || "").trim() || "Player 2");

    setStatus(`${oppLabel} is making their move...`);
    hideButtons();

    const delayMs = randInt(CONFIG.OPPONENT_DELAY_MS_MIN, CONFIG.OPPONENT_DELAY_MS_MAX);

    setTimeout(() => {
      const computerAction = decideComputerMove(computerDecisionQuadruplet, game.Type);

      if (computerAction === "stay") {
        const oppLabel2 = (sec.name === "Training")
          ? "Player 2"
          : ((opponentUsernames?.[sec.name] || "").trim() || "Player 2");

        setStatus(`${oppLabel2} stayed. Game end at Cell ${currentCell}.`);

        // NOTE: left as your original behavior (adds p1Payoff[1])
        const pointsAdded = p1Payoff[1];
        totalPoints += pointsAdded;
        document.getElementById("totalPoints").textContent = totalPoints;

        emitDollarVFX(currentCell, pointsAdded);
        showNextTrialButton();
        return;
      }

      currentCell = "C";
      highlightCell(currentCell);

      const oppLabel3 = (sec.name === "Training")
        ? "Player 2"
        : ((opponentUsernames?.[sec.name] || "").trim() || "Player 2");

      setStatus(`${oppLabel3} moved. ${p1Label}, make your move!`);
      showButtons();
    }, delayMs);
  });

  updatedStayButton.addEventListener("click", () => {
    const decisiontime = Date.now() - startTime;

    if (numTrialRows() < (currentGameIndex + 1)) {
      const quadruplet = game.Quadruplet.split(" ").map(Number);

      let strategy = "trivial";
      const isTest = String(game.Round).startsWith("Test");
      if (isTest) {
        if (0 === quadruplet[2]) strategy = "myopic";
        else if (0 === quadruplet[3]) strategy = "predictive";
      }

      player1Data.push({
        trial: game.Trial,
        trial_index: currentGameIndex + 1,
        round: game.Round,
        first_move: "stay",
        strategy,
        decisionTime: decisiontime,
        P1Payoff: game.P1Payoff,
        P2Payoff: game.P2Payoff,
        Quadruplet: game.Quadruplet,
        GameType: game.GameType
      });
    }

    setStatus(`${p1Label} stayed at Cell ${currentCell}. Game end.`);

    const cellIndexMap = { A: 0, B: 1, C: 2, D: 3 };
    const pointsAdded = p1Payoff[cellIndexMap[currentCell]];

    totalPoints += pointsAdded;
    document.getElementById("totalPoints").textContent = totalPoints;

    emitDollarVFX(currentCell, pointsAdded);
    showNextTrialButton();
  });
}

function showNextTrialButton() {
  const controls = document.getElementById("controls");
  controls.classList.remove("controls-hidden");
  controls.style.visibility = "visible";
  controls.style.pointerEvents = "auto";

  controls.innerHTML = "";

  const nextButton = document.createElement("button");
  nextButton.textContent = "Next Trial";
  nextButton.id = "nextTrialButton";
  controls.appendChild(nextButton);

  nextButton.addEventListener("click", async () => {
    controls.innerHTML = '<button id="moveButton">Move</button><button id="stayButton">Stay</button>';

    setStatus("");
    currentGameIndex++;

    if (currentGameIndex === trainingEndIndex) {
      resetForNewSection("Test1");

      const llm1 = await getLLMForPhase("Test1");
      commitOpponentUsername("Test1", llm1.opponent_username);

      await showOpponentIntroSlide(1);
      await showMatchmakingVisual(llm1.opponent_username || "");
      await showLLMInstructionsSlide(llm1.text, llm1);
    }

    if (currentGameIndex === test1EndIndex) {
      resetForNewSection("Test2");

      const llm2 = await getLLMForPhase("Test2");
      commitOpponentUsername("Test2", llm2.opponent_username);

      await showOpponentIntroSlide(2);
      await showMatchmakingVisual(llm2.opponent_username || "");
      await showLLMInstructionsSlide(llm2.text, llm2);
    }

    if (currentGameIndex < gameData.length) {
      setupGame();
      return;
    }

    document.getElementById("gameBoard").style.display = "none";
    document.getElementById("controls").style.display = "none";
    setStatus("");

    document.getElementById("userInstructionOverlay").style.display = "flex";

    document.getElementById("submitUserInstructions").addEventListener("click", function () {
      const instructions = document.getElementById("userInstructionInput").value.trim();
      if (instructions) {
        player1Data.push({ instructions });
        document.getElementById("userInstructionOverlay").style.display = "none";
        setStatus("All trials completed! Sending data...");
        sendToRedCap();
      } else {
        alert("Please enter instructions before submitting.");
      }
    });
  });
}

/***********************
 * Start flow
 ***********************/
document.addEventListener("DOMContentLoaded", async () => {
  document.querySelectorAll("#gameBoard span").forEach(span => (span.textContent = ""));
  setStatus("");

  await Promise.all([loadGameDataPromise, loadToMPromise]);
  llmPreloadPromise = preloadLLMInstructions();

  await showWelcomeSlide();
  await showToMIntroSlide();
  await runFrontloadedToMBattery();

  await showUsernameEntrySlide();
  await showInstructionImageOverlay();

  hideButtons();
  setupGame();
});

/***********************
 * sendToRedCap unchanged
 ***********************/
async function sendToRedCap() {
  console.log("Saving data locally before sending to REDCap...");
  const filename = `player_data.json`;

  const dataStr = JSON.stringify(player1Data, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url_local = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url_local;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  console.log("Local JSON file saved:", filename);

  console.log("Preparing to send responses to REDCap");
  const url = "https://redcap.case.edu/api/";
  const time = Date.now();
  const timestamp = time.toString();
  const fileContent = JSON.stringify(player1Data);

  const file = new File([fileContent], filename, { type: "application/json" });
  const formData = new FormData();

  const dataDict = { record_id: timestamp };

  const body = {
    method: "POST",
    token: "2C941E2CCA757DF649E150366AD3904E",
    content: "record",
    format: "json",
    type: "flat",
    overwriteBehavior: "normal",
    forceAutoNumber: "false",
    data: JSON.stringify([dataDict]),
    returnContent: "count",
    returnFormat: "json"
  };

  $.post(url, body)
    .done(function (response) {
      console.log("Creating record to REDCap. Response:", response);
    })
    .fail(function (error) {
      console.error("Failed to create record to REDCap:", error);
    });

  await delay(700);

  formData.append("token", "2C941E2CCA757DF649E150366AD3904E");
  formData.append("content", "file");
  formData.append("action", "import");
  formData.append("field", `prt_data_json`);
  formData.append("overwriteBehavior", "normal");
  formData.append("record", timestamp);
  formData.append("file", file);

  $.ajax({
    url: url,
    type: "POST",
    data: formData,
    contentType: false,
    processData: false,
    success: function (response) {
      console.log("Data sent to REDCap. Response:", response);
    },
    error: function (error) {
      console.error("Failed to send data to REDCap:", error);
    }
  });
}