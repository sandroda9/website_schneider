// Basic interactions: theme toggle, lightbox, mailto form
document.addEventListener('DOMContentLoaded', function() {
  // Set current year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Theme handling
  const themeToggle = document.getElementById('themeToggle');
  const root = document.documentElement;
  const saved = localStorage.getItem('site-theme') || 'light';
  if (saved === 'dark') {
    root.setAttribute('data-theme', 'dark');
    themeToggle.textContent = '☀️';
  } else {
    root.removeAttribute('data-theme');
    themeToggle.textContent = '🌙';
  }

  themeToggle.addEventListener('click', function() {
    if (root.getAttribute('data-theme') === 'dark') {
      root.removeAttribute('data-theme');
      localStorage.setItem('site-theme', 'light');
      themeToggle.textContent = '🌙';
    } else {
      root.setAttribute('data-theme', 'dark');
      localStorage.setItem('site-theme', 'dark');
      themeToggle.textContent = '☀️';
    }
  });

  // Lightbox: swap image src from clicked gallery item
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightboxImage = document.getElementById('lightboxImage');
  galleryItems.forEach(item => {
    item.addEventListener('click', function(e){
      const src = item.getAttribute('data-src');
      lightboxImage.src = src;
    });
  });

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});

// Simple mailto form submit (no server)
function sendMail(e){
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  const subject = encodeURIComponent('Anfrage von Webseite: ' + name);
  const body = encodeURIComponent(`Name: ${name}\nE-Mail: ${email}\n\n${message}`);

  // opens default mail client
  window.location.href = `mailto:latelierhobil@hotmail.com?subject=${subject}&body=${body}`;
  return false;
}
