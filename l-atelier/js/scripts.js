document.addEventListener("DOMContentLoaded", function () {

  /* YEAR AUTO */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* Scroll Sticky Header */
  const sticky = document.getElementById("stickyHeader");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 120) {
      sticky.classList.add("visible");
    } else {
      sticky.classList.remove("visible");
    }
  });

  /* Fade-In Animation */
  var animatedElements = document.querySelectorAll(".service-card, .gallery-item");

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    animatedElements.forEach(el => observer.observe(el));
  } 
});
