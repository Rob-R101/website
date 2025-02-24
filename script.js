// Load Navbar and Footer with JavaScript
document.addEventListener("DOMContentLoaded", function() {
  // Load Navbar
  fetch('navbar.html')
      .then(response => response.text())
      .then(data => {
          document.getElementById('navbar-container').innerHTML = data;

          // Now that the navbar is loaded, activate the toggle for mobile view
          const navbarToggle = document.querySelector('.navbar-toggle');
          const navbarLinks = document.querySelector('.navbar-links');

          if (navbarToggle && navbarLinks) {
              navbarToggle.addEventListener('click', () => {
                  navbarLinks.classList.toggle('active');
              });
          }
      });

  // Load Footer
  fetch('footer.html')
      .then(response => response.text())
      .then(data => {
          document.getElementById('footer-container').innerHTML = data;
      });
});

// Smooth Scrolling (Only once, applied to all anchor links)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
      });
  });
});
