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
const textLevel = document.querySelector(".level");

const subHeadingAlt = document.querySelector(".sub-heading-alt");
let currentLevel;

const model = {
  level: "easy",
  currentRange: 50,

  setRange() {
    if (this.level === "easy") {
      this.currentRange = 50;
      this[this.level].score = 10;
    } else if (this.level === "medium") {
      this.currentRange = 75;
      this[this.level].score = 15;
    } else if (this.level === "hard") {
      this.currentRange = 100;
      this[this.level].score = 20;
    } else {
      this.currentRange = 50;
      this.easy.score = 10;
    }

    return this.currentRange;
  },
  easy: {
    score: 0,
    highScore: 0,
  },
  medium: {
    score: 0,
    highScore: 0,
  },
  hard: {
    score: 0,
    highScore: 0,
  },
};

model.setRange();
let guess = Math.floor(Math.random() * model.currentRange + 1);
textNumber.value = "";

select.addEventListener("change", function (event) {
  model.level = event.target.value ? event.target.value : "easy";
  model.setRange();
  textScore.textContent = model[model.level].score;
  textHScore.textContent = model[model.level].highScore;

  setTimeout(function () {
    select.classList.add("hidden");
    subHeadingAlt.textContent = `Difficulty: ${firstUpperCase(model.level)}`;
    textLevel.textContent = firstUpperCase(model.level);
  }, 400);
});

// Check Button
btnCheck.addEventListener("click", function () {
  if (textNumber.value === "") {
    textStart.textContent = "VALUE CANNOT BE EMPTY";
    return;
  }

  const value = Number(textNumber.value);
  textLevel.textContent = firstUpperCase(model.level);

  currentLevel = model.level;

  if (model[currentLevel].score > 1) {
    if (value > guess) {
      textStart.textContent = "HIGHER THAN GUESS VALUE";
      model[currentLevel].score -= 1;
      textScore.textContent = model[currentLevel].score;
    } else if (value < guess) {
      textStart.textContent = "LOWER THAN GUESS VALUE";
      model[currentLevel].score -= 1;
      textScore.textContent = model[currentLevel].score;
    } else if (value === guess) {
      win();
      console.log(model);
    }
  } else {
    loss();
  }
});

// function to handle user win
function win() {
  if (model[currentLevel].score > model[currentLevel].highScore) {
    model[currentLevel].highScore = model[currentLevel].score;
  }

  btnCheck.disabled = true;
  textStart.textContent = "YOU WIN !!!";
  textGuess.textContent = guess;
  // textScore.textContent = model[currentLevel].score;
  textHScore.textContent = model[currentLevel].highScore;

  document.querySelector(".main").style.backgroundColor = "#60b347";
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
}

// function to handle user loss
function loss() {
  btnCheck.disabled = true;
  textStart.textContent = "YOU LOSE !!!";
  textGuess.textContent = guess;
  textScore.textContent = 0;

  document.querySelector(".main").style.backgroundColor = "#c1121f";
  document.querySelector(".main").style.color = "#f3d0d2";
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
}

function playAgain() {
  btnCheck.disabled = false;
  textStart.textContent = "Start Guessing...";
  model.setRange();
  textScore.textContent = model[model.level].score;
  textGuess.textContent = "?";
  textNumber.textContent = "";
  guess = Math.floor(Math.random() * model.currentRange + 1);
  textNumber.value = "";

  document.querySelector(".main").style.backgroundColor = "#283618";
  document.querySelector("header").style.borderColor = "#949b8c";
  document.querySelector(".main").style.color = "#f6faee";
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

// Ensuring Player does not exceed the Required Word Bound
textNumber.addEventListener("input", function () {
  if (textNumber.value > model.currentRange || textNumber.value < 0) {
    textNumber.value = "";
  }
});

btnPlayAgain.addEventListener("click", playAgain);

// set default value for select once open
window.addEventListener("load", function () {
  select.value = "";
});
