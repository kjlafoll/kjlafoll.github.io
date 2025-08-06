let trials = [];
let practiceTrials = [];
let mainTrials = [];
let currentTrialIndex = 0;
let results = [];
let requeueTrials = [];
let startTime;
let participantID = "";
let preInstructions = "";
let trialTimeout;
let isMobile = /android|iphone|ipad|mobile/i.test(navigator.userAgent);
let inPractice = true;
let introCompleted = false;
let popupActive = true;
let trialActive = false;
let surveyResponses = {};

const introMessages = [
  "Welcome to the Family Decision Game!\n\nBefore starting the game, you'll answer a few short questions about financial decision-making in relationships.",
  "Please enter your Participant ID below."
];

let introStep = 0;

const optionA = document.getElementById("optionA");
const optionB = document.getElementById("optionB");
const statusText = document.getElementById("status");
const orLabel = document.getElementById("orLabel");
const numberButtons = document.getElementById("popupButtons");

document.addEventListener("DOMContentLoaded", function () {
  adjustForMobile();
  window.addEventListener("resize", adjustForMobile);

  fetch('trials.csv')
    .then(response => response.text())
    .then(text => {
      let data = Papa.parse(text, { header: true }).data;
      const allTrials = data.filter(row => row.ImmediateAmount && row.DelayedAmount);
      const realTrials = allTrials.filter(row => row.AttentionCheck != "1");
      const attentionTrials = allTrials.filter(row => row.AttentionCheck == "1");

      shuffleArray(realTrials);
      shuffleArray(attentionTrials);

      practiceTrials = realTrials.slice(0, 8);
      mainTrials = realTrials.slice(8, 108).concat(attentionTrials);
      shuffleArray(mainTrials);

      trials = practiceTrials;
    });

  document.getElementById("introText").textContent = introMessages[introStep];
  document.getElementById("startButton").addEventListener("click", handleIntroSteps);

  document.addEventListener("keydown", (e) => {
    if (popupActive) {
      const activeInput = document.activeElement.tagName === "INPUT" || document.activeElement.tagName === "TEXTAREA";
      if (!activeInput) {  // ✅ Only allow SPACE if not typing
        if (document.getElementById("instructionOverlay").style.display !== "none" && e.code === "Space") {
          e.preventDefault();
          document.getElementById("startButton").click();
        }
        if (document.getElementById("popupOverlay").style.display !== "none" && e.code === "Space") {
          e.preventDefault();
          document.getElementById("popupContinue").click();
        }
      }
    }
  });

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
});

/** ---------------- MOBILE RESPONSIVENESS ---------------- */
function adjustForMobile() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  if (width <= 768) {
    document.body.classList.add("mobile");
    document.body.classList.remove("desktop");
    [optionA, optionB].forEach(box => {
      box.style.height = Math.floor(height * 0.18) + "px";
      box.style.fontSize = Math.max(12, Math.min(width * 0.04, height * 0.04)) + "px";
    });
    const popupFontSize = Math.max(12, Math.min(width * 0.045, height * 0.025));
    document.querySelectorAll(".instruction-content").forEach(p => {
      p.style.width = Math.floor(width * 0.9) + "px";
      p.style.maxWidth = Math.floor(width * 0.9) + "px";
      p.style.maxHeight = Math.floor(height * 0.8) + "px";
      p.style.fontSize = popupFontSize + "px";
      p.style.overflowY = "auto";
    });
  } else {
    document.body.classList.add("desktop");
    document.body.classList.remove("mobile");
    [optionA, optionB].forEach(box => {
      box.style.width = "220px";
      box.style.height = "150px";
      box.style.fontSize = "1.2em";
    });
    document.querySelectorAll(".instruction-content").forEach(p => {
      p.style.maxWidth = "500px";
      p.style.fontSize = "16px";
    });
  }
}

