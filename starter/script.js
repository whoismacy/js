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

// we use bind, to add event listeners to addEventListener()

button.addEventListener("click", function () {
  section1.scrollIntoView({ behavior: "smooth" });
});

// first, add event listener to common parent element
// then, determine which element originated the event
document.querySelector(".nav__links").addEventListener("click", function (e) {
  if (
    e.target.classList.contains("nav__link") &&
    !e.target.classList.contains("nav__link--btn")
  ) {
    e.preventDefault();
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

//implementing sticky navigation using, Intersection Observer API'

// threshold 0, triggers when any part of the element enters the viewport / moves completely out of view.
// rootMargin -90px, means start observing 90px before the header actually intersects with the viewport.
// rootMargin 90px, would mean start observing 90px after the header actually intersects with the viewport.

const header = document.querySelector(".header");
const nav = document.querySelector(".nav");
const navHeight = nav.getBoundingClientRect().height;

const obsOptions = {
  root: null,
  threshold: [0],
  rootMargin: `-${navHeight}px`,
};

const obsCallback = function (entry) {
  const [ent] = entry;

  if (!ent.isIntersecting) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
};

const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(header);
