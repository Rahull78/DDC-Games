const dialogues = [
  { text: `"I'll be back!"`, name: "The Terminator" },
  { text: `"May the Force be with you."`, name: "Star Wars" },
  { text: `"Why so serious?"`, name: "The Dark Knight" },
  { text: `"Hasta la vista, baby."`, name: "Terminator 2: Judgment Day" },
  { text: `"I see dead people."`, name: "The Sixth Sense" },
];

let currentDialogueIndex = 0;

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

// Players
const players = ["abhi", "suraj", "yogi"];

// Initialize Scores in Local Storage
function initializeScores() {
  players.forEach((player) => {
    if (localStorage.getItem(`score-${player}`) === null) {
      localStorage.setItem(`score-${player}`, "0");
    }
    document.getElementById(`score-${player}`).textContent =
      localStorage.getItem(`score-${player}`);
  });
}

// Update Score Function
function updateScore(player, change) {
  let score = parseInt(localStorage.getItem(`score-${player}`)) || 0;
  score = Math.max(0, score + change);
  localStorage.setItem(`score-${player}`, score);
  document.getElementById(`score-${player}`).textContent = score;
}

// Show Final Scores
function showFinalScores() {
  const scoreTableBody = document.getElementById("score-table-body");
  scoreTableBody.innerHTML = "";

  players
    .map((player) => ({
      name: player,
      score: parseInt(localStorage.getItem(`score-${player}`) || "0"),
    }))
    .sort((a, b) => b.score - a.score)
    .forEach((player) => {
      scoreTableBody.innerHTML += `<tr><td>${
        player.name.charAt(0).toUpperCase() + player.name.slice(1)
      }</td><td>${player.score}</td></tr>`;
    });

  document.getElementById("final-scoreboard").classList.remove("d-none");
}

// Restart Game
function goToHomepage() {
  players.forEach((player) => localStorage.setItem(`score-${player}`, "0"));
  window.location.href = "index.html";
}

// Run initialization when the page loads
window.onload = initializeScores;
