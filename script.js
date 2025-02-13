// Load Navbar & Footer
document.addEventListener("DOMContentLoaded", function () {
  // Load Navbar
  fetch("navbar.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById("navbar-container").innerHTML = data;
    });

  // Load Footer
  fetch("footer.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById("footer-container").innerHTML = data;
    });

  // Dark Mode Toggle
  setTimeout(() => {
    const darkModeToggle = document.getElementById("dark-mode-toggle");

    if (localStorage.getItem("dark-mode") === "enabled") {
      document.body.classList.add("dark-mode");
    }

    // Ensure dark mode toggle button exists before adding event listener
    if (darkModeToggle) {
      darkModeToggle.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
          localStorage.setItem("dark-mode", "enabled");
        } else {
          localStorage.setItem("dark-mode", "disabled");
        }
      });
    }
  }, 500);
});
