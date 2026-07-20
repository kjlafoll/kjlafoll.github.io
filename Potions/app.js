const BOARD_WIDTH = 1200;
const BOARD_HEIGHT = 760;
const WORKER_RADIUS = 28;
const PROXIMITY_THRESHOLD = 205;
const MIN_GROUP_SIZE = 2;
const RESERVED_SIDEBAR_WIDTH = 360;
const ANIMATION_STEP_MS = 130;
const MAX_ROUNDS = 72;
const BASELINE_EMPLOYEE_COUNT = 8;
const STARTING_EMPLOYEE_COUNT = 2;
const MAX_EMPLOYEES = 16;
const PLAYER_VALUE_MULTIPLIER = 10000;
const INITIAL_COMPANY_CASH = 5000000;

const WORKER_PROFILES = [
  { id: "W1", name: "Maya", skin: "#f1c27d", hair: "#2f1b12", outfit: "#ef4444", accent: "#fca5a5", hairStyle: "bun", accessory: "earring", bodyStyle: "cloak" },
  { id: "W2", name: "Jonah", skin: "#c68642", hair: "#111827", outfit: "#22c55e", accent: "#86efac", hairStyle: "short", accessory: "glasses", bodyStyle: "jacket" },
  { id: "W3", name: "Priya", skin: "#e0ac69", hair: "#3f2a1d", outfit: "#06b6d4", accent: "#67e8f9", hairStyle: "wave", accessory: "scarf", bodyStyle: "robe" },
  { id: "W4", name: "Elena", skin: "#f1c27d", hair: "#7c2d12", outfit: "#eab308", accent: "#fde68a", hairStyle: "bob", accessory: "glasses", bodyStyle: "vest" },
  { id: "W5", name: "Marcus", skin: "#8d5524", hair: "#1f2937", outfit: "#8b5cf6", accent: "#c4b5fd", hairStyle: "curl", accessory: "beard", bodyStyle: "jacket" },
  { id: "W6", name: "Nia", skin: "#ffdbac", hair: "#0f172a", outfit: "#ec4899", accent: "#f9a8d4", hairStyle: "puff", accessory: "earring", bodyStyle: "tunic" },
  { id: "W7", name: "Omar", skin: "#c68642", hair: "#422006", outfit: "#f97316", accent: "#fdba74", hairStyle: "fade", accessory: "mustache", bodyStyle: "vest" },
  { id: "W8", name: "Sofia", skin: "#e0ac69", hair: "#4c1d95", outfit: "#3b82f6", accent: "#93c5fd", hairStyle: "ponytail", accessory: "scarf", bodyStyle: "cloak" }
];

const BASE_WORKERS = WORKER_PROFILES.map((profile) => ({
  id: profile.id,
  name: profile.name,
  profile
}));

const BASE_POTIONS = ["a1", "a2", "a3", "b1", "b2", "b3"];
const TIER_LABELS = ["Base", "Tier 1", "Tier 2", "Tier 3", "Tier 4"];

const POTIONS = {
  a1: { id: "a1", weight: 6, tier: 0, discoverScore: 0 },
  a2: { id: "a2", weight: 8, tier: 0, discoverScore: 0 },
  a3: { id: "a3", weight: 10, tier: 0, discoverScore: 0 },
  b1: { id: "b1", weight: 6, tier: 0, discoverScore: 0 },
  b2: { id: "b2", weight: 8, tier: 0, discoverScore: 0 },
  b3: { id: "b3", weight: 10, tier: 0, discoverScore: 0 },
  A1: { id: "A1", weight: 15, tier: 1, discoverScore: 48 },
  A2: { id: "A2", weight: 20, tier: 2, discoverScore: 109 },
  A3: { id: "A3", weight: 25, tier: 3, discoverScore: 188 },
  A4: { id: "A4", weight: 30, tier: 4, discoverScore: 358 },
  B1: { id: "B1", weight: 15, tier: 1, discoverScore: 48 },
  B2: { id: "B2", weight: 20, tier: 2, discoverScore: 109 },
  B3: { id: "B3", weight: 25, tier: 3, discoverScore: 188 },
  B4: { id: "B4", weight: 30, tier: 4, discoverScore: 358 }
};

const POTION_META = {
  a1: { name: "Rose Ember", glyph: "&#10022;", top: "#fda4af", bottom: "#fb7185" },
  a2: { name: "Mint Current", glyph: "&#10035;", top: "#6ee7b7", bottom: "#14b8a6" },
  a3: { name: "Sun Bloom", glyph: "&#10057;", top: "#fde68a", bottom: "#f59e0b" },
  b1: { name: "Sky Pulse", glyph: "&#10022;", top: "#7dd3fc", bottom: "#3b82f6" },
  b2: { name: "Moon Violet", glyph: "&#10038;", top: "#c4b5fd", bottom: "#8b5cf6" },
  b3: { name: "Frost Glass", glyph: "&#10053;", top: "#bfdbfe", bottom: "#60a5fa" },
  A1: { name: "Rose Bloom", glyph: "&#10022;", top: "#f9a8d4", bottom: "#ec4899" },
  A2: { name: "Verdant Arc", glyph: "&#10035;", top: "#86efac", bottom: "#22c55e" },
  A3: { name: "Golden Crest", glyph: "&#10057;", top: "#fcd34d", bottom: "#f59e0b" },
  A4: { name: "Aurora Crown", glyph: "&#10023;", top: "#f9a8d4", bottom: "#8b5cf6" },
  B1: { name: "Azure Bloom", glyph: "&#10022;", top: "#93c5fd", bottom: "#2563eb" },
  B2: { name: "Violet Tide", glyph: "&#10038;", top: "#ddd6fe", bottom: "#7c3aed" },
  B3: { name: "Crystal Wake", glyph: "&#10053;", top: "#a5f3fc", bottom: "#06b6d4" },
  B4: { name: "Starfire Crown", glyph: "&#10023;", top: "#fde68a", bottom: "#7c3aed" }
};

const VALID_RECIPES = [
  { inputs: ["a1", "a2", "a3"], output: "A1" },
  { inputs: ["b1", "b2", "b3"], output: "B1" },
  { inputs: ["A1", "a1", "a2"], output: "A2" },
  { inputs: ["B1", "b1", "b2"], output: "B2" },
  { inputs: ["A2", "a2", "a3"], output: "A3" },
  { inputs: ["B2", "b2", "b3"], output: "B3" },
  { inputs: ["A3", "B3", "a3"], output: "A4" },
  { inputs: ["A3", "B3", "b3"], output: "B4" }
];

