let gameData;
let currentGameIndex = 0;
let player1Data = [];
let totalPoints = 0; // for tracking player 1's points across trials

// const isMobile = window.mobileAndTabletCheck(); //use this as formatting condition
const filePath = './HeddenData.json';

fetch(filePath)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    gameData = data.map(g => ({
      ...g,
      Trial: Number(g.Trial), // convert trial to a number bc accidentally made it a string
    }));
    console.log(gameData);
    setupGame(); // start the first game
  })
  .catch(error => console.error('Error loading the JSON file:', error));

//// GAME SETUP
async function setupGame() {
  if (!gameData || currentGameIndex >= gameData.length) {
    document.getElementById("status").textContent = "All trials completed! Thanks for playing.";
    return;
  }
  showButtons();

  const game = gameData[currentGameIndex];

  ///// For top corner data updates

  document.getElementById("trialType").textContent = game.Round;
  document.getElementById("trialNumber").textContent = game.Trial;
  

  // Clear the board and show transition message
  document.querySelectorAll("#gameBoard span").forEach(span => span.textContent = "");
  document.querySelectorAll("#gameBoard td").forEach(cell => cell.classList.remove("highlight"));

  // Pause for 0.5 seconds before proceeding
  await delay(700);

  // Parse payoffs to setup the board
  const p1Payoff = game.P1Payoff.split(" ").map(Number);
  const p2Payoff = game.P2Payoff.split(" ").map(Number);
  const computerDecisionQuadruplet = game.Quadruplet.split(" ").map(Number);

  // Fill the board with payoffs
  document.getElementById("A-p1").textContent = p1Payoff[0];
  document.getElementById("A-p2").textContent = p2Payoff[0];
  document.getElementById("B-p1").textContent = p1Payoff[1];
  document.getElementById("B-p2").textContent = p2Payoff[1];
  document.getElementById("C-p1").textContent = p1Payoff[2];
  document.getElementById("C-p2").textContent = p2Payoff[2];
  document.getElementById("D-p1").textContent = p1Payoff[3];
  document.getElementById("D-p2").textContent = p2Payoff[3];

  // Start in A
  let currentCell = "A";
  highlightCell(currentCell);

  // Update status message
  document.getElementById("status").textContent = `Trial ${game.Trial}: Player 1, make your move!`;

  // Remove and replace buttons to fix duplicates
  const moveButton = document.getElementById("moveButton");
  const stayButton = document.getElementById("stayButton");
  moveButton.replaceWith(moveButton.cloneNode(true));
  stayButton.replaceWith(stayButton.cloneNode(true));

  const updatedMoveButton = document.getElementById("moveButton");
  const updatedStayButton = document.getElementById("stayButton");



  /// START TIME
  let startTime = new Date().getTime();


  // Event listeners for buttons to update cell if player moves
  updatedMoveButton.addEventListener("click", () => {

    /// END TIME
    let decisiontime = new Date().getTime() - startTime;

    // red cap data to save
    if (player1Data.length < currentGameIndex + 1) {
      const game = gameData[currentGameIndex];
      const quadruplet = game.Quadruplet.split(" ").map(Number);
      
      let strategy = "trivial"; // Default for training trials
      if (game.Round === "Test") {
          if (1 === quadruplet[2]) {
              strategy = "myopic";
          } else if (1 === quadruplet[3]) {
              strategy = "predictive";
          }
      }

      player1Data.push({
          trial: game.Trial,
          first_move: "move",
          strategy: strategy,
          decisionTime: decisiontime
      });
    }
  
    if (currentCell === "A") {
      currentCell = "B";
    } else if (currentCell === "B") {
      currentCell = "C"; 
    } else if (currentCell === "C") {
      currentCell = "D"; 
    } else {
      document.getElementById("status").textContent = "Game already ended!";
      return; // stop after cell D
    }

    highlightCell(currentCell);

    if (currentCell === "D") {
      document.getElementById("status").textContent = "Game end!";
      
      // Adding points
      totalPoints += p1Payoff[3]; 
      document.getElementById("totalPoints").textContent = totalPoints; 

      showNextTrialButton();

      return; // End the game at cell D
    } else {
      document.getElementById("status").textContent = "Player 1 moved. It's Player 2's turn.";
      hideButtons();
      document.getElementById("status").textContent = "Player 2 is making their move...";
      
      // Delay the computer move between 1 and 3 seconds
      const delay = Math.floor(Math.random() * 2000) + 1000; 
    
    
      setTimeout(() => {
        // Computer move 
        const computerAction = decideComputerMove(computerDecisionQuadruplet, game.Type);
    
        if (computerAction === "stay") {
          document.getElementById("status").textContent = `Player 2 stayed. Game end at Cell ${currentCell}.`;

          // Adding points
          totalPoints += p1Payoff[1]; 
          document.getElementById("totalPoints").textContent = totalPoints;

          showNextTrialButton();

          return; // End game
        } else {
          // Computer moves to C
          currentCell = "C";
          highlightCell(currentCell);
          document.getElementById("status").textContent = "Player 2 moved. Player 1, make your move!";
          showButtons();
        }
      }, delay);
    }
  });

  updatedStayButton.addEventListener("click", () => {

    /// END TIME
    let decisiontime = new Date().getTime() - startTime;

    // red cap data to save
    if (player1Data.length < currentGameIndex + 1) {
      const game = gameData[currentGameIndex];
      const quadruplet = game.Quadruplet.split(" ").map(Number);
      
      let strategy = "trivial"; // Default for training trials
      if (game.Round === "Test") {
          if (0 === quadruplet[2]) {
              strategy = "myopic";
          } else if (0 === quadruplet[3]) {
              strategy = "predictive";
          }
      }

      player1Data.push({
          trial: game.Trial,
          first_move: "stay",
          strategy: strategy,
          decisionTime: decisiontime
      });
    }

    // User decides to stay
    document.getElementById("status").textContent = `Player 1 stayed at Cell ${currentCell}. Game end.`;

    // Adding points
    const cellIndexMap = { A: 0, B: 1, C: 2, D: 3 };
    const cellIndex = cellIndexMap[currentCell]; 
    totalPoints += p1Payoff[cellIndex];
    document.getElementById("totalPoints").textContent = totalPoints;

    showNextTrialButton();
  });
}

