document.addEventListener("DOMContentLoaded", function () {

  /* YEAR */
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* Sticky Header */
  const sticky = document.getElementById("stickyHeader");
  const bigTitle = document.querySelector(".big-atelier");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 120) {
      sticky.classList.add("visible");
      bigTitle.classList.add("fade-out");
    } else {
      sticky.classList.remove("visible");
      bigTitle.classList.remove("fade-out");
    }
  });

  /* In-View Animations */
  const animated = document.querySelectorAll(".service-card, .gallery-item");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    animated.forEach(el => observer.observe(el));
  }
});