const RECIPE_BOOK = new Map(VALID_RECIPES.map((recipe) => [canonicalTriad(recipe.inputs), recipe.output]));
const DISCOVERY_POTIONS = Object.keys(POTIONS).filter((potionId) => POTIONS[potionId].tier > 0);
const TERMINAL_POTIONS = ["A4", "B4"];
const TRACKER_STAGES = [
  { id: "A1", kind: "path", family: "a" },
  { id: "A2", kind: "path", family: "a" },
  { id: "A3", kind: "path", family: "a" },
  { id: "B1", kind: "path", family: "b" },
  { id: "B2", kind: "path", family: "b" },
  { id: "B3", kind: "path", family: "b" },
  { id: "CURE", kind: "cure", family: "cure" }
];
const STAGE_PLAYER_VALUES = {
  A1: roundToHundredThousand(POTIONS.A1.discoverScore * PLAYER_VALUE_MULTIPLIER),
  A2: roundToHundredThousand(POTIONS.A2.discoverScore * PLAYER_VALUE_MULTIPLIER),
  A3: roundToHundredThousand(POTIONS.A3.discoverScore * PLAYER_VALUE_MULTIPLIER),
  B1: roundToHundredThousand(POTIONS.B1.discoverScore * PLAYER_VALUE_MULTIPLIER),
  B2: roundToHundredThousand(POTIONS.B2.discoverScore * PLAYER_VALUE_MULTIPLIER),
  B3: roundToHundredThousand(POTIONS.B3.discoverScore * PLAYER_VALUE_MULTIPLIER),
  CURE: roundToHundredThousand(POTIONS.A4.discoverScore * PLAYER_VALUE_MULTIPLIER)
};
const TOTAL_PLAYER_REVENUE = Object.values(STAGE_PLAYER_VALUES).reduce((sum, value) => sum + value, 0);
const BASE_PAYROLL_PER_ROUND = TOTAL_PLAYER_REVENUE / 75;
const PAYROLL_PER_EMPLOYEE = BASE_PAYROLL_PER_ROUND / BASELINE_EMPLOYEE_COUNT;
const TUTORIAL_STEPS = [
  {
    step: "Mission",
    title: "You run a chemical company.",
    body: "Every first-time compound discovery becomes a profitable product for the company. Your job is to organize chemists so they uncover both pathways and eventually the final crossover breakthrough.",
    target: "#board"
  },
  {
    step: "Workspace",
    title: "The grid is your whole workspace.",
    body: "Drag chemists anywhere on the board. Their positions determine who ends up in the same team and how knowledge spreads.",
    target: "#board"
  },
  {
    step: "Employees",
    title: "This controls your active employees.",
    body: "Use the plus button to add chemists and the minus button on a chemist to remove them. Every active chemist must belong to a group of at least two before a round can begin.",
    target: ".hud-staff",
    extraHighlights: [".worker-remove-btn"]
  },
  {
    step: "Pathways",
    title: "Track both pathways and watch specialties form.",
    body: "The pathway card shows progress on the A and B product lines. Specialization badges on chemists tell you when someone has started to strongly favor one pathway over the other.",
    target: ".board-reward-track",
    extraHighlights: [".specialization-badge"]
  },
  {
    step: "Funds",
    title: "Company funds rise and fall here.",
    body: "Discovery rewards push company funds upward. Payroll and long dry spells drain the company's cash.",
    target: ".hud-money"
  },
  {
    step: "Payroll",
    title: "Payroll is your constant cost.",
    body: "This updates with your workforce size. If you let company funds fall to zero before the final breakthrough, the company goes bankrupt.",
    target: ".hud-payroll"
  },
  {
    step: "Next Round",
    title: "Run rounds from this button.",
    body: "Press Next round to let chemists act. In Fast mode, the system keeps advancing until a discovery appears or until you press Stop. The outer ring pulses every round so you can see time passing.",
    target: "#next-round-wrap"
  }
];

const els = {
  nextRoundWrap: document.getElementById("next-round-wrap"),
  nextRoundBtn: document.getElementById("next-round-btn"),
  roundRingProgress: document.getElementById("round-ring-progress"),
  leaderScore: document.getElementById("leader-score"),
  payrollScore: document.getElementById("payroll-score"),
  staffCount: document.getElementById("staff-count"),
  rewardTrack: document.getElementById("reward-track"),
  hireBtn: document.getElementById("hire-btn"),
  workersLayer: document.getElementById("workers-layer"),
  halos: document.getElementById("group-halos"),
  beams: document.getElementById("group-beams"),
  board: document.getElementById("board"),
  eventPopup: document.getElementById("event-popup"),
  eventPopupTitle: document.getElementById("event-popup-title"),
  eventPopupBody: document.getElementById("event-popup-body"),
  eventPopupClose: document.getElementById("event-popup-close"),
  onboardingOverlay: document.getElementById("onboarding-overlay"),
  onboardingStep: document.getElementById("onboarding-step"),
  onboardingTitle: document.getElementById("onboarding-title"),
  onboardingBody: document.getElementById("onboarding-body"),
  tutorialSpotlight: document.getElementById("tutorial-spotlight"),
  onboardingCard: document.querySelector(".onboarding-card"),
  tutorialProgress: document.getElementById("tutorial-progress"),
  modePicker: document.getElementById("mode-picker"),
  modeOneBtn: document.getElementById("mode-one-btn"),
  modeOneFastBtn: document.getElementById("mode-one-fast-btn"),
  tutorialToggles: [...document.querySelectorAll(".skip-tutorial-toggle")],
  skipTutorialCheckbox: document.getElementById("skip-tutorial-checkbox"),
  endlessRoundsCheckbox: document.getElementById("endless-rounds-checkbox"),
  tutorialActions: document.getElementById("tutorial-actions"),
  tutorialBackBtn: document.getElementById("tutorial-back-btn"),
  tutorialNextBtn: document.getElementById("tutorial-next-btn")
};

let state = createInitialState();
let dragState = null;
let cashAnimationTimer = null;
let moneyBurstCleanupTimer = null;

initialize();

function initialize() {
  bindEvents();
  render();
}

function createInitialState() {
  const workers = Array.from({ length: STARTING_EMPLOYEE_COUNT }, (_, index) => createWorker(index));

  return {
    sessionId: `potions-${Date.now()}`,
    round: 1,
    status: "Arrange workers",
    workers,
    edges: [],
    groups: [],
    roundHistory: [],
    mode: null,
    onboardingStage: "mode",
    tutorialStep: 0,
    gameOver: false,
    isAnimating: false,
    autoRunning: false,
    stopRequested: false,
    unlimitedRounds: false,
    popup: null,
    companyCash: INITIAL_COMPANY_CASH,
    totalRevenue: 0,
    totalPayroll: 0,
    nextWorkerIndex: STARTING_EMPLOYEE_COUNT,
    discoveredStageRewards: new Set(),
    story: "No round has run yet. Arrange your chemists into groups, adjust staffing if needed, then press <strong>Next round</strong>."
  };
}

function emptyLastRound() {
  return {
    made: [],
    received: [],
    interaction: null
  };
}

function bindEvents() {
  els.nextRoundBtn.addEventListener("click", runRoundSequence);
  els.hireBtn.addEventListener("click", hireWorker);
  els.modeOneBtn.addEventListener("click", () => selectMode("mode1"));
  els.modeOneFastBtn.addEventListener("click", () => selectMode("mode1fast"));
  els.tutorialBackBtn.addEventListener("click", handleTutorialBack);
  els.tutorialNextBtn.addEventListener("click", handleTutorialNext);
  els.eventPopupClose.addEventListener("click", dismissPopup);
  window.addEventListener("pointermove", handlePointerMove);
  window.addEventListener("pointerup", stopDragging);
  window.addEventListener("pointercancel", stopDragging);
}

function render() {
  computeNetwork();
  renderHeader();
  renderBoard();
  renderPopup();
  renderOnboarding();
}

