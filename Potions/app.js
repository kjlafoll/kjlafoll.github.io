const BOARD_WIDTH = 1200;
const BOARD_HEIGHT = 760;
const WORKER_RADIUS = 28;
const PROXIMITY_THRESHOLD = 205;
const MIN_GROUP_SIZE = 2;
const RESERVED_SIDEBAR_WIDTH = 360;
const ANIMATION_STEP_MS = 130;
const MAIN_ROUND_BUBBLE_MS = 650;
const AUTO_ROUND_BUBBLE_MS = 320;
const MAIN_DISCOVERY_HOLD_MS = 650;
const AUTO_DISCOVERY_HOLD_MS = 360;
const MAX_ROUNDS = 72;
const BASELINE_EMPLOYEE_COUNT = 8;
const STARTING_EMPLOYEE_COUNT = 2;
const MAX_EMPLOYEES = 16;
const PLAYER_VALUE_MULTIPLIER = 10000;
const INITIAL_COMPANY_CASH = 5000000;
const PARTICIPANT_ROUND_EARNING = 0.05;
const PARTICIPANT_CURE_BONUS_MAX = 5;

const WORKER_PROFILES = [
  { id: "W1", name: "Maya", avatarIndex: 1 },
  { id: "W2", name: "Jonah", avatarIndex: 0 },
  { id: "W3", name: "Priya", avatarIndex: 2 },
  { id: "W4", name: "Omar", avatarIndex: 3 },
  { id: "W5", name: "Elena", avatarIndex: 4 },
  { id: "W6", name: "Nia", avatarIndex: 5 },
  { id: "W7", name: "Marcus", avatarIndex: 6 },
  { id: "W8", name: "Sofia", avatarIndex: 7 },
  { id: "W9", name: "Talia", avatarIndex: 8 },
  { id: "W10", name: "Felix", avatarIndex: 9 },
  { id: "W11", name: "Iris", avatarIndex: 10 },
  { id: "W12", name: "Theo", avatarIndex: 11 },
  { id: "W13", name: "Leo", avatarIndex: 12 },
  { id: "W14", name: "Amara", avatarIndex: 13 },
  { id: "W15", name: "Kai", avatarIndex: 14 },
  { id: "W16", name: "Zara", avatarIndex: 15 }
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
    body: "You manage a small R&D lab. Chemists can collaborate to discover new chemical products that your company can sell. First, you will learn what chemists actually do during a round.",
    target: "#board",
    kind: "read",
    hideControls: true,
    hideWorkers: true,
    completeLabel: "Hit Next"
  },
  {
    step: "First team",
    title: "Start by making a team.",
    body: "Drag the two chemists close together. When they are close enough, they form a team and can learn from each other's results after each round.",
    target: "#board",
    extraHighlights: [".worker-node"],
    kind: "pairGroup",
    hideControls: true,
    incompleteLabel: "Drag the 2 chemists together",
    completeLabel: "Hit Next"
  },
  {
    step: "Known compounds",
    title: "Chemists test combinations.",
    body: "Right now both chemists know the same six starting compounds. In each round, each chemist independently chooses a small set of compounds to test. Some combinations create new products; many do not.",
    target: ".group-knowledge",
    kind: "read",
    hideControls: true,
    completeLabel: "Hit Next"
  },
  {
    step: "Try a round",
    title: "Try a practice round.",
    body: "To have each chemist test a combination and then learn from their team, press the Next round button.",
    target: "#next-round-wrap",
    kind: "roundNoDiscovery",
    hideControls: true,
    showRoundControl: true,
    incompleteLabel: "Press Next round",
    completeLabel: "Hit Next"
  },
  {
    step: "Try again",
    title: "Try another round.",
    body: "Press Next round again. Each chemist will independently test another combination that could create a new product.",
    target: "#next-round-wrap",
    kind: "roundDiscovery",
    hideControls: true,
    showRoundControl: true,
    incompleteLabel: "Press Next round again",
    completeLabel: "Hit Next"
  },
  {
    step: "Discovery",
    title: "That is the core task.",
    body: "A chemist tested a combination and created a new product. In the real task, you decide how many chemists to use and how to arrange them between rounds.",
    target: ".group-knowledge",
    kind: "read",
    hideControls: true,
    completeLabel: "Hit Next"
  },
  {
    step: "Innovation tracks",
    title: "The company tracks product paths.",
    body: "The tracker shows two product tracks, A and B. Compounds farther to the right are more valuable, and the final crossover product requires progress on both tracks. Chemists do not know the hidden recipes; they choose from compounds they know, with higher-value compounds more likely to be selected.",
    target: ".board-reward-track",
    extraHighlights: [".specialization-badge"],
    kind: "read",
    completeLabel: "Hit Next"
  },
  {
    step: "Funding",
    title: "Company funds are your runway.",
    body: "Company funds show how much money the company has available. You can keep playing while company funds stay above zero. If the company runs out of money before the final crossover product is found, the game ends.",
    target: ".hud-money",
    kind: "read",
    completeLabel: "Hit Next"
  },
  {
    step: "Payroll",
    title: "Payroll is charged every round.",
    body: "Payroll is the company's cost for keeping chemists active. Each time a round is completed, payroll is deducted from company funds. Hiring more chemists increases payroll; firing chemists lowers payroll.",
    target: ".hud-payroll",
    kind: "read",
    completeLabel: "Hit Next"
  },
  {
    step: "Your earnings",
    title: "Your earnings are separate.",
    body: "Your earnings are what you receive as the participant. You earn <strong>$0.05 for every completed round</strong>. If the company discovers the final crossover product, you can earn an additional bonus of <strong>up to $5.00</strong>, based on how much company money remains.",
    target: ".hud-earnings",
    kind: "read",
    completeLabel: "Hit Next"
  },
  {
    step: "Staffing",
    title: "Practice hiring and firing.",
    body: "Click the + button to hire one chemist. Then click the - button on any chemist to fire one. This teaches how payroll can grow or shrink.",
    target: ".hud-staff",
    extraHighlights: [".worker-remove-btn"],
    kind: "hireFire",
    incompleteLabel: "Hire one, then fire one",
    completeLabel: "Hit Next"
  },
  {
    step: "Trio",
    title: "Make a three-person team.",
    body: "First hire one more chemist, then drag all three close together. Larger teams let more chemists observe and learn from one another's results.",
    target: "#board",
    extraHighlights: [".hud-staff", ".worker-node"],
    kind: "trioGroup",
    incompleteLabel: "Hire 1 and make a trio",
    completeLabel: "Hit Next"
  },
  {
    step: "Team discovery",
    title: "Try the three-person team.",
    body: "Press Next round. Each chemist will test their own combination, and the whole team can learn from any new product discovered by a teammate.",
    target: "#next-round-wrap",
    kind: "roundTrioDiscovery",
    hideControls: true,
    showRoundControl: true,
    incompleteLabel: "Press Next round",
    completeLabel: "Hit Next"
  },
  {
    step: "Teams",
    title: "Practice making two teams.",
    body: "Now hire two more chemists, then arrange the practice lab into one pair and one trio. This is the kind of reconfiguration you will use during the real task.",
    target: "#board",
    extraHighlights: [".hud-staff", ".worker-node"],
    kind: "pairAndTrio",
    incompleteLabel: "Hire 2, then make teams of 2 and 3",
    completeLabel: "Hit Next"
  },
  {
    step: "Discovery payoff",
    title: "Discoveries change the company.",
    body: "First-time discoveries fill the tracker and add revenue to company funds. Rediscovering something the company already found may change who knows it, but it does not pay again.",
    target: ".board-reward-track",
    extraHighlights: [".hud-money", ".hud-payroll"],
    kind: "read",
    completeLabel: "Hit Next"
  },
  {
    step: "Begin",
    title: "Your job is to lead the R&D lab.",
    body: "You will start fresh with a company budget and a small team of chemists. Arrange teams or leave chemists working alone, hire or fire chemists when you think it helps, and decide when to continue rounds. You earn <strong>$0.05 for every completed round</strong>. If the company discovers the final crossover product, you can earn an additional bonus of <strong>up to $5.00</strong>, based on remaining company funds.",
    target: "#board",
    kind: "read",
    hideControls: true,
    hideWorkers: true,
    completeLabel: "Start game"
  }
];
const TUTORIAL_AUDIO_FILES = [
  "tutorial_01_mission.mp3",
  "tutorial_02_first_team.mp3",
  "tutorial_03_known_compounds.mp3",
  "tutorial_04_try_round.mp3",
  "tutorial_05_try_again.mp3",
  "tutorial_06_discovery_core.mp3",
  "tutorial_07_innovation_tracks.mp3",
  "tutorial_08_funding.mp3",
  "tutorial_09_payroll.mp3",
  "tutorial_10_earnings.mp3",
  "tutorial_11_staffing.mp3",
  "tutorial_12_trio.mp3",
  "tutorial_13_team_discovery.mp3",
  "tutorial_14_teams.mp3",
  "tutorial_15_discovery_payoff.mp3",
  "tutorial_16_begin.mp3"
];
const TUTORIAL_DYNAMIC_AUDIO_FILES = {
  discoveryFound: "tutorial_dynamic_discovery_found.mp3",
  testCombination: "tutorial_dynamic_test_combination.mp3",
  noProduct: "tutorial_dynamic_no_product.mp3",
  independentTests: "tutorial_dynamic_independent_tests.mp3",
  teamLearns: "tutorial_dynamic_team_learns.mp3"
};

