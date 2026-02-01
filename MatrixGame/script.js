let gameData;
let currentGameIndex = 0;
let player1Data = [];
let totalPoints = 0;

// --- ToM battery (frontloaded) ---
let selectedQuestions = []; // array of { inventory, question }
let ToMResponses = [];      // array of { inventory, question, answer }

// ---------- CONFIG ----------
const filePath = './HeddenDataOld.json';
const csvFilePath = 'test_battery2.csv';

// ToM inventories (one question sampled from each)
const columnNames = [
  'FalseBeliefQuestions',
  'IronyQuestions',
  'StrangeStoriesQuestions',
  'HintingQuestions',
  'FauxPasQuestions'
];

// ---------- Utilities ----------
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Keep layout stable: never truly empty the status line
function setStatus(text) {
  const el = document.getElementById("status");
  const t = (text ?? "").trim();
  el.textContent = t === "" ? "\u00A0" : t; // non-breaking space preserves height
}

// Heuristic punctuation restoration for ToM prompts
function fixToMPunctuation(raw) {
  if (!raw) return raw;

  // Normalize newlines/tabs to spaces but keep intentional double-spaces as boundaries
  let t = String(raw)
    .replace(/[\r\n\t]+/g, " ")
    .trim();

  // Split on 2+ spaces (your sentence boundaries)
  const parts = t
    .split(/ {2,}/)
    .map(s => s.trim())
    .filter(Boolean);

  if (parts.length <= 1) {
    // If there are no double-spaces, just normalize single spacing and ensure end punctuation
    t = t.replace(/\s+/g, " ").trim();
    if (!/[.!?]$/.test(t)) t += ".";
    return t;
  }

  // Re-join with proper punctuation between segments.
  // If a segment already ends with punctuation, keep it; otherwise add a period.
  const joined = parts
    .map(seg => {
      const s = seg.replace(/\s+/g, " ").trim();
      return /[.!?]$/.test(s) ? s : (s + ".");
    })
    .join(" ");

  return joined;
}

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

// Make this synchronous
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

// ---------- VFX: dollar sign burst (overlay-only, physics, fade) ----------
function ensureVfxLayer() {
  let layer = document.getElementById("vfxLayer");
  if (!layer) {
    layer = document.createElement("div");
    layer.id = "vfxLayer";
    document.body.appendChild(layer);
  }

  // FORCE overlay styling in JS so CSS parse issues can't break it
  const s = layer.style;
  s.position = "fixed";
  s.left = "0";
  s.top = "0";
  s.right = "0";
  s.bottom = "0";
  s.width = "100vw";
  s.height = "100vh";
  s.pointerEvents = "none";
  s.zIndex = "999999";
  s.overflow = "hidden";
  s.margin = "0";
  s.padding = "0";

  return layer;
}

// Get center of a cell in viewport coords (works great with fixed overlay)
function getCellCenterViewport(cellEl) {
  const r = cellEl.getBoundingClientRect();
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
}