function renderHeader() {
  const discovered = discoveredPotions();
  const progress = trackerProgress(discovered);
  els.leaderScore.textContent = formatMoney(state.companyCash);
  els.payrollScore.textContent = formatMoney(payrollForCount(state.workers.length));
  els.staffCount.textContent = String(state.workers.length);
  els.rewardTrack.innerHTML = renderCureTracker(progress.foundStages, state.gameOver && !hasCure(discovered));
  els.nextRoundBtn.textContent = state.gameOver ? "Complete" : state.autoRunning ? (state.stopRequested ? "Stopping..." : "Stop") : "Next round";
  els.nextRoundBtn.disabled = (state.isAnimating && !state.autoRunning) || state.gameOver || state.onboardingStage !== "done";
  els.hireBtn.disabled = state.isAnimating || state.gameOver || state.onboardingStage !== "done" || state.autoRunning || state.workers.length >= MAX_EMPLOYEES;
  els.nextRoundWrap.classList.toggle("running", state.isAnimating || state.autoRunning);
}

function renderBoard() {
  els.halos.innerHTML = "";
  els.beams.innerHTML = "";
  els.workersLayer.innerHTML = "";

  state.groups.forEach((group) => {
    if (group.members.length < 2) {
      return;
    }
    const halo = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
    halo.setAttribute("class", "group-halo");
    halo.setAttribute("cx", String(group.halo.cx));
    halo.setAttribute("cy", String(group.halo.cy));
    halo.setAttribute("rx", String(group.halo.rx));
    halo.setAttribute("ry", String(group.halo.ry));
    els.halos.appendChild(halo);

    const teamLabel = document.createElement("div");
    teamLabel.className = "team-label";
    teamLabel.style.left = `${(group.halo.cx / BOARD_WIDTH) * 100}%`;
    teamLabel.style.top = `${(Math.max(24, group.halo.cy - group.halo.ry - 10) / BOARD_HEIGHT) * 100}%`;
    teamLabel.textContent = group.teamName;
    els.workersLayer.appendChild(teamLabel);

    const knowledge = document.createElement("div");
    knowledge.className = "group-knowledge";
    const safeRightEdge = BOARD_WIDTH - RESERVED_SIDEBAR_WIDTH;
    const preferredRightX = group.halo.cx + group.halo.rx + 56;
    const fallbackLeftX = group.halo.cx - group.halo.rx - 56;
    const knowledgeX = preferredRightX > safeRightEdge
      ? Math.max(86, fallbackLeftX)
      : Math.min(safeRightEdge - 24, preferredRightX);
    knowledge.style.left = `${(knowledgeX / BOARD_WIDTH) * 100}%`;
    knowledge.style.top = `${(Math.max(18, group.halo.cy - 16) / BOARD_HEIGHT) * 100}%`;
    knowledge.innerHTML = `
      <span class="group-knowledge-label">Shared</span>
      <div class="potion-list">${sharedGroupKnowledge(group).map((potionId) => renderPotionToken(potionId, "sm")).join("")}</div>
    `;
    els.workersLayer.appendChild(knowledge);
  });

  state.workers.forEach((worker) => {
    const node = document.createElement("div");
    node.className = "worker-node";
    node.style.left = `${(worker.x / BOARD_WIDTH) * 100}%`;
    node.style.top = `${(worker.y / BOARD_HEIGHT) * 100}%`;
    node.style.setProperty("--worker-skin", worker.profile.skin);
    node.style.setProperty("--worker-hair", worker.profile.hair);
    node.style.setProperty("--worker-outfit", worker.profile.outfit);
    node.style.setProperty("--worker-accent", worker.profile.accent);
    node.style.setProperty("--worker-accessory", worker.profile.accent);
    node.dataset.workerId = worker.id;

    if (dragState?.workerId === worker.id) {
      node.classList.add("dragging");
    }
    if (worker.lastRound.made.length || worker.lastRound.received.length) {
      node.classList.add("highlight");
    }

    const avatar = document.createElement("div");
    avatar.className = "worker-avatar";
    avatar.addEventListener("pointerdown", (event) => startDragging(event, worker.id));
    avatar.innerHTML = `
      <span class="person hair-${worker.profile.hairStyle} body-${worker.profile.bodyStyle} accessory-${worker.profile.accessory}">
        <span class="person-hair"></span>
        <span class="person-head"></span>
        <span class="person-body"></span>
        <span class="person-accessory"></span>
      </span>
    `;

    const specialization = specializationForWorker(worker);
    if (specialization) {
      const specializationBadge = document.createElement("div");
      specializationBadge.className = `specialization-badge ${specialization.className}`;
      specializationBadge.setAttribute("title", specialization.title);
      specializationBadge.setAttribute("aria-label", specialization.title);
      specializationBadge.innerHTML = `<span class="specialization-icon">${specialization.icon}</span><span class="specialization-text">${specialization.label}</span>`;
      node.appendChild(specializationBadge);
    }

    const label = document.createElement("div");
    label.className = "worker-label";
    label.textContent = worker.name;

    const removeBtn = document.createElement("button");
    removeBtn.className = "worker-remove-btn";
    removeBtn.type = "button";
    removeBtn.textContent = "-";
    removeBtn.setAttribute("aria-label", `Remove ${worker.name}`);
    removeBtn.disabled = state.isAnimating || state.gameOver || state.onboardingStage !== "done" || state.autoRunning || state.workers.length <= MIN_GROUP_SIZE;
    removeBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      removeWorker(worker.id);
    });

    node.append(removeBtn, avatar, label);

    worker.transient.forEach((message) => {
      const bubble = document.createElement("div");
      bubble.className = message.kind === "spark" ? "spark" : message.kind === "money" ? "money-burst" : "bubble";
      bubble.innerHTML = message.html;
      node.appendChild(bubble);
    });

    if (worker.moneyBurstUntil && worker.moneyBurstUntil > Date.now()) {
      const moneyBurst = document.createElement("div");
      moneyBurst.className = "money-burst";
      moneyBurst.innerHTML = `<span class="money-symbol left">$</span><span class="money-symbol mid">$</span><span class="money-symbol right">$</span><span class="money-symbol far">$</span>`;
      node.appendChild(moneyBurst);
    }

    if (!state.isAnimating && worker.lastRound.made.length) {
      const persistent = document.createElement("div");
      persistent.className = "spark persistent";
      persistent.innerHTML = `new ${renderPotionGroup(worker.lastRound.made, "xs")}`;
      node.appendChild(persistent);
    }

    const uniqueKnowledge = uniqueKnowledgeForWorker(worker);
    if (uniqueKnowledge.length) {
      const uniqueBadge = document.createElement("div");
      uniqueBadge.className = "unique-knowledge";
      uniqueBadge.innerHTML = `<span class="unique-knowledge-label">Unique</span>${renderPotionGroup(uniqueKnowledge, "xs")}`;
      node.appendChild(uniqueBadge);
    }

    els.workersLayer.appendChild(node);
  });
}

function renderPopup() {
  if (!state.popup) {
    els.eventPopup.hidden = true;
    return;
  }

  els.eventPopup.hidden = false;
  els.eventPopup.dataset.kind = state.popup.kind || "info";
  els.eventPopupTitle.textContent = state.popup.title;
  els.eventPopupBody.textContent = state.popup.body;
}

