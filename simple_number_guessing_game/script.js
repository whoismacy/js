"use strict";

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const select = document.querySelector("#select");

const btnPlay = document.querySelector(".btn--play");
const btnCheck = document.querySelector(".btn--check");
const btnExitModal = document.querySelector(".exit-modal");
const btnPlayAgain = document.querySelector(".btn--again");

const textStart = document.querySelector(".start-guess-p");
const textScore = document.querySelector(".score");
const textHScore = document.querySelector(".highscore");
const textGuess = document.querySelector(".guess-value");
const textNumber = document.querySelector(".number");

let guess = Math.floor(Math.random() * 50 + 1);
let currentScore = 10;
let highScore;
let level;
textNumber.value = "";

function adjustToDifficulty() {
  if (level === "easy") {
    currentScore = 25;
    high;
  }
}
// function to handle user win
function win() {
  textStart.textContent = "YOU WIN !!!";
  textGuess.textContent = guess;
  textScore.textContent = currentScore;
  textHScore.textContent = currentScore;

  document.querySelector("body").style.backgroundColor = "#60b347";
  document.querySelector("header").style.borderColor = "#bfe1b5";
  document.querySelector(".btn").style.backgroundColor = "#dff0da";
  document.querySelector(".btn").style.color = "#437d32";
  document.querySelector(".floating-q").style.backgroundColor = "#dff0da";
  document.querySelector(".again").style.backgroundColor = "#dff0da";
  document.querySelector(".again").style.color = "#437d32";
  document.querySelector(".check").style.backgroundColor = "#dff0da";
  document.querySelector(".check").style.color = "#437d32";
  textGuess.style.color = "#60b347";
  textNumber.value = "";
  return;
}

// function to handle user loss
function loss() {
  textStart.textContent = "YOU LOSE !!!";
  textGuess.textContent = guess;
  textScore.textContent = 0;

  document.querySelector("body").style.backgroundColor = "#c1121f";
  document.querySelector("body").style.color = "#f3d0d2";
  document.querySelector("header").style.borderColor = "#f3d0d2";
  document.querySelector(".btn").style.color = "#c1121f";
  document.querySelector(".btn").style.backgroundColor = "#f3d0d2";
  document.querySelector(".floating-q").style.backgroundColor = "#e0898f";
  document.querySelector(".again").style.color = "#c1121f";
  document.querySelector(".again").style.backgroundColor = "#f3d0d2";
  document.querySelector(".check").style.color = "#c1121f";
  document.querySelector(".check").style.backgroundColor = "#f3d0d2";
  textGuess.style.color = "#f3d0d2";
  textNumber.style.borderColor = "#f3d0d2";
  textNumber.value = "";
  return;
}

function playAgain() {
  textStart.textContent = "Start Guessing...";
  textScore.textContent = 10;
  textGuess.textContent = "?";
  textNumber.textContent = "";
  guess = Math.floor(Math.random() * 50 + 1);
  currentScore = 10;
  textNumber.value = "";

  document.querySelector("body").style.backgroundColor = "#283618";
  document.querySelector("header").style.borderColor = "#949b8c";
  document.querySelector("body").style.color = "#f6faee";
  document.querySelector(".btn").style.color = "#54652c";
  document.querySelector(".btn").style.backgroundColor = "#e5efcd";
  document.querySelector(".floating-q").style.backgroundColor = "#e5efcd";
  document.querySelector(".again").style.color = "#54652c";
  document.querySelector(".again").style.backgroundColor = "#e5efcd";
  document.querySelector(".check").style.color = "#54652c";
  document.querySelector(".check").style.backgroundColor = "#e5efcd";
  textGuess.style.color = "#54652c";
  textNumber.style.borderColor = "#f6faee";
}

function firstUpperCase(string) {
  const fVal = string[0];
  const rest = string.slice(1);
  return fVal.toUpperCase() + rest;
}

// Handling the Opening and Closing of the Modal
// OPENING
btnPlay.addEventListener("click", function () {
  modal.classList.toggle("hidden");
  overlay.classList.toggle("hidden");
});

// CLOSING
btnExitModal.addEventListener("click", function () {
  modal.classList.toggle("hidden");
  overlay.classList.toggle("hidden");
});

window.addEventListener("keydown", function (event) {
  const { key } = event;

  if (
    !modal.classList.contains("hidden") &&
    !overlay.classList.contains("hidden")
  ) {
    if (key === "Escape") {
      modal.classList.add("hidden");
      overlay.classList.add("hidden");
    }
  }
});

overlay.addEventListener("click", function () {
  if (
    !modal.classList.contains(".hidden") &&
    !overlay.classList.contains("hidden")
  ) {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
  }
});

textNumber.addEventListener("input", function () {
  if (textNumber.value > 50 || textNumber.value < 0) {
    textNumber.value = "";
  }
});

btnCheck.addEventListener("click", function () {
  if (textNumber.value === "") {
    textStart.textContent = "VALUE CANNOT BE EMPTY";
    return;
  }

  const value = Number(textNumber.value);

  if (currentScore > 1) {
    if (value > 0) {
      if (value > guess) {
        textStart.textContent = "HIGHER THAN GUESS VALUE";
        currentScore -= 1;
        textScore.textContent = currentScore;
      } else if (value < guess) {
        textStart.textContent = "LOWER THAN GUESS VALUE";
        currentScore -= 1;
        textScore.textContent = currentScore;
      } else if (value === guess) {
        win();
      }
    }
  } else {
    loss();
  }
});

btnPlayAgain.addEventListener("click", playAgain);

select.addEventListener("change", function (event) {
  level = event.target.value;
  console.log(event.target.value);
  setTimeout(function () {
    select.classList.add("hidden");
    document.querySelector(
      ".sub-heading-alt"
    ).textContent = `Difficulty: ${firstUpperCase(level)}`;
  }, 400);
});