/**
 * pointsAdded: integer payoff (e.g., 1-4)
 * Emits 5 * pointsAdded dollar signs (5,10,15,20)
 */
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
  const gravity = 2200;     // px/s^2 (stronger so you SEE falling)
  const drag = 0.985;       // air resistance
  const lifeMin = 1800;     // ms
  const lifeMax = 2800;     // ms

  for (let i = 0; i < count; i++) {
    const el = document.createElement("span");
    el.className = "dollar-particle";
    el.textContent = "$";

    // FORCE particle styling in JS too (robust to CSS parse issues)
    const st = el.style;
    st.position = "absolute";
    st.left = `${origin.x}px`;
    st.top = `${origin.y}px`;
    st.transform = "translate3d(-50%, -50%, 0)";
    st.fontSize = `${70 + Math.floor(Math.random() * 28)}px`; // BIGGER
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
    const angle = (-Math.PI / 2) + (Math.random() * 1.35 - 0.675); // upward ± ~39°
    const speed = 900 + Math.random() * 700; // px/s (strong burst)

    const vx = Math.cos(angle) * speed;
    const vy = Math.sin(angle) * speed;

    const spin = (Math.random() * 900 - 450); // deg over lifetime
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

      // IMPORTANT: movement is in transform so it never affects layout
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

// ---------- Data loading (promises we can await) ----------
const loadGameDataPromise = fetch(filePath)
  .then(response => {
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  })
  .then(data => {
    // Normalize Trial to number
    const normalized = data.map(g => ({
      ...g,
      Trial: Number(g.Trial),
    }));

    // Keep ONLY first 12 Training trials (by Trial order)
    const training = normalized
      .filter(g => String(g.Round).trim() === "Training")
      .sort((a, b) => a.Trial - b.Trial)
      .slice(0, 12);

    // Keep Test1/Test2, remove catch
    const isCatch = (g) => String(g.GameType || "").trim() === "Catch";

    const test1 = normalized
      .filter(g => String(g.Round).trim() === "Test1" && !isCatch(g))
      .sort((a, b) => a.Trial - b.Trial);

    const test2 = normalized
      .filter(g => String(g.Round).trim() === "Test2" && !isCatch(g))
      .sort((a, b) => a.Trial - b.Trial);

    gameData = [...training, ...test1, ...test2];

    console.log("Filtered gameData length:", gameData.length);
    console.log("Round counts:", {
      Training: training.length,
      Test1: test1.length,
      Test2: test2.length
    });
  })
  .catch(error => console.error('Error loading HeddenDataOld.json:', error));

const loadToMPromise = fetch(csvFilePath)
  .then(response => response.text())
  .then(csvText => {
    const results = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true
    }).data;

    // For each inventory column, pick ONE random valid question
    selectedQuestions = columnNames.map(col => {
      const valid = results
        .map(row => row[col])
        .filter(q => q && q.trim() !== '' && q.trim().toUpperCase() !== 'NA');

      if (!valid.length) {
        console.warn(`No valid ToM questions found for column: ${col}`);
        return { inventory: col, question: "[MISSING QUESTION]" };
      }

      const randIndex = Math.floor(Math.random() * valid.length);
      return { inventory: col, question: valid[randIndex] };
    });

    console.log("Selected ToM questions (1 per inventory):", selectedQuestions);
  })
  .catch(error => {
    console.error('Error loading or parsing ToM CSV:', error);
  });

// ---------- Instructions ----------

// Welcome slide
function showWelcomeSlide() {
  return new Promise(resolve => {
    const overlay = document.getElementById("trialInstructionOverlay");
    const textEl = document.getElementById("trialInstructionText");
    const btn = document.getElementById("continueButton");

    textEl.textContent =
      "Welcome! First we'll ask you to answer 5 questions. After, we'll ask you to play a decision-making game. All together, this should take about 5 minutes.";
    overlay.style.display = "flex";

    const handler = () => {
      overlay.style.display = "none";
      btn.removeEventListener("click", handler);
      resolve();
    };
    btn.addEventListener("click", handler);
  });
}

// ToM question overlay
function askOneToMQuestion(qObj) {
  return new Promise(resolve => {
    const overlay = document.getElementById("tomBatteryOverlay");
    const textEl = document.getElementById("ToMText");
    const btn = document.getElementById("continueButton2");
    const input = document.getElementById("userInstructionInput2");

    const stripped = stripToMPreamble(qObj.question);
    const cleaned = fixToMPunctuation(stripped);

    textEl.textContent = cleaned;

    input.value = '';
    overlay.style.display = "flex";

    const handler = () => {
      const answer = input.value.trim();
      ToMResponses.push({
        inventory: qObj.inventory,
        question: cleaned,
        answer: answer
      });

      overlay.style.display = "none";
      btn.removeEventListener("click", handler);
      resolve();
    };
    btn.addEventListener("click", handler);
  });
}

async function runFrontloadedToMBattery() {
  for (const qObj of selectedQuestions) {
    await askOneToMQuestion(qObj);
  }

  // Save ToM battery as a single “header” entry in player1Data so it gets exported
  player1Data.push({
    tom_questions: selectedQuestions.map(x => ({
      inventory: x.inventory,
      question: fixToMPunctuation(stripToMPreamble(x.question))
    })),
    tom_responses: ToMResponses
  });
}


