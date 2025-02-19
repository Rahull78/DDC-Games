const frames = [
  {
    src: "../img-src/kanguva.jpg",
    name: "Kanguva",
  },
  { src: "../img-src/blue_beetle.jpg", name: "Blue Beetle" },
  {
    src: "../img-src/captain_america_brave_new_world.jpg",
    name: "Captain America Brave New World",
  },
  { src: "../img-src/kalki_2898_ad.jpg", name: "Kalki 2898 AD" },
  {
    src: "../img-src/guardians_of_the_galaxy_vol_3.jpg",
    name: "Guardians of The Galaxy Vol. 3",
  },
  { src: "../img-src/dune_part_two.jpg", name: "Dune Part 2" },
  { src: "../img-src/ponniyin_selvan_2.jpg", name: "Ponniyin Selvan 2 (PS 2)" },
  {
    src: "../img-src/puss_in_boots_the_last_wish.jpg",
    name: "Puss in boots the last wish",
  },
  { src: "../img-src/thangalaan.jpg", name: "Thangalaan" },
  { src: "../img-src/the_dark_knight.jpg", name: "The Dark Knight" },
];

let currentFrameIndex = 0;

function showAnswer() {
  document.getElementById("answer").classList.remove("d-none");
  document.getElementById("movie-name").textContent =
    frames[currentFrameIndex].name;
}

function nextFrame() {
  currentFrameIndex++;
  if (currentFrameIndex < frames.length) {
    document.getElementById("movie-frame").src = frames[currentFrameIndex].src;
    document.getElementById("answer").classList.add("d-none");
    if (currentFrameIndex === frames.length - 1) {
      document.getElementById("next-frame-btn").textContent = "View Score";
    }
  } else {
    document.getElementById("game-container").classList.add("d-none");
    document.querySelector(".position-fixed").classList.add("d-none");
    showFinalScores();
  }
}

function showFinalScores() {
  const players = ["abhi", "suraj", "yogi"];
  const scoreTableBody = document.getElementById("score-table-body");
  scoreTableBody.innerHTML = "";

  // Fetch scores and store them as objects
  let scores = players.map((player) => ({
    name: player.charAt(0).toUpperCase() + player.slice(1),
    score: parseInt(localStorage.getItem(`score-${player}`) || "0"),
  }));

  // Sort scores in descending order
  scores.sort((a, b) => b.score - a.score);

  // Display sorted scores in table
  scores.forEach((player) => {
    scoreTableBody.innerHTML += `<tr><td>${player.name}</td><td>${player.score}</td></tr>`;
  });

  document.getElementById("final-scoreboard").classList.remove("d-none");
}

function restartGame() {
  window.location.href = "index.html";
}

function resetScores() {
  ["abhi", "suraj", "yogi"].forEach((player) => {
    localStorage.setItem(`score-${player}`, "0");
    document.getElementById(`score-${player}`).textContent = "0";
  });
}

function updateScore(player, change) {
  let score = parseInt(localStorage.getItem(`score-${player}`) || "0") + change;
  score = Math.max(0, score);
  localStorage.setItem(`score-${player}`, score);
  document.getElementById(`score-${player}`).textContent = score;
}

window.onload = resetScores;
