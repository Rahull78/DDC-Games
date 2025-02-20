const dialogues = [
  { text: `"I'll be back!"`, name: "The Terminator" },
  { text: `"May the Force be with you."`, name: "Star Wars" },
  { text: `"Why so serious?"`, name: "The Dark Knight" },
  { text: `"Hasta la vista, baby."`, name: "Terminator 2: Judgment Day" },
  { text: `"I see dead people."`, name: "The Sixth Sense" },
];

let currentDialogueIndex = 0;

// Updated Players List (Removed "abhi")
const players = ["suraj", "yogi"];

// Set game type
const gameType = "guess-dialogue";
localStorage.setItem("currentGame", gameType);

function showAnswer() {
  document.getElementById("answer").classList.remove("d-none");
  document.getElementById("movie-name").textContent =
    dialogues[currentDialogueIndex].name;
}

function nextDialogue() {
  currentDialogueIndex++;
  if (currentDialogueIndex < dialogues.length) {
    document.getElementById("dialogue-box").textContent =
      dialogues[currentDialogueIndex].text;
    document.getElementById("answer").classList.add("d-none");

    if (currentDialogueIndex === dialogues.length - 1) {
      document.getElementById("next-dialogue-btn").textContent = "View Score";
    }
  } else {
    document.getElementById("game-container").style.display = "none";
    document.querySelector(".position-fixed").style.display = "none";
    showFinalScores();
  }
}

// **Initialize Scores & Reset to Zero**
function initializeScores() {
  players.forEach((player) => {
    let key = `score-${gameType}-${player}`;

    // Always reset score to zero when the game starts
    localStorage.setItem(key, "0");

    document.getElementById(`score-${player}`).textContent = "0";
  });
}

// **Update Score Function**
function updateScore(player, change) {
  let key = `score-${gameType}-${player}`;
  let score = parseInt(localStorage.getItem(key)) || 0;
  score = Math.max(0, score + change);
  localStorage.setItem(key, score);
  document.getElementById(`score-${player}`).textContent = score;
}

// **Show Final Scores**
function showFinalScores() {
  const scoreTableBody = document.getElementById("score-table-body");
  scoreTableBody.innerHTML = "";

  players
    .map((player) => ({
      name: player,
      score: parseInt(localStorage.getItem(`score-${gameType}-${player}`)) || 0,
    }))
    .sort((a, b) => b.score - a.score)
    .forEach((player) => {
      scoreTableBody.innerHTML += `<tr><td>${
        player.name.charAt(0).toUpperCase() + player.name.slice(1)
      }</td><td>${player.score}</td></tr>`;
    });

  document.getElementById("final-scoreboard").classList.remove("d-none");
}

// **Restart Game (Reset Scores & Go to Homepage)**
function goToHomepage() {
  players.forEach((player) =>
    localStorage.setItem(`score-${gameType}-${player}`, "0")
  );
  window.location.href = "index.html";
}

// **Reset scores when this game starts**
window.onload = () => {
  initializeScores();
};