function showPopup(title, body, kind = "info") {
  state.popup = { title, body, kind };
  render();
}

function dismissPopup() {
  state.popup = null;
  render();
}

function renderCureTracker(foundStages, cureFailed) {
  const aStages = TRACKER_STAGES.filter((stage) => stage.family === "a");
  const bStages = TRACKER_STAGES.filter((stage) => stage.family === "b");
  const row = (family, stages, label) => `
    <div class="tracker-path-label tracker-path-label-${family}">${label}</div>
    ${stages.map((stage, index) => `
      <div class="tracker-stage-cell tracker-stage-${family}-${index + 1}">
        ${renderTrackerStage(stage, foundStages.has(stage.id), false, false)}
      </div>
    `).join("")}
  `;
  return `
    <div class="cure-tracker">
      <svg class="tracker-connector-svg" viewBox="0 0 288 132" aria-hidden="true">
        <line class="tracker-connector-line ${foundStages.has("A3") ? "found" : ""}" x1="216" y1="66" x2="165" y2="29"></line>
        <line class="tracker-connector-line ${foundStages.has("B3") ? "found" : ""}" x1="216" y1="66" x2="165" y2="103"></line>
      </svg>
      <div class="tracker-row tracker-row-top">${row("a", aStages, "A")}</div>
      <div class="tracker-row tracker-row-bottom">${row("b", bStages, "B")}</div>
      <div class="tracker-cure-wrap tracker-stage-cure">
        ${renderTrackerStage(TRACKER_STAGES.find((stage) => stage.kind === "cure"), foundStages.has("CURE"), false, cureFailed)}
      </div>
    </div>
  `;
}

function renderTrackerStage(stage, discovered, hasConnector, cureFailed) {
  const marker = stage.kind === "cure"
    ? (discovered
      ? `<span class="cure-glyph">&#10022;</span>`
      : cureFailed
        ? `<span class="cure-skull">&#9760;</span>`
        : `<span class="reward-question">?</span>`)
    : (discovered ? renderPotionToken(stage.id, "lg") : `<span class="reward-question">?</span>`);
  const className = stage.kind === "cure"
    ? `reward-slot cure-slot ${cureFailed ? "failed" : ""}`
    : `reward-slot branch-${stage.family}`;
  return `
    <div class="${className} ${discovered ? "found" : "hidden"}">
      <div class="reward-token">
        ${marker}
      </div>
      <div class="reward-score">${formatMoney(STAGE_PLAYER_VALUES[stage.id])}</div>
      ${hasConnector ? `<span class="reward-connector ${discovered ? "found" : ""}"></span>` : ""}
    </div>
  `;
}



function renderOnboarding() {
  clearTutorialFocus();
  els.onboardingOverlay.classList.remove("tutorial-stage");
  els.onboardingCard.className = "onboarding-card";

  if (state.onboardingStage === "done") {
    els.onboardingOverlay.classList.remove("visible");
    els.tutorialSpotlight.classList.remove("visible");
    return;
  }

  els.onboardingOverlay.classList.add("visible");

  if (state.onboardingStage === "mode") {
    els.onboardingStep.textContent = "Choose a mode";
    els.onboardingTitle.textContent = "Pick how your chemists work.";
    els.onboardingBody.textContent = "The original task rewards stronger triads, so these chemists stay payoff-biased. Standard mode advances one round at a time, and Fast mode keeps rounds advancing automatically until a discovery appears.";
    els.onboardingStep.style.display = "block";
    els.tutorialProgress.classList.remove("visible");
    els.modePicker.style.display = "grid";
    els.tutorialToggles.forEach((toggle) => { toggle.style.display = "flex"; });
    els.tutorialActions.style.display = "flex";
    els.tutorialBackBtn.disabled = true;
    els.tutorialNextBtn.disabled = !state.mode;
    els.tutorialNextBtn.textContent = "Continue";
    els.modeOneBtn.classList.toggle("selected", state.mode === "mode1");
    els.modeOneFastBtn.classList.toggle("selected", state.mode === "mode1fast");
    return;
  }

  const step = TUTORIAL_STEPS[state.tutorialStep];
  els.onboardingOverlay.classList.add("tutorial-stage");
  els.onboardingStep.textContent = step.step;
  els.onboardingStep.style.display = "none";
  els.onboardingTitle.textContent = step.title;
  els.onboardingBody.textContent = step.body;
  els.tutorialProgress.classList.remove("visible");
  els.modePicker.style.display = "none";
  els.tutorialToggles.forEach((toggle) => { toggle.style.display = "none"; });
  els.tutorialActions.style.display = "flex";
  els.tutorialBackBtn.disabled = false;
  els.tutorialNextBtn.disabled = false;
  els.tutorialNextBtn.textContent = state.tutorialStep === TUTORIAL_STEPS.length - 1 ? "Start game" : "Next";
  applyTutorialFocus(step);
  positionTutorialCard();
}

function selectMode(mode) {
  state.mode = mode;
  state.unlimitedRounds = Boolean(els.endlessRoundsCheckbox.checked);
  renderOnboarding();
}

function handleTutorialBack() {
  if (state.onboardingStage === "mode") {
    return;
  }

  if (state.tutorialStep === 0) {
    state.onboardingStage = "mode";
  } else {
    state.tutorialStep -= 1;
  }
  render();
}

function handleTutorialNext() {
  if (state.onboardingStage === "mode") {
    if (!state.mode) {
      return;
    }
    state.unlimitedRounds = Boolean(els.endlessRoundsCheckbox.checked);
    if (els.skipTutorialCheckbox.checked) {
      state.onboardingStage = "done";
      render();
      return;
    }
    state.onboardingStage = "tutorial";
    state.tutorialStep = 0;
    render();
    return;
  }

  if (state.tutorialStep >= TUTORIAL_STEPS.length - 1) {
    state.onboardingStage = "done";
  } else {
    state.tutorialStep += 1;
  }
  render();
}

function applyTutorialFocus(step) {
  const target = document.querySelector(step.target);
  const extraTargets = (step.extraHighlights || [])
    .flatMap((selector) => [...document.querySelectorAll(selector)]);
  els.onboardingCard.classList.add("tutorial-focus");
  if (!target) {
    els.tutorialSpotlight.classList.remove("visible");
    return;
  }

  target.classList.add("tutorial-focus");
  extraTargets.forEach((extraTarget) => extraTarget.classList.add("tutorial-focus"));
  const rect = target.getBoundingClientRect();
  els.tutorialSpotlight.classList.add("visible");
  els.tutorialSpotlight.style.left = `${rect.left - 8}px`;
  els.tutorialSpotlight.style.top = `${rect.top - 8}px`;
  els.tutorialSpotlight.style.width = `${rect.width + 16}px`;
  els.tutorialSpotlight.style.height = `${rect.height + 16}px`;
}

function clearTutorialFocus() {
  document.querySelectorAll(".tutorial-focus").forEach((element) => element.classList.remove("tutorial-focus"));
}

