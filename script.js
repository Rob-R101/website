// Load Navbar and Footer with JavaScript
document.addEventListener("DOMContentLoaded", function() {
  // Load Navbar
  fetch('navbar.html')
      .then(response => response.text())
      .then(data => {
          document.getElementById('navbar-container').innerHTML = data;

          // Activate the toggle for mobile view
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