function highlightCell(cellId) {
  // Clear highlights
  document.querySelectorAll("#gameBoard td").forEach(cell => cell.classList.remove("highlight"));
  
  // Highlight new cell
  document.getElementById(cellId).classList.add("highlight");
}

function decideComputerMove(quadruplet, player2Type) {
  const decisionIndex = player2Type === "Myopic" ? 0 : 1; // Use the first or second move in quadruplet
  return quadruplet[decisionIndex] === 1 ? "move" : "stay";

}

function showNextTrialButton() {
  hideButtons();
  const nextButton = document.createElement("button");
  nextButton.textContent = "Next Trial";
  nextButton.id = "nextTrialButton";

  nextButton.addEventListener("click", () => {
      document.getElementById("status").textContent = ""; 
      nextButton.remove();
      currentGameIndex++;

      if (currentGameIndex < gameData.length) {
          setupGame();
      } else {
          document.getElementById("status").textContent = "All trials completed! Sending data...";
          sendToRedCap();
      }
  });

  document.body.appendChild(nextButton);
}

function hideButtons() {
  const controls = document.getElementById("controls");
  controls.style.display = "none";
}

function showButtons() {
  const controls = document.getElementById("controls");
  controls.style.display = "block";
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function saveDataLocally() {
  const dataStr = JSON.stringify(player1Data, null, 2); // Pretty-print JSON
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");

  // Generate a unique filename using timestamp
  const timestamp = Date.now();
  const filename = `player1_data_${timestamp}.json`;

  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  console.log("Local JSON file saved:", filename);
}


function sendToRedCap() {
  console.log("Saving data locally before sending to REDCap...");
  saveDataLocally(); // Save locally first



  console.log("Preparing to send responses to REDCap");
  const url = 'https://redcap.case.edu/api/';
  const timestamp = Date.now();
  const filename = `player_data.json`;
  const fileContent = JSON.stringify(player1Data);
  
  console.log("Filename:", filename);
  console.log("File Content:", fileContent);

  const file = new File([fileContent], filename, { type: "application/json" });
  const formData = new FormData();

  // NEW
  const dataDict = {
    "record_id" : timestamp
  };

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
        console.log('Creating record to REDCap. Response:', response);
    })
    .fail(function(error) {
        console.error('Failed to create record to REDCap:', error);
    });

  // OG
  formData.append('token', '2C941E2CCA757DF649E150366AD3904E');  
  formData.append('content', 'file');
  formData.append('action', 'import');
  formData.append('field', `prt_data_json`);
  formData.append("overwriteBehavior", "normal")
  formData.append('record', timestamp);
  // would be ideal to peek at existing records and create a new one --> once encrypted tho so that we can export
  formData.append('file', file);

  console.log("Form Data:", formData);

  $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      contentType: false, 
      processData: false, 
      success: function(response) {
          console.log('Data sent to REDCap. Response:', response);
      },
      error: function(error) {
          console.error('Failed to send data to REDCap:', error);
      }
  });
}


// window.mobileAndTabletCheck = function() {
//   let check = false;
//   (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
//   return check;
// };