function positionTutorialCard() {
  if (state.onboardingStage !== "tutorial") {
    els.onboardingCard.style.removeProperty("top");
    els.onboardingCard.style.removeProperty("left");
    els.onboardingCard.style.removeProperty("right");
    els.onboardingCard.style.removeProperty("width");
    return;
  }

  const payrollPanel = document.querySelector(".hud-payroll");
  const nextRoundWrap = document.querySelector(".sidebar-round-wrap");
  const sidebar = document.querySelector(".board-sidebar");
  if (!payrollPanel) {
    return;
  }

  const rect = payrollPanel.getBoundingClientRect();
  const sidebarRect = sidebar?.getBoundingClientRect();
  const nextRect = nextRoundWrap?.getBoundingClientRect();
  const cardWidth = Math.min(sidebarRect?.width || 290, window.innerWidth - 32);
  const cardHeight = 168;
  const desiredLeft = sidebarRect ? sidebarRect.left : Math.max(16, rect.left);
  const maxTop = nextRect ? (nextRect.top - cardHeight - 12) : (window.innerHeight - cardHeight - 16);
  const desiredTop = Math.max(rect.bottom + 10, Math.min(maxTop, rect.bottom + 10));
  els.onboardingCard.style.top = `${desiredTop}px`;
  els.onboardingCard.style.left = `${desiredLeft}px`;
  els.onboardingCard.style.right = "auto";
  els.onboardingCard.style.width = `${cardWidth}px`;
}

function renderTutorialProgress() {
  els.tutorialProgress.classList.add("visible");
  els.tutorialProgress.innerHTML = TUTORIAL_STEPS.map((_, index) => {
    const stateClass = index < state.tutorialStep ? "done" : index === state.tutorialStep ? "active" : "";
    return `<span class="tutorial-progress-dot ${stateClass}"></span>`;
  }).join("");
}

function computeNetwork() {
  const edges = [];
  for (let index = 0; index < state.workers.length; index += 1) {
    for (let nextIndex = index + 1; nextIndex < state.workers.length; nextIndex += 1) {
      const a = state.workers[index];
      const b = state.workers[nextIndex];
      if (distance(a, b) <= PROXIMITY_THRESHOLD) {
        edges.push({ a, b });
      }
    }
  }

  state.edges = edges;
  state.groups = connectedGroups(edges, state.workers);
}

function connectedGroups(edges, workers) {
  const adjacency = new Map(workers.map((worker) => [worker.id, new Set()]));
  edges.forEach((edge) => {
    adjacency.get(edge.a.id).add(edge.b.id);
    adjacency.get(edge.b.id).add(edge.a.id);
  });

  const seen = new Set();
  const groups = [];

  workers.forEach((worker) => {
    if (seen.has(worker.id)) {
      return;
    }

    const queue = [worker.id];
    const memberIds = [];
    seen.add(worker.id);

    while (queue.length) {
      const currentId = queue.shift();
      memberIds.push(currentId);
      adjacency.get(currentId).forEach((neighborId) => {
        if (!seen.has(neighborId)) {
          seen.add(neighborId);
          queue.push(neighborId);
        }
      });
    }

    const members = memberIds.map(getWorkerById);
    groups.push({
      members,
      halo: calculateHalo(members),
      teamName: teamNameForMembers(members)
    });
  });

  return groups;
}

function calculateHalo(members) {
  if (!members.length) {
    return { cx: 0, cy: 0, rx: 0, ry: 0 };
  }

  const xs = members.map((worker) => worker.x);
  const ys = members.map((worker) => worker.y);
  const minX = Math.min(...xs) - 44;
  const maxX = Math.max(...xs) + 44;
  const minY = Math.min(...ys) - 48;
  const maxY = Math.max(...ys) + 48;

  return {
    cx: (minX + maxX) / 2,
    cy: (minY + maxY) / 2,
    rx: Math.max(60, (maxX - minX) / 2),
    ry: Math.max(68, (maxY - minY) / 2)
  };
}

function invalidWorkerIds() {
  return state.groups
    .filter((group) => group.members.length < MIN_GROUP_SIZE)
    .flatMap((group) => group.members.map((worker) => worker.id));
}

function startDragging(event, workerId) {
  if (state.isAnimating || state.autoRunning || state.onboardingStage !== "done") {
    return;
  }

  const rect = els.board.getBoundingClientRect();
  const worker = getWorkerById(workerId);
  dragState = {
    workerId,
    offsetX: worker.x - scaleToBoardX(event.clientX - rect.left, rect.width),
    offsetY: worker.y - scaleToBoardY(event.clientY - rect.top, rect.height)
  };
}

function handlePointerMove(event) {
  if (!dragState) {
    return;
  }

  const rect = els.board.getBoundingClientRect();
  const worker = getWorkerById(dragState.workerId);
  const nextX = scaleToBoardX(event.clientX - rect.left, rect.width) + dragState.offsetX;
  const nextY = scaleToBoardY(event.clientY - rect.top, rect.height) + dragState.offsetY;

  worker.x = clamp(nextX, WORKER_RADIUS + 12, safeBoardMaxX());
  worker.y = clamp(nextY, WORKER_RADIUS + 12, BOARD_HEIGHT - WORKER_RADIUS - 12);
  render();
}

function stopDragging() {
  if (!dragState) {
    return;
  }
  dragState = null;
  render();
}

async function runRoundSequence() {
  if (state.autoRunning) {
    state.stopRequested = true;
    state.status = "Stopping";
    render();
    return;
  }

  if (state.isAnimating || state.gameOver) {
    return;
  }

  const invalidWorkers = invalidWorkerIds();
  if (invalidWorkers.length) {
    showPopup(
      "Group chemists first",
      "Every active chemist must belong to a group of at least two before you can run the next round."
    );
    return;
  }

  applyPayroll();
  if (applyImmediateCompletionIfNeeded()) {
    render();
    return;
  }

  if (isFastMode()) {
    await runFastSequence();
  } else {
    await playSingleRound(true);
  }
}

async function runFastSequence() {
  state.autoRunning = true;
  state.stopRequested = false;
  state.status = "Auto-running";
  render();

  let pauseOnDiscovery = false;

  while (!pauseOnDiscovery && !state.gameOver && !state.stopRequested) {
    const roundRecord = await playSingleRound(false);
    pauseOnDiscovery = roundRecord.interactions.some((interaction) => interaction.discovery && interaction.discoverers.length);
    if (!pauseOnDiscovery && !state.gameOver && !state.stopRequested) {
      applyPayroll();
      if (applyImmediateCompletionIfNeeded()) {
        break;
      }
      await wait(90);
    }
  }

  state.autoRunning = false;
  const stoppedByUser = state.stopRequested && !state.gameOver && !pauseOnDiscovery;
  state.stopRequested = false;
  if (!state.gameOver) {
    state.status = "Arrange workers";
  }
  render();
}

