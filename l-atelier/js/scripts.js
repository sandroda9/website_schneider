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

  const showAfter = 120; // px Scroll, ab wann sichtbar

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
// Smooth Scroll für interne Links (Menü)
// ===========================
(function () {
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;

    const id = a.getAttribute("href");
    if (!id || id === "#") return;

    const el = document.querySelector(id);
    if (!el) return;

    e.preventDefault();
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  });
})();