// Show instruction image overlay (your existing instructionOverlay), uses startButton to advance
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

    // one-time click handler
    const handler = () => {
      instructionOverlay.style.display = "none";
      startButton.removeEventListener("click", handler);
      resolve();
    };
    startButton.addEventListener("click", handler);
  });
}

// Placeholder LLM slide, uses trialInstructionOverlay + continueButton
function showLLMInstructionsSlide() {
  return new Promise(resolve => {
    const overlay = document.getElementById("trialInstructionOverlay");
    const textEl = document.getElementById("trialInstructionText");
    const btn = document.getElementById("continueButton");

    textEl.textContent = "LLM Instructions Go Here";
    overlay.style.display = "flex";

    const handler = () => {
      overlay.style.display = "none";
      btn.removeEventListener("click", handler);
      resolve();
    };
    btn.addEventListener("click", handler);
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

    const handler = () => {
      overlay.style.display = "none";
      btn.removeEventListener("click", handler);
      resolve();
    };
    btn.addEventListener("click", handler);
  });
}

// ---------- Start flow ----------
document.addEventListener("DOMContentLoaded", async function () {
  // Clear board initially
  document.querySelectorAll("#gameBoard span").forEach(span => span.textContent = "");

  // Keep status occupying space from the start
  setStatus("");

  // Ensure both JSON + ToM CSV are loaded before proceeding
  await Promise.all([loadGameDataPromise, loadToMPromise]);

  // Order requested:
  // 1) Welcome slide
  await showWelcomeSlide();

  // 2) ToM intro slide
  await showToMIntroSlide();

  // 3) ToM battery (5 questions)
  await runFrontloadedToMBattery();

  // 3) Instruction image overlay
  await showInstructionImageOverlay();

  // 4) LLM placeholder slide
  await showLLMInstructionsSlide();

  // 5) Start trials
  hideButtons();
  setupGame();
});

//// GAME SETUP
async function setupGame() {
  const controls = document.getElementById("controls");
  controls.innerHTML = '<button id="moveButton">Move</button><button id="stayButton">Stay</button>';

  if (!gameData || currentGameIndex >= gameData.length) {
    setStatus("All trials completed! Thanks for playing.");
    return;
  }

  const game = gameData[currentGameIndex];

  // Top corner updates
  document.getElementById("trialType").textContent = game.Round;

  // Index-based progress since Trial numbers may not be contiguous after filtering
  document.getElementById("trialNumber").textContent = `${currentGameIndex + 1} / ${gameData.length}`;

  // Clear board and highlights
  document.querySelectorAll("#gameBoard span").forEach(span => span.textContent = "");
  document.querySelectorAll("#gameBoard td").forEach(cell => cell.classList.remove("highlight"));

  await delay(700);

  // Parse payoffs
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

  // Start in A
  let currentCell = "A";
  highlightCell(currentCell);

  setStatus(`Trial ${currentGameIndex + 1}: Player 1, make your move!`);

  // Remove & replace buttons to fix duplicate listeners
  const moveButton = document.getElementById("moveButton");
  const stayButton = document.getElementById("stayButton");
  moveButton.replaceWith(moveButton.cloneNode(true));
  stayButton.replaceWith(stayButton.cloneNode(true));

  const updatedMoveButton = document.getElementById("moveButton");
  const updatedStayButton = document.getElementById("stayButton");

  // Start time
  let startTime = new Date().getTime();

  updatedMoveButton.addEventListener("click", () => {
    let decisiontime = new Date().getTime() - startTime;

    // red cap data to save
    if (player1Data.length < (currentGameIndex + 1 + 1)) {
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
        strategy: strategy,
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
    } else {
      setStatus("Player 2 is making their move...");
      hideButtons();

      const delayMs = Math.floor(Math.random() * 2000) + 1000;

      setTimeout(() => {
        const computerAction = decideComputerMove(computerDecisionQuadruplet, game.Type);

        if (computerAction === "stay") {
          setStatus(`Player 2 stayed. Game end at Cell ${currentCell}.`);

          // NOTE: left as your original behavior (adds p1Payoff[1])
          const pointsAdded = p1Payoff[1];  // keeping your existing behavior
          totalPoints += pointsAdded;
          document.getElementById("totalPoints").textContent = totalPoints;
          emitDollarVFX(currentCell, pointsAdded);
          showNextTrialButton();
          return;
        } else {
          currentCell = "C";
          highlightCell(currentCell);
          setStatus("Player 2 moved. Player 1, make your move!");
          showButtons();
        }
      }, delayMs);
    }
  });

  updatedStayButton.addEventListener("click", () => {
    let decisiontime = new Date().getTime() - startTime;

    // red cap data to save
    if (player1Data.length < (currentGameIndex + 1 + 1)) {
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
        strategy: strategy,
        decisionTime: decisiontime,
        P1Payoff: game.P1Payoff,
        P2Payoff: game.P2Payoff,
        Quadruplet: game.Quadruplet,
        GameType: game.GameType
      });
    }

    setStatus(`Player 1 stayed at Cell ${currentCell}. Game end.`);

    const cellIndexMap = { A: 0, B: 1, C: 2, D: 3 };
    const cellIndex = cellIndexMap[currentCell];
    const pointsAdded = p1Payoff[cellIndex];
    totalPoints += pointsAdded;
    document.getElementById("totalPoints").textContent = totalPoints;

    emitDollarVFX(currentCell, pointsAdded);
    showNextTrialButton();
  });
}

