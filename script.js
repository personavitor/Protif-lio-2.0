/* ═══════════════════════════════════════════════════════════
   script.js — Vitor Henrique Portfolio
   Melhorias de UX/Design aplicadas 2025
   ═══════════════════════════════════════════════════════════ */

/* ── TypeIt — hero animated subtitle ───────────────────────── */
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


/* ── Scroll reveal — IntersectionObserver ───────────────────── */
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


/* ── Skill bar animation (triggers when section enters view) ── */
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


/* ── Nav — shrink on scroll + mobile padding reset ──────────── */
const nav = document.getElementById("nav");

function updateNav() {
  const scrolled = window.scrollY > 60;
  if (window.innerWidth > 768) {
    nav.style.padding = scrolled ? "12px 56px" : "20px 56px";
    nav.style.background = scrolled
      ? "rgba(7,8,15,0.97)"
      : "rgba(7,8,15,0.80)";
  } else {
    nav.style.padding = "";
    nav.style.background = "";
  }
}
window.addEventListener("scroll", updateNav, { passive: true });
window.addEventListener("resize", updateNav, { passive: true });
updateNav();


/* ── Hamburger menu ─────────────────────────────────────────── */
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll("a") : [];

function openMenu() {
  hamburger.classList.add("open");
  mobileMenu.classList.add("open");
  hamburger.setAttribute("aria-expanded", "true");  // ← acessibilidade
  document.body.style.overflow = "hidden";
}

function closeMenu() {
  hamburger.classList.remove("open");
  mobileMenu.classList.remove("open");
  hamburger.setAttribute("aria-expanded", "false"); // ← acessibilidade
  document.body.style.overflow = "";
}

if (hamburger && mobileMenu) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.contains("open") ? closeMenu() : openMenu();
  });

  mobileLinks.forEach((link) => link.addEventListener("click", closeMenu));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  // Fechar ao clicar fora do menu (tap no overlay)
  mobileMenu.addEventListener("click", (e) => {
    if (e.target === mobileMenu) closeMenu();
  });
}


/* ── Active nav link ao fazer scroll (highlight da seção atual) */
const sections = document.querySelectorAll("section[id], div[id]");
const navAnchors = document.querySelectorAll(".nav-links a");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navAnchors.forEach((a) => {
          a.classList.toggle(
            "nav-active",
            a.getAttribute("href") === `#${id}`
          );
        });
      }
    });
  },
  { threshold: 0.4, rootMargin: "-10% 0px -50% 0px" }
);
sections.forEach((sec) => sectionObserver.observe(sec));


/* ── Scroll-hint desaparece após o primeiro scroll ─────────── */
const scrollHint = document.querySelector(".scroll-hint");
if (scrollHint) {
  const hideHint = () => {
    if (window.scrollY > 60) {
      scrollHint.classList.add("hidden");
      window.removeEventListener("scroll", hideHint);
    }
  };
  window.addEventListener("scroll", hideHint, { passive: true });
}


/* ── Footer — ano dinâmico ─────────────────────────────────── */
const yearEl = document.getElementById("footer-year");
if (yearEl) yearEl.textContent = new Date().getFullYear();


/* ── Carrossel mobile — dots sincronizados com scroll ──────── */
(function () {
  function initCarousel(scrollEl, dotsEl) {
    if (!scrollEl || !dotsEl) return;

    const dots  = Array.from(dotsEl.querySelectorAll("span"));
    const items = Array.from(scrollEl.children);

    function getActiveIndex() {
      const center = scrollEl.scrollLeft + scrollEl.offsetWidth / 2;
      let closest = 0;
      let minDist  = Infinity;
      items.forEach((item, i) => {
        const itemCenter = item.offsetLeft + item.offsetWidth / 2;
        const dist = Math.abs(center - itemCenter);
        if (dist < minDist) { minDist = dist; closest = i; }
      });
      return closest;
    }

    function updateDots() {
      const active = getActiveIndex();
      dots.forEach((dot, i) =>
        dot.classList.toggle("active", i === active)
      );
    }

    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => {
        if (!items[i]) return;
        items[i].scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      });
    });

    scrollEl.addEventListener("scroll", updateDots, { passive: true });
    updateDots();
  }

  function setup() {
    if (window.innerWidth <= 768) {
      initCarousel(
        document.querySelector(".skills-grid"),
        document.getElementById("skillsDots")
      );
      initCarousel(
        document.querySelector(".bento"),
        document.getElementById("bentoDots")
      );
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setup);
  } else {
    setup();
  }
})();