const els = {
  nextRoundWrap: document.getElementById("next-round-wrap"),
  nextRoundBtn: document.getElementById("next-round-btn"),
  roundRingProgress: document.getElementById("round-ring-progress"),
  leaderScore: document.getElementById("leader-score"),
  payrollScore: document.getElementById("payroll-score"),
  earningsScore: document.getElementById("earnings-score"),
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
let audioContext = null;
let musicTimer = null;
let musicStarted = false;
let musicStep = 0;
let tutorialNarration = null;
let tutorialNarrationKey = "";

initialize();

function initialize() {
  bindEvents();
  render();
}

function createInitialState() {
  const workers = [];
  for (let index = 0; index < STARTING_EMPLOYEE_COUNT; index += 1) {
    workers.push(createWorker(workers, index));
  }

  return {
    sessionId: `potions-${Date.now()}`,
    round: 1,
    status: "Arrange workers",
    workers,
    edges: [],
    groups: [],
    roundHistory: [],
    mode: "mode1",
    onboardingStage: "mode",
    tutorialStep: 0,
    tutorialFlags: {},
    tutorialMessage: "",
    gameOver: false,
    isAnimating: false,
    autoRunning: false,
    stopRequested: false,
    unlimitedRounds: false,
    popup: null,
    companyCash: INITIAL_COMPANY_CASH,
    totalRevenue: 0,
    totalPayroll: 0,
    participantEarnings: 0,
    participantRoundEarnings: 0,
    participantCureBonus: 0,
    cureBonusApplied: false,
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
  window.addEventListener("resize", positionTutorialCard);
}

function render() {
  document.body.classList.toggle("mode-screen", state.onboardingStage === "mode");
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
  els.earningsScore.textContent = formatParticipantMoney(state.participantEarnings);
  els.staffCount.textContent = String(state.workers.length);
  els.rewardTrack.innerHTML = renderCureTracker(progress.foundStages, state.gameOver && !hasCure(discovered));
  els.nextRoundBtn.textContent = state.gameOver ? "Complete" : state.autoRunning ? (state.stopRequested ? "Stopping..." : "Stop") : "Next round";
  const canUseNextRound = state.onboardingStage === "done" || tutorialAllows("round");
  const canUseHire = state.onboardingStage === "done" || tutorialAllows("hire");
  els.nextRoundBtn.disabled = (state.isAnimating && !state.autoRunning) || state.gameOver || !canUseNextRound;
  els.hireBtn.disabled = state.isAnimating || state.gameOver || !canUseHire || state.autoRunning || state.workers.length >= maxWorkersForCurrentStep();
  els.nextRoundWrap.classList.toggle("running", state.isAnimating || state.autoRunning);
}

function renderBoard() {
  const tutorialStep = currentTutorialStep();
  clampWorkersToPlayableArea();
  els.board.classList.toggle("tutorial-basics", Boolean(tutorialStep?.hideControls));
  els.board.classList.toggle("tutorial-basics-round", Boolean(tutorialStep?.hideControls && tutorialStep?.showRoundControl));
  els.board.classList.toggle("tutorial-intro", Boolean(tutorialStep?.hideWorkers));
  els.halos.innerHTML = "";
  els.beams.innerHTML = "";
  els.workersLayer.innerHTML = "";

  if (tutorialStep?.hideWorkers) {
    renderFactoryScene();
    return;
  }

  state.groups.forEach((group) => {
    renderGroupKnowledgeDisplay(group, tutorialStep);
  });

  state.workers.forEach((worker) => {
    const node = document.createElement("div");
    node.className = "worker-node";
    node.style.left = `${(worker.x / BOARD_WIDTH) * 100}%`;
    node.style.top = `${(worker.y / BOARD_HEIGHT) * 100}%`;
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
    avatar.style.setProperty("--avatar-col", String(worker.profile.avatarIndex % 4));
    avatar.style.setProperty("--avatar-row", String(Math.floor(worker.profile.avatarIndex / 4)));
    avatar.innerHTML = `
      <span class="worker-portrait" aria-hidden="true"></span>
    `;

    const specialization = specializationForWorker(worker);
    if (specialization) {
      const specializationBadge = document.createElement("div");
      specializationBadge.className = `specialization-badge ${specialization.className}`;
      specializationBadge.setAttribute("title", specialization.title);
      specializationBadge.setAttribute("aria-label", specialization.title);
      specializationBadge.innerHTML = `<span class="specialization-text">${specialization.label}</span>`;
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
    removeBtn.disabled = state.isAnimating || state.gameOver || !(state.onboardingStage === "done" || tutorialAllows("fire")) || state.autoRunning || state.workers.length <= minWorkersForCurrentStep();
    removeBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      removeWorker(worker.id);
    });

    node.append(removeBtn, avatar, label);

    worker.transient.forEach((message) => {
      const bubble = document.createElement("div");
      const className = message.kind === "spark" ? "spark" : message.kind === "money" ? "money-burst" : "bubble";
      bubble.className = [
        className,
        message.frozen ? "tutorial-bubble-frozen" : "",
        message.fading ? "tutorial-bubble-fading" : ""
      ].filter(Boolean).join(" ");
      bubble.innerHTML = message.html;
      node.appendChild(bubble);
    });

    if (worker.moneyBurstUntil && worker.moneyBurstUntil > Date.now()) {
      const moneyBurst = document.createElement("div");
      moneyBurst.className = "money-burst";
      moneyBurst.innerHTML = renderMoneyBurstSymbols(worker);
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

function renderGroupKnowledgeDisplay(group, tutorialStep) {
  const isTeam = group.members.length >= 2;
  if (isTeam) {
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
  }

  const knowledge = document.createElement("div");
  knowledge.className = `group-knowledge ${isTeam ? "" : "solo-knowledge"}`.trim();
  const safeRightEdge = BOARD_WIDTH - effectiveReservedSidebarWidth();
  const preferredRightX = group.halo.cx + group.halo.rx + 56;
  const fallbackLeftX = group.halo.cx - group.halo.rx - 56;
  const knowledgeX = isMobileLayout()
    ? clamp(group.halo.cx, 90, BOARD_WIDTH - 90)
    : preferredRightX > safeRightEdge
      ? Math.max(86, fallbackLeftX)
      : Math.min(safeRightEdge - 24, preferredRightX);
  const preferredKnowledgeY = isMobileLayout()
    ? group.halo.cy + group.halo.ry + 12
    : Math.max(18, group.halo.cy - 16);
  const knowledgeY = isMobileLayout() && preferredKnowledgeY > safeBoardMaxY() - 48
    ? Math.max(safeBoardMinY(), group.halo.cy - group.halo.ry - 64)
    : preferredKnowledgeY;
  knowledge.style.left = `${(knowledgeX / BOARD_WIDTH) * 100}%`;
  knowledge.style.top = `${(knowledgeY / BOARD_HEIGHT) * 100}%`;
  knowledge.innerHTML = `
    <span class="group-knowledge-label">${isTeam ? (tutorialStep?.hideControls ? "Known compounds" : "Team knowledge") : "Known compounds"}</span>
    <div class="potion-list">${sharedGroupKnowledge(group).map((potionId) => renderPotionToken(potionId, "sm")).join("")}</div>
  `;
  els.workersLayer.appendChild(knowledge);
}

function clampWorkersToPlayableArea() {
  const maxX = safeBoardMaxX();
  const minY = safeBoardMinY();
  const maxY = safeBoardMaxY();
  state.workers.forEach((worker) => {
    worker.x = clamp(worker.x, WORKER_RADIUS + 12, maxX);
    worker.y = clamp(worker.y, minY, maxY);
  });
}

function renderFactoryScene() {
  const scene = document.createElement("div");
  scene.className = "factory-scene";
  scene.innerHTML = `
    <img class="factory-art" src="./assets/factory-vignette.png" alt="Stylized chemical factory with chemists outside" onload="positionTutorialCard()">
  `;
  els.workersLayer.appendChild(scene);
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
      <div class="reward-score">${formatTrackerMoney(STAGE_PLAYER_VALUES[stage.id])}</div>
      ${hasConnector ? `<span class="reward-connector ${discovered ? "found" : ""}"></span>` : ""}
    </div>
  `;
}



function renderOnboarding() {
  clearTutorialFocus();
  els.onboardingOverlay.classList.remove("tutorial-stage");
  els.onboardingCard.className = "onboarding-card";

  if (state.onboardingStage === "done") {
    stopTutorialNarration();
    resetOnboardingCardPosition();
    els.onboardingOverlay.classList.remove("visible");
    els.tutorialSpotlight.classList.remove("visible");
    return;
  }

  els.onboardingOverlay.classList.add("visible");

  if (state.onboardingStage === "mode") {
    stopTutorialNarration();
    resetOnboardingCardPosition();
    els.onboardingStep.textContent = "Tutorial";
    els.onboardingTitle.textContent = "Would you like to complete the tutorial?";
    els.onboardingBody.textContent = "Please turn on your browser or device audio before continuing. The tutorial includes spoken narration and walks through the lab, company funds, payroll, participant earnings, hiring, firing, and team arrangement. You can skip it if you already know how the task works.";
    els.onboardingStep.style.display = "block";
    els.tutorialProgress.classList.remove("visible");
    els.modePicker.style.display = "none";
    els.tutorialToggles.forEach((toggle) => { toggle.style.display = toggle.dataset.tutorialOption === "skip" ? "flex" : "none"; });
    els.tutorialActions.style.display = "flex";
    els.tutorialBackBtn.disabled = true;
    els.tutorialNextBtn.disabled = false;
    els.tutorialNextBtn.textContent = "Continue";
    els.modeOneBtn.classList.toggle("selected", false);
    els.modeOneFastBtn.classList.toggle("selected", false);
    return;
  }

  const step = TUTORIAL_STEPS[state.tutorialStep];
  const displayContent = tutorialDisplayContent(step);
  playTutorialNarrationForCurrentState(step);
  els.onboardingOverlay.classList.add("tutorial-stage");
  els.onboardingStep.textContent = displayContent.step;
  els.onboardingStep.style.display = "none";
  els.onboardingTitle.textContent = displayContent.title;
  els.onboardingBody.innerHTML = displayContent.body;
  els.tutorialProgress.classList.remove("visible");
  els.modePicker.style.display = "none";
  els.tutorialToggles.forEach((toggle) => { toggle.style.display = "none"; });
  els.tutorialActions.style.display = "flex";
  els.tutorialBackBtn.disabled = false;
  els.tutorialNextBtn.disabled = !tutorialStepComplete(step);
  els.tutorialNextBtn.textContent = tutorialStepComplete(step)
    ? (state.tutorialStep === TUTORIAL_STEPS.length - 1 ? "Start game" : "Next")
    : (step.incompleteLabel || "Complete this step");
  applyTutorialFocus(step);
  positionTutorialCard();
}

function resetOnboardingCardPosition() {
  els.onboardingCard.style.removeProperty("top");
  els.onboardingCard.style.removeProperty("left");
  els.onboardingCard.style.removeProperty("right");
  els.onboardingCard.style.removeProperty("bottom");
  els.onboardingCard.style.removeProperty("width");
  els.onboardingCard.style.removeProperty("maxHeight");
}

function tutorialDisplayContent(step) {
  const baseBody = `<span>${step.body}</span>`;
  if (step.kind === "roundDiscovery" && state.tutorialFlags.roundComplete) {
    return {
      step: "Discovery",
      title: "A new product was discovered.",
      body: "<span>The team created a new product, and both chemists now know it. The company earns revenue for first-time discoveries, and that new knowledge can affect what chemists try in later rounds. Hit Next to continue.</span>"
    };
  }

  if (step.kind === "roundNoDiscovery") {
    if (state.tutorialFlags.roundPhase === "tested") {
      return {
        step: "Testing",
        title: "The chemist tests the combination.",
        body: "<span>The bubble shows the combination this chemist selected and tested from the compounds they currently know. Some combinations create new products, but many do not. Hit Next to see what happened.</span>"
      };
    }
    if (state.tutorialFlags.roundPhase === "result") {
      return {
        step: "Result",
        title: "No new product was found.",
        body: "<span>This combination did not create a new product. Many rounds will not produce a discovery, so you may need to keep trying or reorganize later. Hit Next to continue.</span>"
      };
    }
  }
  if (step.kind === "roundTrioDiscovery") {
    if (state.tutorialFlags.roundPhase === "tested") {
      return {
        step: "Testing",
        title: "Each chemist tests independently.",
        body: "<span>This bubble shows one chemist's tested combination. <strong>Notice that the chemist included a recently discovered compound.</strong> Chemists tend to prefer newer, higher-value compounds, so they often reuse recently discovered compounds instead of only using the starting compounds. Hit Next to see what happened.</span>"
      };
    }
    if (state.tutorialFlags.roundPhase === "result") {
      return {
        step: "Discovery",
        title: "The team learns from the discovery.",
        body: "<span>This chemist discovered a new product. Because all three chemists are on the same team, the other team members learn that new product too. Hit Next to continue.</span>"
      };
    }
  }

  const complete = tutorialStepComplete(step);
  const message = shouldShowTutorialInstruction(step, complete)
    ? (state.tutorialMessage || step.incompleteLabel || "")
    : "";
  return {
    step: step.step,
    title: step.title,
    body: message ? `${baseBody}<span class="tutorial-inline-instruction">${message}</span>` : baseBody
  };
}

function shouldShowTutorialInstruction(step, complete) {
  if (complete) {
    return false;
  }
  return ["pairGroup", "hireFire", "trioGroup", "pairAndTrio"].includes(step.kind);
}

function isTutorialActive() {
  return state.onboardingStage === "tutorial";
}

function currentTutorialStep() {
  return isTutorialActive() ? TUTORIAL_STEPS[state.tutorialStep] : null;
}

function tutorialAllows(action) {
  const step = currentTutorialStep();
  if (!step) {
    return false;
  }
  if (action === "hire") {
    return ["hireFire", "trioGroup", "pairAndTrio"].includes(step.kind)
      && state.workers.length < maxWorkersForCurrentStep(step);
  }
  if (action === "fire") {
    return step.kind === "hireFire"
      || (["trioGroup", "pairAndTrio"].includes(step.kind) && state.workers.length > targetWorkersForTutorialStep(step));
  }
  if (action === "drag") {
    return ["pairGroup", "trioGroup", "pairAndTrio"].includes(step.kind);
  }
  if (action === "round") {
    return ["roundNoDiscovery", "roundDiscovery", "roundTrioDiscovery"].includes(step.kind)
      && !state.tutorialFlags.roundComplete
      && !state.tutorialFlags.roundPhase;
  }
  return false;
}

function tutorialStepComplete(step = currentTutorialStep()) {
  if (!step) {
    return false;
  }
  if (step.kind === "read") {
    return true;
  }
  if (step.kind === "hireFire") {
    return Boolean(state.tutorialFlags.hired && state.tutorialFlags.fired);
  }
  if (step.kind === "pairGroup") {
    return hasGroupSizes([2]);
  }
  if (step.kind === "trioGroup") {
    return state.workers.length === 3 && hasGroupSizes([3]);
  }
  if (step.kind === "pairAndTrio") {
    return hasGroupSizes([2, 3]);
  }
  if (step.kind === "roundNoDiscovery" || step.kind === "roundDiscovery" || step.kind === "roundTrioDiscovery") {
    return Boolean(state.tutorialFlags.roundComplete || state.tutorialFlags.roundPhase);
  }
  return false;
}

function hasGroupSizes(requiredSizes) {
  computeNetwork();
  const actual = state.groups
    .filter((group) => group.members.length >= MIN_GROUP_SIZE)
    .map((group) => group.members.length)
    .sort((a, b) => a - b);
  const required = [...requiredSizes].sort((a, b) => a - b);
  return required.length === actual.length && required.every((size, index) => size === actual[index]);
}

function targetWorkersForTutorialStep(step = currentTutorialStep()) {
  if (!step) {
    return 1;
  }
  if (step.kind === "trioGroup" || step.kind === "roundTrioDiscovery") {
    return 3;
  }
  if (step.kind === "pairAndTrio") {
    return 5;
  }
  return 1;
}

function maxWorkersForCurrentStep(step = currentTutorialStep()) {
  if (state.onboardingStage !== "tutorial" || !step) {
    return MAX_EMPLOYEES;
  }
  if (step.kind === "trioGroup") {
    return 3;
  }
  if (step.kind === "pairAndTrio") {
    return 5;
  }
  return MAX_EMPLOYEES;
}

function minWorkersForCurrentStep(step = currentTutorialStep()) {
  if (state.onboardingStage !== "tutorial" || !step) {
    return 1;
  }
  if (["trioGroup", "pairAndTrio"].includes(step.kind) && state.workers.length > targetWorkersForTutorialStep(step)) {
    return targetWorkersForTutorialStep(step);
  }
  return step.kind === "hireFire" ? 1 : state.workers.length;
}

function enterTutorialStep(index) {
  clearTransient();
  state.tutorialStep = index;
  state.tutorialFlags = {};
  state.tutorialMessage = "";
  setupTutorialStep(TUTORIAL_STEPS[index]);
}

function setupTutorialStep(step) {
  if (!step) {
    return;
  }

  if (step.kind === "pairGroup") {
    ensureWorkerCount(2);
    positionTutorialStartingPair();
  }

  computeNetwork();
}

function positionTutorialStartingPair() {
  if (!isMobileLayout()) {
    return;
  }

  const centerX = BOARD_WIDTH * 0.5;
  const y = BOARD_HEIGHT * 0.4;
  const gap = effectiveProximityThreshold() + 90;
  setWorkerPositions([
    { x: centerX - gap / 2, y },
    { x: centerX + gap / 2, y }
  ]);
}

function ensureWorkerCount(count) {
  while (state.workers.length < count && state.workers.length < MAX_EMPLOYEES) {
    state.workers.push(createWorker(state.workers, state.nextWorkerIndex));
    state.nextWorkerIndex += 1;
  }

  while (state.workers.length > count && state.workers.length > MIN_GROUP_SIZE) {
    state.workers.pop();
  }
}

function setWorkerPositions(positions) {
  positions.forEach((position, index) => {
    const worker = state.workers[index];
    if (!worker) {
      return;
    }
    worker.x = clamp(position.x, WORKER_RADIUS + 12, safeBoardMaxX());
    worker.y = clamp(position.y, safeBoardMinY(), safeBoardMaxY());
  });
}

function startRealGameAfterTutorial() {
  const selectedMode = state.mode;
  const unlimitedRounds = state.unlimitedRounds;
  state = createInitialState();
  state.mode = selectedMode;
  state.unlimitedRounds = unlimitedRounds;
  state.onboardingStage = "done";
}

function selectMode(mode) {
  startBackgroundMusic();
  state.mode = mode;
  state.unlimitedRounds = Boolean(els.endlessRoundsCheckbox.checked);
  renderOnboarding();
}

function handleTutorialBack() {
  stopTutorialNarration({ keepKey: true });
  if (state.onboardingStage === "mode") {
    return;
  }

  if (state.tutorialStep === 0) {
    state.onboardingStage = "mode";
  } else {
    enterTutorialStep(state.tutorialStep - 1);
  }
  render();
}

async function handleTutorialNext() {
  startBackgroundMusic();
  stopTutorialNarration({ keepKey: true });
  if (state.onboardingStage === "mode") {
    state.mode = "mode1";
    state.unlimitedRounds = false;
    els.endlessRoundsCheckbox.checked = false;
    if (els.skipTutorialCheckbox.checked) {
      state.onboardingStage = "done";
      render();
      return;
    }
    state.onboardingStage = "tutorial";
    enterTutorialStep(0);
    render();
    return;
  }

  const step = currentTutorialStep();
  if (["roundNoDiscovery", "roundTrioDiscovery"].includes(step?.kind) && state.tutorialFlags.roundPhase && !state.tutorialFlags.roundComplete) {
    await continueGuidedNoDiscoveryRound();
    return;
  }

  if (!tutorialStepComplete()) {
    return;
  }

  if (["roundNoDiscovery", "roundTrioDiscovery"].includes(step?.kind) && state.tutorialFlags.roundComplete) {
    await fadeTutorialBubbles();
  }

  if (state.tutorialStep >= TUTORIAL_STEPS.length - 1) {
    startRealGameAfterTutorial();
  } else {
    enterTutorialStep(state.tutorialStep + 1);
  }
  render();
}

function applyTutorialFocus(step) {
  if (step.hideWorkers) {
    els.tutorialSpotlight.classList.remove("visible");
    return;
  }

  const target = document.querySelector(step.target);
  const extraTargets = (step.extraHighlights || [])
    .flatMap((selector) => [...document.querySelectorAll(selector)]);
  els.onboardingCard.classList.add("tutorial-focus");
  if (!target) {
    els.tutorialSpotlight.classList.remove("visible");
    return;
  }

  if (step.target !== "#next-round-wrap") {
    target.classList.add("tutorial-focus");
  }
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
    els.onboardingCard.style.removeProperty("maxHeight");
    els.onboardingCard.style.removeProperty("bottom");
    return;
  }

  const boardRect = els.board?.getBoundingClientRect();
  if (!boardRect) {
    return;
  }

  const step = currentTutorialStep();
  if (step?.hideWorkers) {
    positionVignetteTutorialCard(boardRect);
    return;
  }

  const target = step?.target ? document.querySelector(step.target) : null;
  const mobileLayout = isMobileLayout();
  const sidebarRect = step?.hideControls || mobileLayout ? null : document.querySelector(".board-sidebar")?.getBoundingClientRect();
  const avoidRects = [
    target?.getBoundingClientRect(),
    mobileLayout ? els.nextRoundWrap?.getBoundingClientRect() : null,
    mobileLayout ? els.rewardTrack?.getBoundingClientRect() : null,
    ...[...document.querySelectorAll(".worker-node")].map((node) => node.getBoundingClientRect())
  ].filter(Boolean);
  const fieldLeft = boardRect.left + (mobileLayout ? 12 : 24);
  const fieldRight = (sidebarRect ? sidebarRect.left : boardRect.right) - (mobileLayout ? 12 : 24);
  const fieldTop = boardRect.top + (mobileLayout ? 60 : 24);
  const fieldBottom = boardRect.bottom - (mobileLayout ? 116 : 24);
  const availableWidth = Math.max(160, fieldRight - fieldLeft);
  const cardWidth = Math.min(mobileLayout ? 330 : 440, availableWidth);
  const cardHeight = mobileLayout ? 150 : 260;
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const overlapArea = (candidate, rect) => {
    const left = Math.max(candidate.left, rect.left);
    const right = Math.min(candidate.left + cardWidth, rect.right);
    const top = Math.max(candidate.top, rect.top);
    const bottom = Math.min(candidate.top + cardHeight, rect.bottom);
    return Math.max(0, right - left) * Math.max(0, bottom - top);
  };
  const candidates = [
    { left: fieldLeft, top: fieldTop },
    { left: fieldRight - cardWidth, top: fieldTop },
    { left: fieldLeft, top: fieldBottom - cardHeight },
    { left: fieldRight - cardWidth, top: fieldBottom - cardHeight },
    { left: fieldLeft + (fieldRight - fieldLeft - cardWidth) / 2, top: fieldTop + 80 },
    { left: fieldLeft + (fieldRight - fieldLeft - cardWidth) / 2, top: fieldBottom - cardHeight - 80 }
  ].map((candidate) => ({
    left: clamp(candidate.left, fieldLeft, Math.max(fieldLeft, fieldRight - cardWidth)),
    top: clamp(candidate.top, fieldTop, Math.max(fieldTop, fieldBottom - cardHeight))
  }));
  const best = candidates.reduce((winner, candidate) => {
    const score = avoidRects.reduce((sum, rect) => sum + overlapArea(candidate, rect), 0);
    return score < winner.score ? { ...candidate, score } : winner;
  }, { ...candidates[0], score: Number.POSITIVE_INFINITY });

  els.onboardingCard.style.top = `${best.top}px`;
  els.onboardingCard.style.left = `${best.left}px`;
  els.onboardingCard.style.right = "auto";
  els.onboardingCard.style.width = `${cardWidth}px`;
  els.onboardingCard.style.maxHeight = `${Math.max(mobileLayout ? 108 : 180, fieldBottom - best.top)}px`;
  els.onboardingCard.style.removeProperty("bottom");
}

function positionVignetteTutorialCard(boardRect) {
  const imageRect = document.querySelector(".factory-art")?.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const cardWidth = Math.min(560, viewportWidth - 32);
  const gap = 18;
  const left = Math.max(16, (viewportWidth - cardWidth) / 2);
  const imageBottom = imageRect && imageRect.height > 20
    ? imageRect.bottom
    : boardRect.top + Math.min(260, viewportHeight * 0.34) + Math.min(60, Math.max(24, viewportHeight * 0.06));
  const top = Math.max(16, imageBottom + gap);

  els.onboardingCard.style.top = `${top}px`;
  els.onboardingCard.style.left = `${left}px`;
  els.onboardingCard.style.right = "auto";
  els.onboardingCard.style.bottom = "auto";
  els.onboardingCard.style.width = `${cardWidth}px`;
  els.onboardingCard.style.maxHeight = `${Math.max(160, viewportHeight - top - 16)}px`;
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
  const proximityThreshold = effectiveProximityThreshold();
  for (let index = 0; index < state.workers.length; index += 1) {
    for (let nextIndex = index + 1; nextIndex < state.workers.length; nextIndex += 1) {
      const a = state.workers[index];
      const b = state.workers[nextIndex];
      if (distance(a, b) <= proximityThreshold) {
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
  if (state.isAnimating || state.autoRunning || !(state.onboardingStage === "done" || tutorialAllows("drag"))) {
    return;
  }

  const rect = els.board.getBoundingClientRect();
  const worker = getWorkerById(workerId);
  dragState = {
    workerId,
    startX: worker.x,
    startY: worker.y,
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
  worker.y = clamp(nextY, safeBoardMinY(), safeBoardMaxY());
  render();
}

function stopDragging() {
  if (!dragState) {
    return;
  }
  const worker = getWorkerById(dragState.workerId);
  const moved = distance(worker, { x: dragState.startX, y: dragState.startY }) > 8;
  dragState = null;
  if (moved) {
    playPlopSound();
  }
  updateTutorialGroupingMessage();
  render();
}

function updateTutorialGroupingMessage() {
  if (!isTutorialActive()) {
    return;
  }

  const step = currentTutorialStep();
  if (!step || !["pairGroup", "trioGroup", "pairAndTrio"].includes(step.kind)) {
    return;
  }

  if (tutorialStepComplete(step)) {
    state.tutorialMessage = step.completeLabel || "Good. You can continue.";
  } else if (step.kind === "pairGroup") {
    state.tutorialMessage = "Keep dragging until exactly two chemists are inside one team circle.";
  } else if (step.kind === "trioGroup") {
    state.tutorialMessage = state.workers.length > 3
      ? "Remove extra chemists until only three remain."
      : state.workers.length < 3
      ? "First hire one more chemist with the + button."
      : "Keep dragging until all three chemists are inside one team circle.";
  } else {
    state.tutorialMessage = state.workers.length > 5
      ? "Remove extra chemists until only five remain."
      : "Keep adjusting until you have one pair and one trio.";
  }
}

async function runRoundSequence() {
  startBackgroundMusic();
  if (isTutorialActive()) {
    playRoundSound();
    await runTutorialRound();
    return;
  }

  if (state.autoRunning) {
    state.stopRequested = true;
    state.status = "Stopping";
    render();
    return;
  }

  if (state.isAnimating || state.gameOver) {
    return;
  }

  playRoundSound();
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

async function runTutorialRound() {
  const step = currentTutorialStep();
  if (!step || !tutorialAllows("round") || state.isAnimating) {
    return;
  }

  const invalidWorkers = invalidWorkerIds();
  if (invalidWorkers.length) {
    showPopup(
      "Make teams first",
      step.kind === "roundTrioDiscovery"
        ? "For this practice round, keep all three chemists together in one team before pressing Next round."
        : step.hideControls
        ? "For this practice round, drag the two chemists together into one team before pressing Next round."
        : "For this practice round, arrange chemists into one pair and one trio before pressing Next round."
    );
    return;
  }

  state.isAnimating = true;
  state.status = "Practice round";
  clearTransient();
  triggerRoundPulse(240);
  render();
  await wait(220);

  const shouldDiscover = step.kind === "roundDiscovery" || step.kind === "roundTrioDiscovery";
  const discoveryId = step.kind === "roundTrioDiscovery" ? "A2" : "A1";
  const roundRecord = buildTutorialRoundRecord(shouldDiscover, discoveryId);
  state.story = `Practice round ${roundRecord.round}: ${roundRecord.summary}`;

  if (step.kind === "roundNoDiscovery" || step.kind === "roundTrioDiscovery") {
    startGuidedTutorialRound(roundRecord);
    return;
  }

  await animateTutorialInteraction(roundRecord.interactions[0], step.kind === "roundDiscovery");

  if (roundRecord.interactions[0].discovery) {
    applyStageRewards();
  }

  clearTransient();
  state.roundHistory.push(roundRecord);
  state.round += 1;
  state.status = "Tutorial";
  state.isAnimating = false;
  state.tutorialFlags.roundComplete = true;
  state.tutorialMessage = roundRecord.interactions[0].discovery
    ? "Discovery! The team created a new product, and both chemists now know it."
    : "No discovery this time. The chemist tested a combination, but it did not create anything new.";
  render();
}

function startGuidedTutorialRound(roundRecord) {
  state.isAnimating = false;
  state.status = "Tutorial";
  state.tutorialFlags.roundRecord = roundRecord;
  state.tutorialFlags.roundPhase = "tested";
  showTutorialRoundPhase(roundRecord.interactions[0], "tested");
  render();
}

async function continueGuidedNoDiscoveryRound() {
  const roundRecord = state.tutorialFlags.roundRecord;
  if (!roundRecord) {
    return;
  }

  const interaction = roundRecord.interactions[0];
  if (state.tutorialFlags.roundPhase === "tested") {
    await fadeTutorialBubbles();
    state.tutorialFlags.roundPhase = "result";
    showTutorialRoundPhase(interaction, "result");
    state.tutorialFlags.roundComplete = true;
    state.roundHistory.push(roundRecord);
    state.round += 1;
    if (interaction.discovery) {
      interaction.discoverers.forEach((workerId) => {
        const worker = getWorkerById(workerId);
        triggerMoneyBurst(worker);
      });
      applyStageRewards();
      scheduleMoneyBurstCleanup();
    }
    render();
  }
}

async function fadeTutorialBubbles() {
  const hasBubbles = state.workers.some((worker) => worker.transient.length);
  if (!hasBubbles) {
    return;
  }

  state.workers.forEach((worker) => {
    worker.transient = worker.transient.map((message) => ({ ...message, fading: true }));
  });
  render();
  await wait(260);
  clearTransient();
}

function showTutorialRoundPhase(interaction, phase) {
  const worker = getWorkerById(interaction.worker);
  clearTransient();

  if (phase === "tested") {
    worker.transient.push({ kind: "bubble", frozen: true, html: `tests ${renderPotionGroup(interaction.triad, "xs")}` });
  }

  if (phase === "result") {
    if (interaction.discovery) {
      applyInteractionDiscovery(interaction);
      worker.transient.push({ kind: "bubble", frozen: true, html: `new product ${renderPotionGroup([interaction.discovery], "xs")}` });
      const teammateIds = interaction.groupMemberIds
        .filter((workerId) => !interaction.discoverers.includes(workerId));
      teammateIds.forEach((workerId) => {
        const teammate = getWorkerById(workerId);
        teammate.transient.push({ kind: "bubble", frozen: true, html: `learned ${renderPotionGroup([interaction.discovery], "xs")}` });
      });
    } else {
      worker.transient.push({ kind: "bubble", frozen: true, html: "no new product" });
    }
  }
}

function applyInteractionDiscovery(interaction) {
  if (!interaction.discovery || interaction.applied) {
    return;
  }

  const worker = getWorkerById(interaction.worker);
  const group = state.groups.find((entry) => entry.members.some((member) => member.id === worker.id));
  const discoverers = [];

  if (!worker.inventory.has(interaction.discovery)) {
    worker.inventory.add(interaction.discovery);
    worker.lastRound.made.push(interaction.discovery);
    worker.cumulativeDiscoveries += 1;
    updateBest(worker, interaction.discovery);
    discoverers.push(worker.id);
  }

  interaction.discoverers = discoverers;
  if (discoverers.length && group) {
    group.members
      .filter((recipient) => recipient.id !== worker.id)
      .forEach((recipient) => {
        if (!recipient.inventory.has(interaction.discovery)) {
          recipient.inventory.add(interaction.discovery);
          recipient.lastRound.received.push(interaction.discovery);
          updateBest(recipient, interaction.discovery);
        }
      });
  }

  interaction.applied = true;
}

async function animateTutorialInteraction(interaction, shouldDiscover) {
  const worker = getWorkerById(interaction.worker);

  clearTransient();
  worker.transient.push({ kind: "bubble", html: `tests ${renderPotionGroup(interaction.triad, "xs")}` });
  render();
  await wait(1650);

  clearTransient();
  if (shouldDiscover) {
    applyInteractionDiscovery(interaction);
    interaction.discoverers.forEach((workerId) => {
      const discoverer = getWorkerById(workerId);
      triggerMoneyBurst(discoverer);
    });
    scheduleMoneyBurstCleanup();
    worker.transient.push({ kind: "spark", html: `new product ${renderPotionGroup([interaction.discovery], "xs")}` });
  } else {
    worker.transient.push({ kind: "bubble", html: "no new product" });
  }
  render();
  await wait(1700);
}

function buildTutorialRoundRecord(shouldDiscover, discoveryId = "A1") {
  computeNetwork();
  const group = state.groups.find((entry) => entry.members.length >= MIN_GROUP_SIZE);
  const worker = discoveryId === "A2"
    ? (group.members.find((member) => member.inventory.has("A1")) || group.members[0])
    : group.members[0];
  state.workers.forEach((entry) => {
    entry.lastRound = emptyLastRound();
  });

  const discoveryTriads = {
    A1: ["a1", "a2", "a3"],
    A2: ["A1", "a1", "a2"]
  };
  const discoveryTriad = discoveryTriads[discoveryId] || discoveryTriads.A1;
  const triad = shouldDiscover ? discoveryTriad : ["a1", "a1", "b2"];

  const interaction = {
    worker: worker.id,
    workerName: worker.name,
    teamName: group.teamName,
    triad,
    discovery: shouldDiscover ? discoveryId : null,
    discoverers: [],
    groupMemberIds: group.members.map((member) => member.id)
  };

  worker.lastRound.interaction = { triad: interaction.triad };

  const diffusions = [];
  if (shouldDiscover) {
    interaction.discoverers = worker.inventory.has(discoveryId) ? [] : [worker.id];

    group.members
      .filter((recipient) => recipient.id !== worker.id)
      .forEach((recipient) => {
        if (!recipient.inventory.has(discoveryId)) {
          diffusions.push({ from: group.teamName, to: recipient.name, potion: discoveryId, source: "tutorial" });
        }
      });
  }

  return {
    round: state.round,
    interactions: [interaction],
    diffusions,
    summary: shouldDiscover
      ? `${worker.name} unlocked ${renderPotionToken(discoveryId, "xs")} <span class="summary-potion-name">${potionName(discoveryId)}</span> for ${formatMoney(stageValueForPotion(discoveryId))}.`
      : "The chemist tested a combination, but no new product appeared. Keep trying.",
    snapshot: state.workers.map((entry) => ({
      worker: entry.id,
      inventory: inventoryArray(entry.inventory),
      bestTier: entry.bestTier,
      bestScore: entry.bestScore
    }))
  };
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
    roundRecord.interactions.forEach((interaction) => animateInteraction(interaction));
    render();
    await wait(showAnimation ? MAIN_ROUND_BUBBLE_MS : AUTO_ROUND_BUBBLE_MS);

    const discoveryInteractions = roundRecord.interactions.filter((interaction) => interaction.discovery);
    if (discoveryInteractions.length) {
      clearTransient();
      discoveryInteractions.forEach((interaction) => {
        applyInteractionDiscovery(interaction);
        interaction.discoverers.forEach((workerId) => {
          const worker = getWorkerById(workerId);
          worker.transient.push({ kind: "spark", html: `&#10024; ${renderPotionToken(interaction.discovery, "xs")}` });
          triggerMoneyBurst(worker);
        });
      });
    }

    roundRecord.snapshot = state.workers.map((worker) => ({
      worker: worker.id,
      inventory: inventoryArray(worker.inventory),
      bestTier: worker.bestTier,
      bestScore: worker.bestScore
    }));

    if (discoveryInteractions.length) {
      scheduleMoneyBurstCleanup();
      render();
      await wait(showAnimation ? MAIN_DISCOVERY_HOLD_MS : AUTO_DISCOVERY_HOLD_MS);
    }
  }

  clearTransient();
  finalizeRoundState();
  state.isAnimating = false;
  render();
  return roundRecord;
}