async function playSingleRound(showAnimation) {
  state.isAnimating = true;
  state.status = state.autoRunning ? "Auto-running" : "Round in motion";
  clearTransient();
  triggerRoundPulse(showAnimation ? ANIMATION_STEP_MS * 1.9 : 220);
  render();

  const roundRecord = simulateRound();
  state.story = `Round ${roundRecord.round}: ${roundRecord.summary}`;
  render();

  if (showAnimation || state.autoRunning || roundRecord.interactions.some((interaction) => interaction.discovery && interaction.discoverers.length)) {
    for (const interaction of roundRecord.interactions) {
      animateInteraction(interaction);
      render();
      await wait(showAnimation ? ANIMATION_STEP_MS : 60);
    }

    roundRecord.interactions.forEach((interaction) => {
      if (interaction.discovery) {
        interaction.discoverers.forEach((workerId) => {
          const worker = getWorkerById(workerId);
          worker.transient.push({ kind: "spark", html: `&#10024; ${renderPotionToken(interaction.discovery, "xs")}` });
          worker.moneyBurstUntil = Date.now() + 2000;
        });
      }
    });

    scheduleMoneyBurstCleanup();

    render();
    await wait(showAnimation ? 260 : 110);
  }

  clearTransient();
  finalizeRoundState();
  state.isAnimating = false;
  render();
  return roundRecord;
}

function finalizeRoundState() {
  applyStageRewards();
  const completion = currentCompletionState();
  if (completion.finished) {
    state.gameOver = true;
    state.autoRunning = false;
    state.status = "Game complete";
    state.story = completion.message;
    return;
  }

  state.round += 1;
  state.status = "Arrange workers";
}

function isFastMode() {
  return state.mode === "mode1fast";
}

function simulateRound() {
  state.workers.forEach((worker) => {
    worker.lastRound = emptyLastRound();
  });

  const regroupDiffusions = [];
  state.groups
    .filter((group) => group.members.length >= MIN_GROUP_SIZE)
    .forEach((group) => {
      regroupDiffusions.push(...diffuseKnowledgeAcrossGroup(group, "regroup"));
    });

  const interactions = [];
  const diffusions = [...regroupDiffusions];
  const inventorySnapshot = new Map(
    state.workers.map((worker) => [worker.id, new Set(worker.inventory)])
  );

  state.groups
    .filter((group) => group.members.length >= MIN_GROUP_SIZE)
    .forEach((group) => {
      const shuffledMembers = shuffled([...group.members]);
      while (shuffledMembers.length >= 2) {
        const focal = shuffledMembers.pop();
        const partner = shuffledMembers.pop();

        const workerContributionCount = Math.random() < 0.5 ? 1 : 2;
        const partnerContributionCount = 3 - workerContributionCount;
        const sharedByWorker = weightedSampleFromInventory(inventorySnapshot.get(focal.id), workerContributionCount, focal);
        const sharedByPartner = weightedSampleFromInventory(inventorySnapshot.get(partner.id), partnerContributionCount, partner);
        const triad = [...sharedByWorker, ...sharedByPartner];
        const discovery = RECIPE_BOOK.get(canonicalTriad(triad)) || null;

        focal.lastRound.interaction = { partner: partner.name, triad };
        partner.lastRound.interaction = { partner: focal.name, triad };

        interactions.push({
          worker: focal.id,
          partner: partner.id,
          workerName: focal.name,
          partnerName: partner.name,
          teamName: group.teamName,
          workerShared: sharedByWorker,
          partnerShared: sharedByPartner,
          triad,
          discovery,
          discoverers: []
        });
      }
    });

  interactions.forEach((interaction) => {
    const worker = getWorkerById(interaction.worker);
    const partner = getWorkerById(interaction.partner);

    if (!interaction.discovery) {
      return;
    }
    const group = state.groups.find((entry) => entry.members.some((member) => member.id === worker.id));
    [worker, partner].forEach((person) => {
      if (!person.inventory.has(interaction.discovery)) {
        person.inventory.add(interaction.discovery);
        person.lastRound.made.push(interaction.discovery);
        person.cumulativeDiscoveries += 1;
        updateBest(person, interaction.discovery);
        interaction.discoverers.push(person.id);
      }
    });

    if (!interaction.discoverers.length) {
      return;
    }

    group.members
      .filter((recipient) => recipient.id !== worker.id && recipient.id !== partner.id)
      .forEach((recipient) => {
        if (!recipient.inventory.has(interaction.discovery)) {
          recipient.inventory.add(interaction.discovery);
          recipient.lastRound.received.push(interaction.discovery);
          updateBest(recipient, interaction.discovery);
          diffusions.push({ from: interaction.teamName, to: recipient.name, potion: interaction.discovery });
        }
      });
  });

  const roundRecord = {
    round: state.round,
    interactions,
    diffusions,
    summary: buildSummary(interactions),
    snapshot: state.workers.map((worker) => ({
      worker: worker.id,
      inventory: inventoryArray(worker.inventory),
      bestTier: worker.bestTier,
      bestScore: worker.bestScore
    }))
  };

  state.roundHistory.push(roundRecord);
  return roundRecord;
}

function diffuseKnowledgeAcrossGroup(group, source) {
  const sharedInventory = new Set();
  group.members.forEach((member) => {
    member.inventory.forEach((potionId) => sharedInventory.add(potionId));
  });

  const diffusions = [];
  group.members.forEach((recipient) => {
    sharedInventory.forEach((potionId) => {
      if (!recipient.inventory.has(potionId)) {
        recipient.inventory.add(potionId);
        recipient.lastRound.received.push(potionId);
        updateBest(recipient, potionId);
        diffusions.push({
          from: group.teamName,
          to: recipient.name,
          potion: potionId,
          source
        });
      }
    });
  });

  return diffusions;
}

function animateInteraction(interaction) {
  clearTransient();

  const worker = getWorkerById(interaction.worker);
  const partner = getWorkerById(interaction.partner);

  worker.transient.push({ kind: "bubble", html: `shares ${renderPotionGroup(interaction.workerShared, "xs")}` });
  partner.transient.push({ kind: "bubble", html: `shares ${renderPotionGroup(interaction.partnerShared, "xs")}` });

  const beam = document.createElementNS("http://www.w3.org/2000/svg", "line");
  beam.setAttribute("class", "exchange-beam");
  beam.setAttribute("x1", String(worker.x));
  beam.setAttribute("y1", String(worker.y));
  beam.setAttribute("x2", String(partner.x));
  beam.setAttribute("y2", String(partner.y));
  els.beams.innerHTML = "";
  els.beams.appendChild(beam);

  if (interaction.discovery) {
    interaction.discoverers.forEach((workerId) => {
      const person = getWorkerById(workerId);
      person.transient.push({ kind: "spark", html: `new ${renderPotionToken(interaction.discovery, "xs")}` });
    });
  }
}

function clearTransient() {
  els.beams.innerHTML = "";
  state.workers.forEach((worker) => {
    worker.transient = [];
  });
}

function scheduleMoneyBurstCleanup() {
  window.clearTimeout(moneyBurstCleanupTimer);
  const remaining = Math.max(
    0,
    ...state.workers.map((worker) => Math.max(0, (worker.moneyBurstUntil || 0) - Date.now()))
  );
  if (!remaining) {
    return;
  }
  moneyBurstCleanupTimer = window.setTimeout(() => {
    state.workers.forEach((worker) => {
      if (worker.moneyBurstUntil && worker.moneyBurstUntil <= Date.now()) {
        worker.moneyBurstUntil = 0;
      }
    });
    render();
  }, remaining + 10);
}

