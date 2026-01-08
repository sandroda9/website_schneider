// ===========================
// Footer-Jahr setzen
// ===========================
(function () {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();


// ===========================
// Sticky Header ein/aus beim Scrollen
// ===========================
(function () {
  const stickyHeader = document.getElementById("stickyHeader");
  if (!stickyHeader) return;

  const showAfter = 120;

  const onScroll = () => {
    if (window.scrollY > showAfter) stickyHeader.classList.add("visible");
    else stickyHeader.classList.remove("visible");
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();


// ===========================
// Galerie-Items: in-view Animation (iOS & Safari safe)
// ===========================
(function () {
  const items = document.querySelectorAll(".gallery-item");
  if (!items.length) return;

  document.documentElement.classList.add("js");

  const safetyTimer = setTimeout(() => {
    items.forEach(el => el.classList.add("in-view"));
  }, 800);

  if (!("IntersectionObserver" in window)) {
    items.forEach(el => el.classList.add("in-view"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  items.forEach(el => io.observe(el));

  items[0].addEventListener(
    "transitionend",
    () => clearTimeout(safetyTimer),
    { once: true }
  );
})();


// ===========================
// Smooth Scroll + Offcanvas automatisch schliessen
// ===========================
(function () {
  const offcanvasEl = document.getElementById("mobileMenu");
  const bsOffcanvas = offcanvasEl ? bootstrap.Offcanvas.getOrCreateInstance(offcanvasEl) : null;

  document.addEventListener("click", (e) => {
    const a = e.target.closest('a.nav-link-scroll[href^="#"]');
    if (!a) return;

    const id = a.getAttribute("href");
    const el = document.querySelector(id);
    if (!el) return;

    e.preventDefault();

    if (bsOffcanvas) bsOffcanvas.hide();
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  });
})();


// ===========================
// Scroll-to-top Button: erscheint ab Seitenmitte
// ===========================
(function () {
  const btn = document.getElementById("toTopBtn");
  if (!btn) return;

  const onScroll = () => {
    const doc = document.documentElement;
    const scrollTop = window.scrollY || doc.scrollTop;
    const maxScroll = (doc.scrollHeight - window.innerHeight) || 1;

    // ab ca. 50% Scrollstrecke sichtbar
    const reachedMiddle = scrollTop / maxScroll >= 0.5;

    if (reachedMiddle) btn.classList.add("show");
    else btn.classList.remove("show");
  };

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();
