document.addEventListener("DOMContentLoaded", function () {

  /* YEAR AUTO-UPDATE */
  var year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  /* LIGHTBOX */
  var galleryItems = document.querySelectorAll(".gallery-item");
  var lightboxImage = document.getElementById("lightboxImage");

  galleryItems.forEach(function (item) {
    item.addEventListener("click", function () {
      var src = item.getAttribute("data-src");
      if (lightboxImage && src) {
        lightboxImage.src = src;
      }
    });
  });

  /* NAVBAR Mobile Auto-Close */
  var navCollapse = document.getElementById("navCollapse");
  var toggler = document.querySelector(".navbar-toggler");

  if (navCollapse) {
    var navLinks = navCollapse.querySelectorAll(".nav-link[href^='#'], .navbar-brand[href^='#']");

    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        if (toggler && window.getComputedStyle(toggler).display !== "none") {
          if (typeof bootstrap !== "undefined") {
            var instance = bootstrap.Collapse.getInstance(navCollapse);
            if (!instance) {
              instance = new bootstrap.Collapse(navCollapse, { toggle: false });
            }
            instance.hide();
          }
        }
      });
    });
  }

  /* SCROLL-EFFEKTE */
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

    animatedElements.forEach(function (el) {
      observer.observe(el);
    });

  } else {
    animatedElements.forEach(function (el) {
      el.classList.add("in-view");
    });
  }
});

/* MAILTO FORM HANDLER */
function sendMail(e) {
  e.preventDefault();

  var name = document.getElementById("name").value.trim();
  var email = document.getElementById("email").value.trim();
  var message = document.getElementById("message").value.trim();

  if (!name || !email || !message) return false;

  var subject = encodeURIComponent("Anfrage von " + name);
  var body = encodeURIComponent(
    message + "\n\nVon: " + name + "\nE-Mail: " + email
  );

  window.location.href =
    "mailto:latelierhobil@hotmail.com?subject=" + subject + "&body=" + body;

  return false;
}