function buildSummary(interactions) {
  const discoveries = interactions.filter((interaction) => interaction.discovery && interaction.discoverers.length);
  if (!discoveries.length) {
    return "No new compounds were discovered this round, but the chemists still shared knowledge and reinforced their current paths.";
  }

  const snippets = discoveries.map((interaction) => `${interaction.workerName} and ${interaction.partnerName} from ${interaction.teamName} unlocked ${renderPotionToken(interaction.discovery, "xs")} <span class="summary-potion-name">${potionName(interaction.discovery)}</span> for ${formatMoney(stageValueForPotion(interaction.discovery))}`);
  return `${snippets.join(" &bull; ")}.`;
}

function currentCompletionState() {
  const discovered = discoveredPotions();
  const progress = trackerProgress(discovered);
  const cure = curedPotion(discovered);
  if (cure) {
    return {
      finished: true,
      message: `Game complete: the company launched ${renderPotionToken(cure, "xs")} <span class="summary-potion-name">${potionName(cure)}</span>, the flagship crossover compound, and finished with ${formatMoney(state.companyCash)} in cash.`
    };
  }

  if (state.companyCash <= 0) {
    return {
      finished: true,
      message: `Game over: the company went bankrupt before reaching the flagship compound. Final cash: ${formatMoney(state.companyCash)}.`
    };
  }

  if (state.round >= MAX_ROUNDS) {
    if (state.unlimitedRounds) {
      return { finished: false, message: "" };
    }
    return {
      finished: true,
      message: `Game complete: the ${MAX_ROUNDS}-round limit has been reached. The company completed ${progress.completed} of ${TRACKER_STAGES.length} milestones, earned ${formatMoney(state.totalRevenue)} in discovery revenue, and finished with ${formatMoney(state.companyCash)} in cash.`
    };
  }

  return { finished: false, message: "" };
}

function applyImmediateCompletionIfNeeded() {
  const completion = currentCompletionState();
  if (!completion.finished) {
    return false;
  }

  state.gameOver = true;
  state.autoRunning = false;
  state.stopRequested = false;
  state.status = state.companyCash <= 0 && !hasCure(discoveredPotions()) ? "Bankrupt" : "Game complete";
  if (state.companyCash <= 0 && !hasCure(discoveredPotions())) {
    state.popup = {
      title: "Bankrupt",
      body: "The company ran out of cash before reaching the crossover breakthrough.",
      kind: "danger"
    };
  } else if (hasCure(discoveredPotions())) {
    state.popup = {
      title: "Breakthrough found",
      body: `Your company reached the final crossover compound and finished with ${formatMoney(state.companyCash)} in company funds.`,
      kind: "success"
    };
  }
  return true;
}

function discoveredPotions() {
  return DISCOVERY_POTIONS.filter((potionId) => state.workers.some((worker) => worker.inventory.has(potionId)));
}

function trackerProgress(discovered) {
  const foundStages = new Set();
  TRACKER_STAGES.forEach((stage) => {
    if (stage.kind === "cure") {
      if (hasCure(discovered)) {
        foundStages.add(stage.id);
      }
    } else if (discovered.includes(stage.id)) {
      foundStages.add(stage.id);
    }
  });
  return { foundStages, completed: foundStages.size };
}

function hasCure(discovered) {
  return TERMINAL_POTIONS.some((potionId) => discovered.includes(potionId));
}

function curedPotion(discovered) {
  return TERMINAL_POTIONS.find((potionId) => discovered.includes(potionId)) || null;
}

function sharedGroupKnowledge(group) {
  if (!group.members.length) {
    return [];
  }

  return inventoryArray(group.members[0].inventory)
    .filter((potionId) => group.members.every((member) => member.inventory.has(potionId)));
}

function uniqueKnowledgeForWorker(worker) {
  const group = state.groups.find((entry) => entry.members.some((member) => member.id === worker.id));
  if (!group || group.members.length < 2) {
    return [];
  }

  const shared = new Set(sharedGroupKnowledge(group));
  return inventoryArray(worker.inventory)
    .filter((potionId) => !shared.has(potionId));
}

function specializationForWorker(worker) {
  const progress = pathwayProgressForWorker(worker);
  if (progress.a.maxTier === 0 && progress.b.maxTier === 0) {
    return {
      className: "spec-new",
      icon: "•",
      label: "New",
      title: "New hire with no pathway discoveries yet"
    };
  }

  const tierGap = progress.a.maxTier - progress.b.maxTier;
  const countGap = progress.a.count - progress.b.count;

  if (progress.a.count === progress.b.count) {
    return {
      className: "spec-mix",
      icon: "=",
      label: "Mix",
      title: "Balanced knowledge across both product lines"
    };
  }

  if (tierGap >= 1 || (progress.a.maxTier > 0 && countGap >= 2)) {
    return {
      className: "spec-a",
      icon: "A",
      label: "A",
      title: "Specialized in the upper product line"
    };
  }

  if (tierGap <= -1 || (progress.b.maxTier > 0 && countGap <= -2)) {
    return {
      className: "spec-b",
      icon: "B",
      label: "B",
      title: "Specialized in the lower product line"
    };
  }

  return {
    className: countGap > 0 ? "spec-a" : "spec-b",
    icon: countGap > 0 ? "A" : "B",
    label: countGap > 0 ? "A" : "B",
    title: countGap > 0
      ? "Leaning toward the upper product line"
      : "Leaning toward the lower product line"
  };
}

function pathwayProgressForWorker(worker) {
  const inventory = inventoryArray(worker.inventory);
  const aPath = inventory.filter((potionId) => /^A[123]$/.test(potionId));
  const bPath = inventory.filter((potionId) => /^B[123]$/.test(potionId));
  return {
    a: {
      count: aPath.length,
      maxTier: aPath.reduce((maxTier, potionId) => Math.max(maxTier, POTIONS[potionId].tier), 0)
    },
    b: {
      count: bPath.length,
      maxTier: bPath.reduce((maxTier, potionId) => Math.max(maxTier, POTIONS[potionId].tier), 0)
    }
  };
}

function hireWorker() {
  if (state.isAnimating || state.autoRunning || state.gameOver || state.workers.length >= MAX_EMPLOYEES) {
    return;
  }

  const worker = createWorker(state.nextWorkerIndex);
  state.workers.push(worker);
  state.nextWorkerIndex += 1;
  state.story = `${worker.name} joined the company. Payroll updates when the next round begins.`;
  render();
}

function removeWorker(workerId) {
  if (state.isAnimating || state.autoRunning || state.gameOver || state.workers.length <= MIN_GROUP_SIZE) {
    return;
  }

  const worker = getWorkerById(workerId);
  state.workers = state.workers.filter((entry) => entry.id !== workerId);
  state.story = `${worker.name} has been removed from the roster. Future payroll is reduced.`;
  render();
}

function createWorker(index) {
  const profile = WORKER_PROFILES[index % WORKER_PROFILES.length];
  const position = initialPositionForIndex(index);
  return {
    id: `W${index + 1}`,
    name: generateWorkerName(index, profile.name),
    profile,
    x: clamp(position.x, WORKER_RADIUS + 12, safeBoardMaxX()),
    y: position.y,
    inventory: new Set(BASE_POTIONS),
    bestTier: 0,
    bestScore: 10,
    cumulativeDiscoveries: 0,
    moneyBurstUntil: 0,
    lastRound: emptyLastRound(),
    transient: []
  };
}

function safeBoardMaxX() {
  return BOARD_WIDTH - RESERVED_SIDEBAR_WIDTH - WORKER_RADIUS - 12;
}