/** ---------------- SURVEY QUESTIONS ---------------- */
const surveyQuestions = [
  { id: "relative_income", text: "How much money do you make as compared to your partner?<br><br>1 = I make a lot less than my partner<br>2 = I make moderately less<br>3 = I make slightly less<br>4 = Exactly the same<br>5 = Slightly more<br>6 = Moderately more<br>7 = A lot more" },
  { id: "joint_ownership_1", text: "It makes no difference which account or name money is kept in—all the money belongs to both of us.<br><br>1 = Strongly disagree<br>7 = Strongly agree" },
  { id: "joint_ownership_2", text: "We see ourselves as independent from each other financially.<br><br>1 = Strongly disagree<br>7 = Strongly agree" },
  { id: "joint_ownership_3", text: "It’s important that each of us has their own savings (e.g., bank account, personal savings).<br><br>1 = Strongly disagree<br>7 = Strongly agree" },
  { id: "proj_20_80", text: "Over the course of their relationship, Partner A contributed around 80% of their total assets, while Partner B contributed around 20%.<br>How fair is it if they split up their assets this way?<br><br>Partner A gets 20%, Partner B gets 80%<br><br>1 = Extremely fair<br>7 = Extremely unfair" },
  { id: "proj_30_70", text: "Over the course of their relationship, Partner A contributed around 80% of their total assets, while Partner B contributed around 20%.<br>How fair is it if they split up their assets this way?<br><br>Partner A gets 30%, Partner B gets 70%<br><br>1 = Extremely fair<br>7 = Extremely unfair" },
  { id: "proj_40_60", text: "Over the course of their relationship, Partner A contributed around 80% of their total assets, while Partner B contributed around 20%.<br>How fair is it if they split up their assets this way?<br><br>Partner A gets 40%, Partner B gets 60%<br><br>1 = Extremely fair<br>7 = Extremely unfair" },
  { id: "proj_50_50", text: "Over the course of their relationship, Partner A contributed around 80% of their total assets, while Partner B contributed around 20%.<br>How fair is it if they split up their assets this way?<br><br>Partner A gets 50%, Partner B gets 50%<br><br>1 = Extremely fair<br>7 = Extremely unfair" },
  { id: "proj_60_40", text: "Over the course of their relationship, Partner A contributed around 80% of their total assets, while Partner B contributed around 20%.<br>How fair is it if they split up their assets this way?<br><br>Partner A gets 60%, Partner B gets 40%<br><br>1 = Extremely fair<br>7 = Extremely unfair" },
  { id: "proj_70_30", text: "Over the course of their relationship, Partner A contributed around 80% of their total assets, while Partner B contributed around 20%.<br>How fair is it if they split up their assets this way?<br><br>Partner A gets 70%, Partner B gets 30%<br><br>1 = Extremely fair<br>7 = Extremely unfair" },
  { id: "proj_80_20", text: "Over the course of their relationship, Partner A contributed around 80% of their total assets, while Partner B contributed around 20%.<br>How fair is it if they split up their assets this way?<br><br>Partner A gets 80%, Partner B gets 20%<br><br>1 = Extremely fair<br>7 = Extremely unfair" }
];

let currentSurveyIndex = 0;
let selectedValue = null;

function showSurveyQuestion(index) {
  popupActive = true;
  trialActive = false;
  document.getElementById("popupOverlay").style.display = "flex";
  document.getElementById("popupMessage").innerHTML = surveyQuestions[index].text;
  numberButtons.style.display = "flex";

  // Reset selection
  selectedValue = null;

  // Attach listeners once per question
  numberButtons.querySelectorAll("button").forEach(btn => {
    btn.classList.remove("selected");
    btn.onclick = () => {
      // Clear previous selection
      numberButtons.querySelectorAll("button").forEach(b => b.classList.remove("selected"));
      // Highlight this one
      btn.classList.add("selected");
      selectedValue = btn.textContent.trim();
    };
  });

  // Continue button
  const continueBtn = document.getElementById("popupContinue");
  continueBtn.onclick = () => {
    if (!selectedValue) {
      alert("Please select a number before continuing.");
      return;
    }

    // Save response
    surveyResponses[surveyQuestions[index].id] = selectedValue;

    currentSurveyIndex++;
    if (currentSurveyIndex < surveyQuestions.length) {
      showSurveyQuestion(currentSurveyIndex);
    } else {
      numberButtons.style.display = "none";
      popupActive = false;
      document.getElementById("popupOverlay").style.display = "none";
      // 🔹 Show instructions here
      showPopup(isMobile
          ? "You must respond within 10 seconds on each trial.\n\nOn a mobile device, tap directly on the option you prefer.\n\nPlease choose as quickly and as accurately as possible."
          : "You must respond within 10 seconds on each trial.\n\nOn a computer, press the **A key** to choose the LEFT option and the **L key** to choose the RIGHT option.\n\nPlease choose as quickly and as accurately as possible.",
          () => {
              popupActive = false;
              startPractice();
          });
    }
  };
}



/** ---------------- INTRO STEPS ---------------- */
function handleIntroSteps() {
  if (introStep < introMessages.length - 1) {
    introStep++;
    document.getElementById("introText").textContent = introMessages[introStep];
    if (introStep === introMessages.length - 1) {
      document.getElementById("participantFields").style.display = "block";
      document.getElementById("startButton").textContent = "Next";
    }
    return;
  }

  participantID = document.getElementById("participantID").value.trim();
  if (!participantID) {
      alert("Please enter your Participant ID.");
      return;
  }
  introCompleted = true;
  document.getElementById("instructionOverlay").style.display = "none";
  showSurveyQuestion(currentSurveyIndex);

}


