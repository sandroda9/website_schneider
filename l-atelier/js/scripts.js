// Footer-Jahr setzen
(function () {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();

// Sticky Header ein/aus beim Scrollen
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

// Galerie-Items: in-view Animation (IntersectionObserver)
(function () {
  const items = document.querySelectorAll(".gallery-item");
  if (!items.length) return;

  if (!("IntersectionObserver" in window)) {
    // Fallback: direkt anzeigen
    items.forEach((el) => el.classList.add("in-view"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  items.forEach((el) => io.observe(el));
})();
