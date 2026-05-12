/* ── TypeIt — hero animated subtitle ───────────────────────────── */
new TypeIt(".animated1", {
  lifeLike: true,
  speed: 65,
  loop: true,
})
  .type("Desenvolvo em HTML5, CSS3, JS")
  .pause(700)
  .type(" e Node.js.")
  .pause(2000)
  .delete()
  .pause(400)
  .type("Transformo ideias em interfaces.")
  .pause(2200)
  .delete()
  .pause(400)
  .type("Aprendendo e construindo sempre.")
  .pause(2000)
  .delete()
  .pause(400)
  .go();


/* ── Scroll reveal ───────────────────────────────────────────────── */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));


/* ── Skill bar animation (triggers when section enters view) ────── */
const barObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target
          .querySelectorAll(".skill-bar-fill")
          .forEach((bar) => {
            bar.style.width = bar.dataset.width;
          });
        barObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);
const skillsGrid = document.querySelector(".skills-grid");
if (skillsGrid) barObserver.observe(skillsGrid);


/* ── Nav shrinks on scroll ───────────────────────────────────────── */
const nav = document.getElementById("nav");
window.addEventListener("scroll", () => {
  if (window.scrollY > 60) {
    nav.style.padding = "12px 56px";
    nav.style.background = "rgba(7,8,15,0.97)";
  } else {
    nav.style.padding = "20px 56px";
    nav.style.background = "rgba(7,8,15,0.80)";
  }
});


/* ── Hamburger menu ──────────────────────────────────────────────── */
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll("a") : [];

function openMenu() {
  hamburger.classList.add("open");
  mobileMenu.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeMenu() {
  hamburger.classList.remove("open");
  mobileMenu.classList.remove("open");
  document.body.style.overflow = "";
}

if (hamburger && mobileMenu) {
  hamburger.addEventListener("click", () => {
    if (hamburger.classList.contains("open")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Fechar ao clicar em qualquer link do menu mobile
  mobileLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Fechar ao apertar ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
}

/* ── Nav scroll padding reset em mobile ─────────────────────────── */
window.addEventListener("scroll", () => {
  if (window.innerWidth <= 768) {
    nav.style.padding = "";
  }
});
