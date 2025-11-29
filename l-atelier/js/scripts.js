// ===============================
// L' Atelier – Main Script File
// ===============================

document.addEventListener("DOMContentLoaded", function () {

  /* -------------------------
     YEAR AUTO-UPDATE
  ------------------------- */
  const year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  /* -------------------------
     LIGHTBOX IMAGE VIEWER
  ------------------------- */
  const galleryItems = document.querySelectorAll(".gallery-item");
  const lightboxImage = document.getElementById("lightboxImage");

  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      const src = item.getAttribute("data-src");
      if (lightboxImage && src) {
        lightboxImage.src = src;
      }
    });
  });

  /* -------------------------
     SMOOTH SCROLLING
  ------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  /* -------------------------
     NAVBAR AUTO-CLOSE (Mobile)
  ------------------------- */
  const navCollapse = document.getElementById("navCollapse");

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      if (navCollapse && navCollapse.classList.contains("show")) {
        bootstrap.Collapse.getInstance(navCollapse).hide();
      }
    });
  });

  /* -------------------------
     SCROLL-EFFEKTE (Services & Galerie)
  ------------------------- */
  const animatedElements = document.querySelectorAll(".service-card, .gallery-item");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
      }
    );

    animatedElements.forEach((el) => observer.observe(el));
  } else {
    // Fallback: falls kein IntersectionObserver, alles direkt sichtbar
    animatedElements.forEach((el) => el.classList.add("in-view"));
  }
});

/* -------------------------
   MAILTO FORM HANDLER
------------------------- */
function sendMail(e) {
  e.preventDefault();

  const name = document.getElementById("name")?.value.trim();
  const email = document.getElementById("email")?.value.trim();
  const message = document.getElementById("message")?.value.trim();

  if (!name || !email || !message) return false;

  const subject = encodeURIComponent("Anfrage von " + name);
  const body = encodeURIComponent(`${message}\n\nVon: ${name}\nE-Mail: ${email}`);

  window.location.href = `mailto:latelierhobil@hotmail.com?subject=${subject}&body=${body}`;
  return false;
}
