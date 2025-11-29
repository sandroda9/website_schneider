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

  /* NAVBAR – SMOOTH SCROLL MIT OFFSET + AUTO-CLOSE (MOBILE) */
  var navCollapse = document.getElementById("navCollapse");
  var navbar = document.querySelector(".navbar");

  // Alle Links in der Navbar, die auf Anker zeigen (inkl. Logo)
  var navLinks = document.querySelectorAll('.nav-link[href^="#"], .navbar-brand[href^="#"]');

  function handleNavClick(link, event) {
    var href = link.getAttribute("href");
    if (!href || href.charAt(0) !== "#") {
      return;
    }

    // Standard-Ankersprung verhindern – wir scrollen selbst
    if (event && event.preventDefault) {
      event.preventDefault();
    }

    var targetId = href.substring(1);
    var target = document.getElementById(targetId);
    if (!target) {
      return;
    }

    // Höhe der Navbar bestimmen
    var navbarHeight = navbar ? navbar.offsetHeight : 0;
    // auf Mobile etwas extra Luft
    var extra = window.innerWidth <= 992 ? 16 : 0;
    var offset = navbarHeight + extra;

    var rect = target.getBoundingClientRect();
    var targetPosition = rect.top + window.pageYOffset - offset;

    try {
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });
    } catch (err) {
      // Fallback für sehr alte Browser
      window.scrollTo(0, targetPosition);
    }

    // Navbar-Collapse schliessen, falls offen (mobil)
    if (navCollapse && navCollapse.classList.contains("show")) {
      var instance = bootstrap.Collapse.getInstance(navCollapse);
      if (!instance) {
        instance = new bootstrap.Collapse(navCollapse, { toggle: false });
      }
      instance.hide();
    }
  }

  for (var j = 0; j < navLinks.length; j++) {
    (function (link) {
      link.addEventListener("click", function (e) {
        handleNavClick(link, e);
      });
    })(navLinks[j]);
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
