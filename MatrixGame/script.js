let gameData;
let currentGameIndex = 0; // Index to track the current game/trial

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

  // Clear the board and show transition message
  document.querySelectorAll("#gameBoard span").forEach(span => span.textContent = "");
  document.querySelectorAll("#gameBoard td").forEach(cell => cell.classList.remove("highlight"));

  // Pause execution for 0.5 seconds before proceeding
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

  // Event listeners for buttons to update cell if player moves
  updatedMoveButton.addEventListener("click", () => {
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
    // User decides to stay
    document.getElementById("status").textContent = `Player 1 stayed at Cell ${currentCell}. Game end.`;
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
    nextButton.remove(); // Remove the button
    currentGameIndex++; // Move to the next trial
    setupGame(); // Start the next trial
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