function finalizeRoundState() {
  applyStageRewards();
  applyParticipantRoundEarning();
  applyParticipantCureBonusIfNeeded();
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
    .forEach((group) => {
      regroupDiffusions.push(...diffuseKnowledgeAcrossGroup(group, "regroup"));
    });

  const interactions = [];
  const diffusions = [...regroupDiffusions];
  const inventorySnapshot = new Map(
    state.workers.map((worker) => [worker.id, new Set(worker.inventory)])
  );

  state.groups
    .forEach((group) => {
      group.members.forEach((focal) => {
        const triad = weightedSampleFromInventory(inventorySnapshot.get(focal.id), 3, focal, true);
        const discovery = RECIPE_BOOK.get(canonicalTriad(triad)) || null;

        focal.lastRound.interaction = { triad };

        interactions.push({
          worker: focal.id,
          workerName: focal.name,
          teamName: group.teamName,
          triad,
          discovery,
          discoverers: [],
          groupMemberIds: group.members.map((member) => member.id)
        });
      });
    });

  interactions.forEach((interaction) => {
    const worker = getWorkerById(interaction.worker);

    if (!interaction.discovery) {
      return;
    }
    const group = state.groups.find((entry) => entry.members.some((member) => member.id === worker.id));
    interaction.discoverers = worker.inventory.has(interaction.discovery) ? [] : [worker.id];

    if (!interaction.discoverers.length) {
      return;
    }

    group.members
      .filter((recipient) => recipient.id !== worker.id)
      .forEach((recipient) => {
        if (!recipient.inventory.has(interaction.discovery)) {
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
  const worker = getWorkerById(interaction.worker);

  worker.transient.push({ kind: "bubble", html: `tests ${renderPotionGroup(interaction.triad, "xs")}` });

}

function clearTransient() {
  els.beams.innerHTML = "";
  state.workers.forEach((worker) => {
    worker.transient = [];
  });
}

function triggerMoneyBurst(worker) {
  playChachingSound();
  const now = Date.now();
  worker.moneyBurstStartedAt = now;
  worker.moneyBurstUntil = now + 2000;
}

function renderMoneyBurstSymbols(worker) {
  const elapsedSeconds = Math.max(0, (Date.now() - (worker.moneyBurstStartedAt || Date.now())) / 1000);
  const symbols = [
    { className: "left", delay: 0 },
    { className: "mid", delay: 0.03 },
    { className: "right", delay: 0.06 },
    { className: "far", delay: 0.09 }
  ];

  return symbols
    .map((symbol) => `<span class="money-symbol ${symbol.className}" style="animation-delay:${(symbol.delay - elapsedSeconds).toFixed(3)}s">$</span>`)
    .join("");
}

function getAudioContext() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) {
    return null;
  }
  if (!audioContext) {
    audioContext = new AudioContextClass();
  }
  if (audioContext.state === "suspended") {
    audioContext.resume();
  }
  return audioContext;
}

function tutorialNarrationFileForCurrentState(step = currentTutorialStep()) {
  if (!step) {
    return null;
  }
  if (step.kind === "roundDiscovery" && state.tutorialFlags.roundComplete) {
    return TUTORIAL_DYNAMIC_AUDIO_FILES.discoveryFound;
  }
  if (step.kind === "roundNoDiscovery") {
    if (state.tutorialFlags.roundPhase === "tested") {
      return TUTORIAL_DYNAMIC_AUDIO_FILES.testCombination;
    }
    if (state.tutorialFlags.roundPhase === "result") {
      return TUTORIAL_DYNAMIC_AUDIO_FILES.noProduct;
    }
  }
  if (step.kind === "roundTrioDiscovery") {
    if (state.tutorialFlags.roundPhase === "tested") {
      return TUTORIAL_DYNAMIC_AUDIO_FILES.independentTests;
    }
    if (state.tutorialFlags.roundPhase === "result") {
      return TUTORIAL_DYNAMIC_AUDIO_FILES.teamLearns;
    }
  }
  return TUTORIAL_AUDIO_FILES[state.tutorialStep] || null;
}

function playTutorialNarrationForCurrentState(step = currentTutorialStep()) {
  if (state.onboardingStage !== "tutorial") {
    stopTutorialNarration();
    return;
  }

  const fileName = tutorialNarrationFileForCurrentState(step);
  if (!fileName) {
    stopTutorialNarration();
    return;
  }

  const key = `${state.tutorialStep}:${state.tutorialFlags.roundPhase || ""}:${state.tutorialFlags.roundComplete ? "complete" : ""}:${fileName}`;
  if (key === tutorialNarrationKey) {
    return;
  }

  stopTutorialNarration({ keepKey: true });
  tutorialNarrationKey = key;
  tutorialNarration = new Audio(`./assets/audio/tutorial/${fileName}`);
  tutorialNarration.volume = 0.92;
  tutorialNarration.play().catch(() => {});
}

function stopTutorialNarration(options = {}) {
  if (tutorialNarration) {
    tutorialNarration.pause();
    tutorialNarration.currentTime = 0;
  }
  tutorialNarration = null;
  if (!options.keepKey) {
    tutorialNarrationKey = "";
  }
}

function playTone({ frequency, start = 0, duration = 0.12, type = "sine", gain = 0.08, endGain = 0.001 }) {
  const context = getAudioContext();
  if (!context) {
    return;
  }

  const oscillator = context.createOscillator();
  const gainNode = context.createGain();
  const startTime = context.currentTime + start;
  const endTime = startTime + duration;
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, startTime);
  gainNode.gain.setValueAtTime(0.001, startTime);
  gainNode.gain.exponentialRampToValueAtTime(gain, startTime + 0.012);
  gainNode.gain.exponentialRampToValueAtTime(endGain, endTime);
  oscillator.connect(gainNode);
  gainNode.connect(context.destination);
  oscillator.start(startTime);
  oscillator.stop(endTime + 0.02);
}

function playNoise({ start = 0, duration = 0.08, gain = 0.04, filterFrequency = 900 }) {
  const context = getAudioContext();
  if (!context) {
    return;
  }

  const sampleCount = Math.max(1, Math.floor(context.sampleRate * duration));
  const buffer = context.createBuffer(1, sampleCount, context.sampleRate);
  const data = buffer.getChannelData(0);
  for (let index = 0; index < sampleCount; index += 1) {
    data[index] = (Math.random() * 2 - 1) * (1 - index / sampleCount);
  }

  const source = context.createBufferSource();
  const filter = context.createBiquadFilter();
  const gainNode = context.createGain();
  const startTime = context.currentTime + start;
  source.buffer = buffer;
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(filterFrequency, startTime);
  gainNode.gain.setValueAtTime(gain, startTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
  source.connect(filter);
  filter.connect(gainNode);
  gainNode.connect(context.destination);
  source.start(startTime);
}

function playChachingSound() {
  playTone({ frequency: 1318.51, duration: 0.09, type: "triangle", gain: 0.06 });
  playTone({ frequency: 1760, start: 0.08, duration: 0.14, type: "triangle", gain: 0.075 });
  playTone({ frequency: 2637.02, start: 0.16, duration: 0.18, type: "sine", gain: 0.045 });
  playNoise({ start: 0.03, duration: 0.16, gain: 0.025, filterFrequency: 4200 });
}

function playRoundSound() {
  playTone({ frequency: 392, duration: 0.11, type: "sine", gain: 0.035 });
  playTone({ frequency: 523.25, start: 0.055, duration: 0.12, type: "sine", gain: 0.035 });
}

function playPlopSound() {
  playNoise({ start: 0, duration: 0.028, gain: 0.07, filterFrequency: 2400 });
  playTone({ frequency: 520, start: 0.006, duration: 0.035, type: "square", gain: 0.045 });
  playTone({ frequency: 190, start: 0.028, duration: 0.075, type: "triangle", gain: 0.09 });
  playTone({ frequency: 125, start: 0.055, duration: 0.07, type: "sine", gain: 0.055 });
}

function startBackgroundMusic() {
  if (musicStarted) {
    getAudioContext();
    return;
  }

  const context = getAudioContext();
  if (!context) {
    return;
  }
  musicStarted = true;
  musicStep = 0;
  scheduleMusicStep();
}

function scheduleMusicStep() {
  playMusicStep(musicStep);
  musicStep = (musicStep + 1) % 192;
  musicTimer = window.setTimeout(scheduleMusicStep, 135);
}

function playMusicStep(step) {
  const beat = 0.135;
  const hz = {
    C4: 261.63, D4: 293.66, E4: 329.63, G4: 392, A4: 440, B4: 493.88,
    C5: 523.25, D5: 587.33, E5: 659.25, G5: 783.99, A5: 880, B5: 987.77, C6: 1046.5
  };
  const chords = [
    [261.63, 329.63, 392],
    [220, 261.63, 329.63],
    [246.94, 293.66, 392],
    [196, 246.94, 293.66],
    [261.63, 329.63, 392],
    [220, 261.63, 329.63],
    [293.66, 392, 493.88],
    [246.94, 329.63, 392],
    [220, 261.63, 329.63],
    [196, 246.94, 293.66],
    [246.94, 293.66, 392],
    [261.63, 329.63, 392]
  ];
  const melodyEvents = [
    [0, "E5", 4], [6, "G5", 2], [10, "E5", 2], [14, "D5", 4],
    [22, "C5", 3], [27, "D5", 1], [29, "E5", 5],
    [38, "G5", 3], [43, "A5", 2], [47, "G5", 5],
    [56, "E5", 2], [60, "D5", 2], [64, "E5", 4], [70, "G5", 2],
    [74, "A5", 2], [78, "G5", 4], [86, "E5", 2], [90, "C5", 5],
    [100, "D5", 3], [105, "E5", 2], [109, "G5", 4], [117, "E5", 5],
    [128, "G5", 4], [134, "A5", 2], [138, "B5", 3], [144, "C6", 6],
    [154, "B5", 2], [158, "A5", 3], [164, "G5", 4],
    [172, "E5", 3], [177, "D5", 2], [181, "C5", 6]
  ];
  const bassEvents = [
    [0, 130.81, 6], [8, 98, 5], [16, 123.47, 6], [24, 98, 5],
    [32, 130.81, 6], [40, 98, 5], [48, 146.83, 6], [56, 123.47, 5],
    [64, 130.81, 6], [72, 98, 5], [80, 123.47, 6], [88, 98, 5],
    [96, 130.81, 6], [104, 98, 5], [112, 146.83, 6], [120, 123.47, 5],
    [128, 110, 6], [136, 98, 5], [144, 123.47, 6], [152, 130.81, 5],
    [160, 146.83, 6], [168, 123.47, 5], [176, 98, 6], [184, 130.81, 5]
  ];
  const melodyEvent = melodyEvents.find(([start]) => start === step);
  const bassEvent = bassEvents.find(([start]) => start === step);
  const chord = chords[Math.floor(step / 16) % chords.length];
  const arpPattern = [0, null, 1, null, 2, null, 1, null, 0, null, 2, null, 1, null, 2, null];
  const arpIndex = arpPattern[step % 16];
  if (arpIndex !== null) {
    const phraseBoost = step >= 128 ? 1.15 : 1;
    playTone({ frequency: chord[arpIndex] * 2, duration: 0.07, type: "triangle", gain: 0.0048 * phraseBoost, endGain: 0.0007 });
  }
  if (melodyEvent) {
    const [, noteName, lengthSteps] = melodyEvent;
    const frequency = hz[noteName];
    playTone({ frequency, duration: beat * lengthSteps * 0.86, type: "square", gain: 0.017, endGain: 0.0008 });
    playTone({ frequency: frequency * 2, start: 0.018, duration: Math.min(beat * lengthSteps * 0.38, 0.16), type: "triangle", gain: 0.0035, endGain: 0.0008 });
  }
  if (bassEvent) {
    const [, frequency, lengthSteps] = bassEvent;
    playTone({ frequency, duration: beat * lengthSteps * 0.8, type: "triangle", gain: 0.018, endGain: 0.0008 });
  }
  if (step % 16 === 0) {
    playNoise({ duration: 0.028, gain: 0.014, filterFrequency: 480 });
  } else if ([6, 14].includes(step % 16)) {
    playNoise({ duration: 0.018, gain: 0.009, filterFrequency: 3400 });
  } else if ([3, 11].includes(step % 16)) {
    playNoise({ duration: 0.014, gain: 0.006, filterFrequency: 5200 });
  }
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
        worker.moneyBurstStartedAt = 0;
      }
    });
    render();
  }, remaining + 10);
}

