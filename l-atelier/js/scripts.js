document.addEventListener("DOMContentLoaded", function () {

  /* YEAR UPDATE */
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* Sticky Header Scroll Logic */
  const sticky = document.getElementById("stickyHeader");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 120) {
      sticky.classList.add("visible");
    } else {
      sticky.classList.remove("visible");
    }
  });

  /* Fade-in Services, Gallery */
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
