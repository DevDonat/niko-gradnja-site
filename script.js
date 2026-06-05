const navbar = document.querySelector(".navbar");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelectorAll(".nav-links a");

const preloader = document.querySelector(".site-preloader");

if (preloader) {
  const hidePreloader = () => {
    setTimeout(() => {
      preloader.classList.add("preloader-hidden");
      preloader.addEventListener("transitionend", () => preloader.remove(), { once: true });
    }, 1100);
  };

  if (document.readyState === "complete") {
    hidePreloader();
  } else {
    window.addEventListener("load", hidePreloader);
  }
}

menuToggle.addEventListener("click", () => {
  const isOpen = navbar.classList.toggle("nav-open");
  menuToggle.setAttribute("aria-expanded", isOpen);
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navbar.classList.remove("nav-open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const heroVideo = document.querySelector(".hero-video[data-start]");

if (heroVideo) {
  const startTime = Number(heroVideo.dataset.start);

  heroVideo.addEventListener("loadedmetadata", () => {
    heroVideo.currentTime = startTime;
  });

  heroVideo.addEventListener("timeupdate", () => {
    if (heroVideo.currentTime < startTime && !heroVideo.paused) {
      heroVideo.currentTime = startTime;
    }
  });
}
