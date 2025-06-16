"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener("click", openModal);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// implementing smooth scrolling
const button = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

function scrollView(param1, param2) {
  this.scrollIntoView({ behavior: "smooth" });
  console.log(param1, param2);
}

button.addEventListener("click", function () {
  // const coords = section1.getBoundingClientRect();
  // console.log(window.pageXOffset, window.pageYOffset);
  // console.log(coords);
  // window.scrollTo({
  //   left: window.pageXOffset + coords.left,
  //   top: window.pageYOffset + coords.top,
  // });
  section1.scrollIntoView({ behavior: "smooth" });
});