function buildSummary(interactions) {
  const discoveries = interactions.filter((interaction) => interaction.discovery && interaction.discoverers.length);
  if (!discoveries.length) {
    return "No new compounds were discovered this round, but the chemists still tested combinations and learned from their teams.";
  }

  const snippets = discoveries.map((interaction) => `${interaction.workerName} from ${interaction.teamName} unlocked ${renderPotionToken(interaction.discovery, "xs")} <span class="summary-potion-name">${potionName(interaction.discovery)}</span> for ${formatMoney(stageValueForPotion(interaction.discovery))}`);
  return `${snippets.join(" &bull; ")}.`;
}

function currentCompletionState() {
  const discovered = discoveredPotions();
  const progress = trackerProgress(discovered);
  const cure = curedPotion(discovered);
  if (cure) {
    return {
      finished: true,
      message: `Game complete: the company launched ${renderPotionToken(cure, "xs")} <span class="summary-potion-name">${potionName(cure)}</span>, the flagship crossover compound, finished with ${formatMoney(state.companyCash)} in cash, and earned you ${formatParticipantMoney(state.participantEarnings)}.`
    };
  }

  if (state.companyCash <= 0) {
    return {
      finished: true,
      message: `Game over: the company went bankrupt before reaching the flagship compound. Final cash: ${formatMoney(state.companyCash)}. Your earnings: ${formatParticipantMoney(state.participantEarnings)}.`
    };
  }

  if (state.round >= MAX_ROUNDS) {
    if (state.unlimitedRounds) {
      return { finished: false, message: "" };
    }
    return {
      finished: true,
      message: `Game complete: the ${MAX_ROUNDS}-round limit has been reached. The company completed ${progress.completed} of ${TRACKER_STAGES.length} milestones, earned ${formatMoney(state.totalRevenue)} in discovery revenue, finished with ${formatMoney(state.companyCash)} in cash, and earned you ${formatParticipantMoney(state.participantEarnings)}.`
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
      body: `Your company reached the final crossover compound, finished with ${formatMoney(state.companyCash)} in company funds, and earned you ${formatParticipantMoney(state.participantEarnings)}.`,
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
    return null;
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
  if (state.isAnimating || state.autoRunning || state.gameOver || !(state.onboardingStage === "done" || tutorialAllows("hire")) || state.workers.length >= maxWorkersForCurrentStep()) {
    return;
  }

  const worker = createWorker(state.workers, state.nextWorkerIndex);
  state.workers.push(worker);
  state.nextWorkerIndex += 1;
  playPlopSound();
  if (isTutorialActive()) {
    state.tutorialFlags.hired = true;
    if (currentTutorialStep()?.kind === "trioGroup") {
      positionNewTutorialWorker(worker);
      state.tutorialMessage = "Now drag the new chemist into the pair to make a three-person team.";
    } else if (currentTutorialStep()?.kind === "pairAndTrio") {
      positionNewTutorialWorker(worker);
      state.tutorialMessage = state.workers.length < 5
        ? "Good. Hire one more chemist, then arrange one pair and one trio."
        : "Now arrange the five chemists into one pair and one trio.";
    } else {
      state.tutorialMessage = "Good. Now click a minus button on any chemist to fire one.";
    }
  }
  state.story = `${worker.name} joined the company. Payroll updates when the next round begins.`;
  render();
}

function removeWorker(workerId) {
  if (state.isAnimating || state.autoRunning || state.gameOver || !(state.onboardingStage === "done" || tutorialAllows("fire")) || state.workers.length <= minWorkersForCurrentStep()) {
    return;
  }

  const worker = getWorkerById(workerId);
  state.workers = state.workers.filter((entry) => entry.id !== workerId);
  if (isTutorialActive()) {
    state.tutorialFlags.fired = true;
    if (currentTutorialStep()?.kind === "trioGroup") {
      state.tutorialMessage = state.workers.length === 3
        ? "Good. Now keep all three chemists together in one team."
        : "Remove extra chemists until only three remain.";
    } else if (currentTutorialStep()?.kind === "pairAndTrio") {
      state.tutorialMessage = state.workers.length === 5
        ? "Good. Now arrange one pair and one trio."
        : "Remove extra chemists until only five remain.";
    } else {
      state.tutorialMessage = "Nice. You have practiced hiring and firing.";
    }
  }
  state.story = `${worker.name} has been removed from the roster. Future payroll is reduced.`;
  render();
}

function positionNewTutorialWorker(worker) {
  if (!isMobileLayout()) {
    worker.x = 706;
    worker.y = 330;
    return;
  }

  const cardRect = els.onboardingCard?.getBoundingClientRect();
  const boardRect = els.board?.getBoundingClientRect();
  const cardBoardRect = cardRect && boardRect
    ? {
      left: scaleToBoardX(cardRect.left - boardRect.left, boardRect.width),
      right: scaleToBoardX(cardRect.right - boardRect.left, boardRect.width),
      top: scaleToBoardY(cardRect.top - boardRect.top, boardRect.height),
      bottom: scaleToBoardY(cardRect.bottom - boardRect.top, boardRect.height)
    }
    : null;
  const candidates = [
    { x: BOARD_WIDTH * 0.5, y: BOARD_HEIGHT * 0.52 },
    { x: BOARD_WIDTH * 0.36, y: BOARD_HEIGHT * 0.5 },
    { x: BOARD_WIDTH * 0.64, y: BOARD_HEIGHT * 0.5 },
    { x: BOARD_WIDTH * 0.5, y: BOARD_HEIGHT * 0.64 },
    { x: BOARD_WIDTH * 0.3, y: BOARD_HEIGHT * 0.62 },
    { x: BOARD_WIDTH * 0.7, y: BOARD_HEIGHT * 0.62 }
  ].map((candidate) => ({
    x: clamp(candidate.x, WORKER_RADIUS + 12, safeBoardMaxX()),
    y: clamp(candidate.y, safeBoardMinY(), safeBoardMaxY())
  }));

  const otherWorkers = state.workers.filter((entry) => entry.id !== worker.id);
  const scoreCandidate = (candidate) => {
    const nearestWorkerDistance = otherWorkers.length
      ? Math.min(...otherWorkers.map((entry) => distance(candidate, entry)))
      : effectiveProximityThreshold();
    const cardPenalty = cardBoardRect && pointInsidePaddedRect(candidate, cardBoardRect, 80) ? 900 : 0;
    return nearestWorkerDistance - cardPenalty;
  };
  const best = candidates.reduce((winner, candidate) => (
    scoreCandidate(candidate) > scoreCandidate(winner) ? candidate : winner
  ), candidates[0]);
  worker.x = best.x;
  worker.y = best.y;
}

function pointInsidePaddedRect(point, rect, padding) {
  return point.x >= rect.left - padding
    && point.x <= rect.right + padding
    && point.y >= rect.top - padding
    && point.y <= rect.bottom + padding;
}

function createWorker(activeWorkers = [], positionIndex = 0) {
  const profile = chooseAvailableWorkerProfile(activeWorkers);
  const position = initialPositionForIndex(positionIndex);
  return {
    id: profile.id,
    name: profile.name,
    profile,
    x: clamp(position.x, WORKER_RADIUS + 12, safeBoardMaxX()),
    y: clamp(position.y, safeBoardMinY(), safeBoardMaxY()),
    inventory: new Set(BASE_POTIONS),
    bestTier: 0,
    bestScore: 10,
    cumulativeDiscoveries: 0,
    moneyBurstUntil: 0,
    moneyBurstStartedAt: 0,
    lastRound: emptyLastRound(),
    transient: []
  };
}

function chooseAvailableWorkerProfile(activeWorkers = []) {
  const activeProfileIds = new Set(activeWorkers.map((worker) => worker.profile.id));
  const availableProfiles = WORKER_PROFILES.filter((profile) => !activeProfileIds.has(profile.id));
  return sampleUniform(availableProfiles.length ? availableProfiles : WORKER_PROFILES);
}

function safeBoardMaxX() {
  if (isMobileLayout()) {
    return BOARD_WIDTH - WORKER_RADIUS - 12;
  }

  return BOARD_WIDTH - effectiveReservedSidebarWidth() - WORKER_RADIUS - 12;
}

function safeBoardMinY() {
  if (isMobileLayout()) {
    return WORKER_RADIUS + mobilePixelsToBoardY(56);
  }

  return WORKER_RADIUS + 18;
}

function safeBoardMaxY() {
  if (isMobileLayout()) {
    return BOARD_HEIGHT - mobilePixelsToBoardY(112) - WORKER_RADIUS;
  }

  return BOARD_HEIGHT - 64;
}

function isMobileLayout() {
  return window.matchMedia("(max-width: 720px), (max-height: 520px), (pointer: coarse) and (max-width: 900px)").matches;
}

function effectiveProximityThreshold() {
  return isMobileLayout() ? 235 : PROXIMITY_THRESHOLD;
}

function effectiveReservedSidebarWidth() {
  if (isMobileLayout()) {
    return 0;
  }

  const boardRect = els.board?.getBoundingClientRect();
  const sidebarRect = document.querySelector(".board-sidebar")?.getBoundingClientRect();
  if (!boardRect?.width || !sidebarRect?.width) {
    return RESERVED_SIDEBAR_WIDTH;
  }

  const reservedPixels = Math.max(0, boardRect.right - sidebarRect.left + 18);
  return clamp((reservedPixels / boardRect.width) * BOARD_WIDTH, RESERVED_SIDEBAR_WIDTH, BOARD_WIDTH * 0.68);
}

function mobilePixelsToBoardY(pixelHeight) {
  const boardRect = els.board?.getBoundingClientRect();
  if (!boardRect?.height) {
    return pixelHeight;
  }

  return (pixelHeight / boardRect.height) * BOARD_HEIGHT;
}

function initialPositionForIndex(index) {
  const basePositions = [
    { x: 126, y: 154 },
    { x: 374, y: 188 },
    { x: 676, y: 162 },
    { x: 812, y: 196 },
    { x: 148, y: 542 },
    { x: 404, y: 586 },
    { x: 638, y: 528 },
    { x: 808, y: 574 },
    { x: 132, y: 318 },
    { x: 332, y: 354 },
    { x: 546, y: 326 },
    { x: 766, y: 360 },
    { x: 220, y: 688 },
    { x: 460, y: 680 },
    { x: 672, y: 690 },
    { x: 824, y: 666 }
  ];

  if (index < basePositions.length) {
    return basePositions[index];
  }

  const column = index % 4;
  const row = Math.floor(index / 4);
  return {
    x: clamp(116 + (column * 210) + ((index * 17) % 32), WORKER_RADIUS + 12, safeBoardMaxX()),
    y: clamp(132 + ((row % 4) * 172) + ((index * 19) % 34), safeBoardMinY(), safeBoardMaxY())
  };
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

function applyParticipantRoundEarning() {
  state.participantRoundEarnings += PARTICIPANT_ROUND_EARNING;
  state.participantEarnings += PARTICIPANT_ROUND_EARNING;
}

function applyParticipantCureBonusIfNeeded() {
  if (state.cureBonusApplied || !hasCure(discoveredPotions())) {
    return;
  }

  const cashRatio = clamp(state.companyCash / INITIAL_COMPANY_CASH, 0, 1);
  const bonus = Math.round((PARTICIPANT_CURE_BONUS_MAX * cashRatio) * 100) / 100;
  state.participantCureBonus = bonus;
  state.participantEarnings += bonus;
  state.cureBonusApplied = true;
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

function formatTrackerMoney(value) {
  if (!isMobileLayout()) {
    return formatMoney(value);
  }

  if (Math.abs(value) >= 1000000) {
    const millions = value / 1000000;
    return `$${Number.isInteger(millions) ? millions.toFixed(0) : millions.toFixed(1)}M`;
  }

  if (Math.abs(value) >= 1000) {
    return `$${Math.round(value / 1000)}k`;
  }

  return formatMoney(value);
}

function formatParticipantMoney(value) {
  return `$${value.toFixed(2)}`;
}

function adjustedPotionWeight(potionId) {
  return POTIONS[potionId].weight;
}

function updateBest(worker, potionId) {
  worker.bestTier = Math.max(worker.bestTier, POTIONS[potionId].tier);
  worker.bestScore = Math.max(worker.bestScore, POTIONS[potionId].discoverScore);
}

function weightedSampleFromInventory(inventory, count, worker, allowRepeats = false) {
  const available = inventoryArray(inventory).map((id) => ({ id, weight: adjustedPotionWeight(id) }));
  const chosen = [];
  let remaining = [...available];

  const drawCount = allowRepeats ? count : Math.min(count, remaining.length);
  for (let draw = 0; draw < drawCount; draw += 1) {
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
    if (!allowRepeats) {
      remaining.splice(index, 1);
    }
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
  const key = members.map((member) => member.id).sort().join("");
  const hash = [...key].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return `Team ${adjectives[hash % adjectives.length]}`;
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
