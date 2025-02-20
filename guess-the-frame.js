const frames = [
  { src: "./img-src/image1.png", name: "Stree 2: Sarkate Ka Aatank" },
  { src: "./img-src/image2.png", name: "Animal" },
  { src: "./img-src/image3.png", name: "Gangs of Wasseypur - Part 1" },
  { src: "./img-src/image4.png", name: "Goliyon Ki Raasleela Ram-Leela" },
  { src: "./img-src/image5.png", name: "Madgaon Express" },
  { src: "./img-src/image6.png", name: "Tamasha" },
  { src: "./img-src/image7.png", name: "The Substance" },
  { src: "./img-src/image8.png", name: "Marco" },
  { src: "./img-src/image9.png", name: "Sanam Teri Kasam" },
  { src: "./img-src/image10.png", name: "Pushpa 2: The Rule" },
  { src: "./img-src/image11.png", name: "Game Changer" },
  { src: "./img-src/image12.png", name: "Sookshmadarshini" },
  { src: "./img-src/image13.png", name: "Baby John" },
  { src: "./img-src/image14.png", name: "Lucky Baskhar" },
  { src: "./img-src/image15.png", name: "Martin/ Mortein / Fartin" },
  { src: "./img-src/image16.png", name: "Devara: Part 1" },
  { src: "./img-src/image17.png", name: "Vettaiyan" },
  { src: "./img-src/image18.png", name: "Munjya" },
  { src: "./img-src/image19.png", name: "Kalki 2898 AD" },
  { src: "./img-src/image20.png", name: "Aavesham" },
  { src: "./img-src/image21.png", name: "Bade Miyan Chote Miyan" },
  { src: "./img-src/image22.png", name: "Maidaan" },
  { src: "./img-src/image23.png", name: "Manjummel Boys" },
  { src: "./img-src/image24.png", name: "Shaitaan" },
  { src: "./img-src/image25.png", name: "Tiger 3" },
];

let currentFrameIndex = 0;

// Store preloaded images
const imageCache = {};

// Preload images on page load
function preloadImages() {
  frames.forEach((frame) => {
    const img = new Image(); // Create a new image element
    img.src = frame.src; // Set image source
    img.onload = () => {
      imageCache[frame.src] = img; // Store preloaded image in cache
    };
  });
}

// Show answer when button is clicked
function showAnswer() {
  document.getElementById("answer").classList.remove("d-none");
  document.getElementById("movie-name").textContent =
    frames[currentFrameIndex].name;
}

// Switch to next frame instantly using cached images
function nextFrame() {
  currentFrameIndex++;
  if (currentFrameIndex < frames.length) {
    const movieFrame = document.getElementById("movie-frame");

    // Use preloaded image if available
    if (imageCache[frames[currentFrameIndex].src]) {
      movieFrame.src = imageCache[frames[currentFrameIndex].src].src;
    } else {
      movieFrame.src = frames[currentFrameIndex].src; // Fallback
    }

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

// Display the final scores at the end
function showFinalScores() {
  const players = ["suraj", "yogi"];
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

// Restart the game and go back to homepage
function restartGame() {
  window.location.href = "index.html";
}

// Reset scores at the start of the game
function resetScores() {
  ["suraj", "yogi"].forEach((player) => {
    localStorage.setItem(`score-${player}`, "0");
    document.getElementById(`score-${player}`).textContent = "0";
  });
}

// Update player scores
function updateScore(player, change) {
  let score = parseInt(localStorage.getItem(`score-${player}`) || "0") + change;
  score = Math.max(0, score);
  localStorage.setItem(`score-${player}`, score);
  document.getElementById(`score-${player}`).textContent = score;
}

// Preload images and reset scores when page loads
window.onload = () => {
  preloadImages(); // Start preloading images
  resetScores(); // Reset player scores
};
