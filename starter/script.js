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

// we use bind, to add parameters to addEventListener()
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

// when we specify root as null, it means the viewport is the root element.
// threshold 0, triggers when any part of the element enters the viewport / moves completely out of view.
// rootMargin -90px, means start observing 90px before the header actually leaves the viewport.
// rootMargin 90px, would mean start observing 90px after the header actually leaves the viewport.

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

// lazy loading images and revealing elements on scroll

// lazy load
// we lazy load using intersection observer api
const imgs = document.querySelectorAll("img[data-src]");

function loadImg(entries, observer) {

  const [entry] = entries;
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  })
  observer.unobserve(entry.target);
}

const lazyImgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
});

imgs.forEach((img) => lazyImgObserver.observe(img));

// revealing elements on scroll
const sections = document.querySelectorAll(".section");

function sectionDisplay(entries, observer) {

  entries.forEach(function (entry) {

    if (!entry.isIntersecting) return;
    
    entry.target.classList.remove("section--hidden");
    observer.unobserve(entry.target);
  });
}

const sectionsObserver = new IntersectionObserver(sectionDisplay, {
  root: null,
  threshold: 0.15,
})

sections.forEach(function (sect) {
  sect.classList.add("section--hidden");
  sectionsObserver.observe(sect);
})

// Building a slider component