function highlightCell(cellId) {
  document.querySelectorAll("#gameBoard td").forEach(cell => cell.classList.remove("highlight"));
  document.getElementById(cellId).classList.add("highlight");
}

function decideComputerMove(quadruplet, player2Type) {
  const decisionIndex = player2Type === "Myopic" ? 0 : 1;
  return quadruplet[decisionIndex] === 1 ? "move" : "stay";
}

function showNextTrialButton() {
  hideButtons();

  const nextButton = document.createElement("button");
  nextButton.textContent = "Next Trial";
  nextButton.id = "nextTrialButton";

  nextButton.addEventListener("click", () => {
    const controls = document.getElementById("controls");
    controls.innerHTML = '<button id="moveButton">Move</button><button id="stayButton">Stay</button>';

    // IMPORTANT: use setStatus("") to preserve height and prevent jump
    setStatus("");

    nextButton.remove();
    currentGameIndex++;

    if (currentGameIndex < gameData.length) {
      setupGame();
    } else {
      // End: show user instruction input overlay
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
    }
  });

  const controls = document.getElementById("controls");
  controls.innerHTML = "";
  controls.appendChild(nextButton);
  controls.style.display = "block";
}

function hideButtons() {
  const controls = document.getElementById("controls");
  controls.classList.add("controls-hidden");
}

function showButtons() {
  const controls = document.getElementById("controls");
  controls.classList.remove("controls-hidden");
}

// ---------- sendToRedCap unchanged ----------
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
  const url = 'https://redcap.case.edu/api/';
  const time = Date.now();
  const timestamp = time.toString();
  const fileContent = JSON.stringify(player1Data);

  const file = new File([fileContent], filename, { type: "application/json" });
  const formData = new FormData();

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

  $.post(url, body)
    .done(function (response) {
      console.log('Creating record to REDCap. Response:', response);
    })
    .fail(function (error) {
      console.error('Failed to create record to REDCap:', error);
    });

  await delay(700);

  formData.append('token', '2C941E2CCA757DF649E150366AD3904E');
  formData.append('content', 'file');
  formData.append('action', 'import');
  formData.append('field', `prt_data_json`);
  formData.append("overwriteBehavior", "normal");
  formData.append('record', timestamp);
  formData.append('file', file);

  $.ajax({
    url: url,
    type: 'POST',
    data: formData,
    contentType: false,
    processData: false,
    success: function (response) {
      console.log('Data sent to REDCap. Response:', response);
    },
    error: function (error) {
      console.error('Failed to send data to REDCap:', error);
    }
  });
}