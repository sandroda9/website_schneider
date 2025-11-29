// ===============================
// L' Atelier – Main Script File
// ===============================
document.addEventListener("DOMContentLoaded", function () {

  /* YEAR AUTO-UPDATE */
  var year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  /* LIGHTBOX IMAGE VIEWER */
  var galleryItems = document.querySelectorAll(".gallery-item");
  var lightboxImage = document.getElementById("lightboxImage");

  for (var i = 0; i < galleryItems.length; i++) {
    (function (item) {
      item.addEventListener("click", function () {
        var src = item.getAttribute("data-src");
        if (lightboxImage && src) {
          lightboxImage.src = src;
        }
      });
    })(galleryItems[i]);
  }

  /* NAVBAR – Mobile-Collapse schliessen, Scroll übernimmt der Browser */
  var navCollapse = document.getElementById("navCollapse");
  var toggler = document.querySelector(".navbar-toggler");

  if (navCollapse) {
    var navLinks = navCollapse.querySelectorAll(".nav-link[href^='#'], .navbar-brand[href^='#']");

    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        // Nur im mobilen Zustand schliessen
        if (toggler && window.getComputedStyle(toggler).display !== "none") {
          if (typeof bootstrap !== "undefined") {
            var instance = bootstrap.Collapse.getInstance(navCollapse);
            if (!instance) {
              instance = new bootstrap.Collapse(navCollapse, { toggle: false });
            }
            instance.hide();
          }
        }
        // kein preventDefault → Browser scrollt ganz normal zum Anker
      });
    });
  }

  /* SCROLL-EFFEKTE (Services & Galerie) */
  var animatedElements = document.querySelectorAll(".service-card, .gallery-item");

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries, obs) {
      for (var k = 0; k < entries.length; k++) {
        var entry = entries[k];
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          obs.unobserve(entry.target);
        }
      }
    }, { threshold: 0.2 });

    for (var l = 0; l < animatedElements.length; l++) {
      observer.observe(animatedElements[l]);
    }
  } else {
    for (var m = 0; m < animatedElements.length; m++) {
      animatedElements[m].classList.add("in-view");
    }
  }
});

/* MAILTO FORM HANDLER */
function sendMail(e) {
  if (e && e.preventDefault) {
    e.preventDefault();
  }

  var nameField = document.getElementById("name");
  var emailField = document.getElementById("email");
  var messageField = document.getElementById("message");

  var name = nameField ? nameField.value.trim() : "";
  var email = emailField ? emailField.value.trim() : "";
  var message = messageField ? messageField.value.trim() : "";

  if (!name || !email || !message) return false;

  var subject = encodeURIComponent("Anfrage von " + name);
  var body = encodeURIComponent(
    message + "\n\nVon: " + name + "\nE-Mail: " + email
  );

  window.location.href =
    "mailto:latelierhobil@hotmail.com?subject=" + subject + "&body=" + body;

  return false;
}
