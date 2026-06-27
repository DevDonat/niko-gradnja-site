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

const revealElements = document.querySelectorAll(
  ".service-card, .why-card, .stat, .gallery-grid img, .services-page .service-row, .project-category, .team-card, .contact, .footer"
);

revealElements.forEach((element, index) => {
  element.classList.add("reveal-target");
  element.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 0.08}s`);
});

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -70px 0px"
    }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}