/* ------------------------
   TRIAL FUNCTIONS
------------------------- */

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
  document.getElementById("keyLabelA").style.visibility = "hidden";
  document.getElementById("keyLabelB").style.visibility = "hidden";

  orLabel.textContent = "+";
  orLabel.classList.add("cross-visible");

  setTimeout(() => {
    optionA.classList.remove("hidden-transparent");
    optionB.classList.remove("hidden-transparent");
    orLabel.textContent = "OR";
    orLabel.classList.remove("cross-visible");
    if (!isMobile) {
      document.getElementById("keyLabelA").style.visibility = "visible";
      document.getElementById("keyLabelB").style.visibility = "visible";
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
      showPopup("Practice complete! Press SPACE or tap Continue to start the real game.", () => {
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
  const immText = trial.ImmediateDelay == 0 ? "right now" : `in ${trial.ImmediateDelay} days`;
  const delText = trial.DelayedDelay == 0 ? "right now" : `in ${trial.DelayedDelay} days`;

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
  startTime = new Date().getTime();

  clearTimeout(trialTimeout);
  trialTimeout = setTimeout(() => handleLapse(trial), 10000);
}

function handleKeyChoice(event) {
  if (popupActive || !trialActive) return;
  if (event.key.toLowerCase() === 'a') handleChoice(optionA.dataset.choice);
  if (event.key.toLowerCase() === 'l') handleChoice(optionB.dataset.choice);
}

function handleChoice(choice) {
  if (popupActive || !trialActive) return;
  trialActive = false;

  const trialStart = startTime;
  const rt = new Date().getTime() - trialStart;
  clearTimeout(trialTimeout);
  const trial = trials[currentTrialIndex];
  const isFalseStart = rt < 150;

  const correctChoice = trial.ImmediateAmount > trial.DelayedAmount && trial.ImmediateDelay <= trial.DelayedDelay ? "A" :
                       trial.DelayedAmount > trial.ImmediateAmount && trial.DelayedDelay <= trial.ImmediateDelay ? (trial.NowOnLeft == "1" ? "B" : "A") : null;

  if (optionA.dataset.choice === choice) {
    optionA.style.border = "4px solid green";
  }
  if (optionB.dataset.choice === choice) {
    optionB.style.border = "4px solid green";
  }

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
      PreInstructions: preInstructions,
      startTimeAbsolute: new Date(trialStart).toISOString(),
      endTimeAbsolute: new Date().toISOString(),
      relativeIncome: relativeIncome,
      jointOwnershipResponses: JSON.stringify(jointOwnershipResponses),
      projectionsResponses: JSON.stringify(projectionsResponses),
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
  showPopup("Too slow! You have 10 seconds to respond. Press SPACE or tap Continue to move on.", () => {
    popupActive = false;
    if (!inPractice) requeueTrials.push(trial);
    currentTrialIndex++;
    setTimeout(showFixationCross, 500);
  });
}

function showWarning(message) {
  statusText.textContent = message;
}

function showPopup(message, callback) {
  popupActive = true;
  trialActive = false;
  const popup = document.getElementById("popupOverlay");
  document.getElementById("popupMessage").textContent = message;
  popup.style.display = "flex";

  const btn = document.getElementById("popupContinue");
  btn.onclick = () => {
    popup.style.display = "none";
    popupActive = false;
    callback();
  };
}

async function endGame() {
  statusText.textContent = "All trials completed! Saving data...";
  const filename = `family_delay_discounting_${participantID}.json`;
  const dataStr = JSON.stringify(results, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url_local = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url_local;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  await sendToRedCap(results, filename);
}

async function sendToRedCap(dataArray, filename) {
  const url = 'https://redcap.case.edu/api/';
  const timestamp = Date.now().toString();
  const fileContent = JSON.stringify(dataArray);

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
    .done(function(response) {
        console.log("REDCap record created:", response);
      })
      .fail(function(error) {
        console.error("REDCap create error:", error);
      });
  await delay(700);

  const file = new File([fileContent], filename, { type: "application/json" });
  const formData = new FormData();
  formData.append('token', '2C941E2CCA757DF649E150366AD3904E');
  formData.append('content', 'file');
  formData.append('action', 'import');
  formData.append('field', 'prt_data_json');
  formData.append("overwriteBehavior", "normal");
  formData.append('record', timestamp);
  formData.append('file', file);

  $.ajax({
    url,
    type: 'POST',
    data: formData,
    contentType: false,
    processData: false
  })
  .done(function(response) {
    console.log("File uploaded:", response);
  })
  .fail(function(error) {
    console.error("File upload error:", error);
  });
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