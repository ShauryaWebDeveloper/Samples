const menu = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");

menu?.addEventListener("click", () => {
  nav?.classList.toggle("open");
});

document.querySelectorAll(".nav-links a").forEach((a) => {
  a.addEventListener("click", () => nav?.classList.remove("open"));
});

const reviews = [...document.querySelectorAll(".review")];
const dots = [...document.querySelectorAll(".dot")];

let index = 0;

function showReview(i) {
  if (!reviews.length) return;

  index = (i + reviews.length) % reviews.length;

  reviews.forEach((review, n) => {
    review.classList.toggle("active", n === index);
  });

  dots.forEach((dot, n) => {
    dot.classList.toggle("active", n === index);
  });
}

document.querySelector(".next")?.addEventListener("click", () => {
  showReview(index + 1);
});

document.querySelector(".prev")?.addEventListener("click", () => {
  showReview(index - 1);
});

dots.forEach((dot, n) => {
  dot.addEventListener("click", () => showReview(n));
});

if (reviews.length > 1) {
  setInterval(() => showReview(index + 1), 7000);
}

const form = document.getElementById("feedbackForm");
const status = document.getElementById("formStatus");

form?.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name")?.value.trim();

  if (status) {
    status.textContent = `Thanks ${
      name || "for your feedback"
    } — we appreciate it!`;
  }

  form.reset();
});

const top = document.getElementById("toTop");

window.addEventListener("scroll", () => {
  top?.classList.toggle("show", window.scrollY > 450);
});

top?.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

document.querySelectorAll(".disabled-social").forEach((a) => {
  a.addEventListener("click", (e) => {
    e.preventDefault();
  });
});