function initialPositionForIndex(index) {
  const basePositions = [
    { x: 126, y: 154 },
    { x: 374, y: 188 },
    { x: 676, y: 162 },
    { x: 914, y: 196 },
    { x: 148, y: 542 },
    { x: 404, y: 586 },
    { x: 638, y: 528 },
    { x: 948, y: 574 }
  ];

  if (index < basePositions.length) {
    return basePositions[index];
  }

  const column = index % 4;
  const row = Math.floor(index / 4);
  return {
    x: 116 + (column * 248) + ((index * 17) % 38),
    y: 126 + (row * 184) + ((index * 19) % 44)
  };
}

function generateWorkerName(index, fallback) {
  const names = ["Maya", "Jonah", "Priya", "Elena", "Marcus", "Nia", "Omar", "Sofia", "Iris", "Theo", "Camila", "Noah", "Amina", "Felix", "Leah", "Hugo"];
  return names[index] || `${fallback} ${Math.floor(index / WORKER_PROFILES.length) + 1}`;
}

function applyPayroll() {
  const payroll = payrollForCount(state.workers.length);
  state.totalPayroll += payroll;
  state.companyCash -= payroll;
  triggerCashAnimation("down");
}

function payrollForCount(count) {
  return Math.round(PAYROLL_PER_EMPLOYEE * count);
}

function applyStageRewards() {
  const discovered = discoveredPotions();
  const progress = trackerProgress(discovered);
  const newStageIds = [...progress.foundStages].filter((stageId) => !state.discoveredStageRewards.has(stageId));
  if (!newStageIds.length) {
    return;
  }

  const revenue = newStageIds.reduce((sum, stageId) => sum + STAGE_PLAYER_VALUES[stageId], 0);
  newStageIds.forEach((stageId) => state.discoveredStageRewards.add(stageId));
  state.totalRevenue += revenue;
  state.companyCash += revenue;
  triggerCashAnimation("up");
}

function stageValueForPotion(potionId) {
  if (TERMINAL_POTIONS.includes(potionId)) {
    return STAGE_PLAYER_VALUES.CURE;
  }
  return STAGE_PLAYER_VALUES[potionId] || 0;
}

function roundToHundredThousand(value) {
  return Math.round(value / 100000) * 100000;
}

function triggerRoundPulse(duration = 260) {
  const ring = els.roundRingProgress;
  if (!ring) {
    return;
  }

  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  ring.style.strokeDasharray = `${circumference}`;
  ring.style.strokeDashoffset = `${circumference}`;
  ring.getAnimations().forEach((animation) => animation.cancel());
  ring.animate(
    [
      { strokeDashoffset: `${circumference}` },
      { strokeDashoffset: "0" }
    ],
    {
      duration,
      easing: "linear",
      fill: "forwards"
    }
  );
}

function triggerCashAnimation(direction) {
  if (!els.leaderScore) {
    return;
  }

  window.clearTimeout(cashAnimationTimer);
  els.leaderScore.classList.remove("cash-rise", "cash-fall");
  void els.leaderScore.offsetWidth;
  els.leaderScore.classList.add(direction === "up" ? "cash-rise" : "cash-fall");
  cashAnimationTimer = window.setTimeout(() => {
    els.leaderScore.classList.remove("cash-rise", "cash-fall");
  }, 900);
}

function formatMoney(value) {
  return `$${Math.round(value).toLocaleString("en-US")}`;
}

function adjustedPotionWeight(potionId) {
  return POTIONS[potionId].weight;
}

function updateBest(worker, potionId) {
  worker.bestTier = Math.max(worker.bestTier, POTIONS[potionId].tier);
  worker.bestScore = Math.max(worker.bestScore, POTIONS[potionId].discoverScore);
}

function weightedSampleFromInventory(inventory, count, worker) {
  const available = inventoryArray(inventory).map((id) => ({ id, weight: adjustedPotionWeight(id) }));
  const chosen = [];
  let remaining = [...available];

  for (let draw = 0; draw < Math.min(count, remaining.length); draw += 1) {
    const total = remaining.reduce((sum, item) => sum + item.weight, 0);
    let cursor = Math.random() * total;
    let index = 0;

    for (; index < remaining.length; index += 1) {
      cursor -= remaining[index].weight;
      if (cursor <= 0) {
        break;
      }
    }

    chosen.push(remaining[index].id);
    remaining.splice(index, 1);
  }

  return chosen;
}

function inventoryArray(inventory) {
  return [...inventory].sort((left, right) => potionSortOrder(left) - potionSortOrder(right));
}

function potionSortOrder(id) {
  const order = ["a1", "a2", "a3", "b1", "b2", "b3", "A1", "A2", "A3", "A4", "B1", "B2", "B3", "B4"];
  return order.indexOf(id);
}

function getWorkerById(workerId) {
  return state.workers.find((worker) => worker.id === workerId);
}

function canonicalTriad(items) {
  return [...items].sort().join("|");
}

function renderPotionGroup(potionIds, size = "sm") {
  return `<span class="potion-inline-group">${potionIds.map((potionId) => renderPotionToken(potionId, size)).join("")}</span>`;
}

function renderPotionToken(potionId, size = "sm") {
  const meta = POTION_META[potionId];
  const tierClass = `tier-${POTIONS[potionId].tier}`;
  return `<span class="potion-token ${size} ${tierClass}" title="${meta.name}" aria-label="${meta.name}" style="--potion-top:${meta.top};--potion-bottom:${meta.bottom};--tier-glow:${tierGlow(POTIONS[potionId].tier)};"><span class="potion-bottle ${tierClass}"><span class="potion-aura"></span><span class="potion-cork"></span><span class="potion-liquid"></span><span class="potion-glyph">${meta.glyph}</span><span class="potion-tier-mark">${POTIONS[potionId].tier || ""}</span></span></span>`;
}

function tierGlow(tier) {
  return ["rgba(255,255,255,0.06)", "rgba(244,114,182,0.22)", "rgba(34,197,94,0.24)", "rgba(245,158,11,0.3)", "rgba(139,92,246,0.34)"][tier];
}

function potionName(potionId) {
  return POTION_META[potionId]?.name || potionId;
}

function sampleUniform(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffled(items) {
  const clone = [...items];
  for (let index = clone.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [clone[index], clone[swapIndex]] = [clone[swapIndex], clone[index]];
  }
  return clone;
}

function teamNameForMembers(members) {
  const adjectives = ["Aurora", "Juniper", "Harbor", "Cinder", "Willow", "Comet", "Ember", "Silver", "Moss", "Lumen"];
  const nouns = ["Circle", "Guild", "Collective", "Workshop", "Lanterns", "Makers", "Crew", "Studio", "Cluster", "House"];
  const key = members.map((member) => member.id).sort().join("");
  const hash = [...key].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return `${adjectives[hash % adjectives.length]} ${nouns[hash % nouns.length]}`;
}

function scaleToBoardX(pixelX, renderedWidth) {
  return (pixelX / renderedWidth) * BOARD_WIDTH;
}

function scaleToBoardY(pixelY, renderedHeight) {
  return (pixelY / renderedHeight) * BOARD_HEIGHT;
}

function distance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function wait(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}





