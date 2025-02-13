// Load Navbar First
document.addEventListener("DOMContentLoaded", function () {
  fetch("navbar.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById("navbar-container").innerHTML = data;

      // After loading navbar, initialize dark mode toggle
      initializeDarkMode();
    })
    .catch(error => console.error("Error loading navbar:", error));
});

// Dark Mode Function
function initializeDarkMode() {
  const darkModeToggle = document.getElementById("dark-mode-toggle");

  // If dark mode was enabled before, apply it
  if (localStorage.getItem("dark-mode") === "enabled") {
    document.body.classList.add("dark-mode");
  }

  // Add event listener if the button exists
  if (darkModeToggle) {
    darkModeToggle.addEventListener("click", function () {
      document.body.classList.toggle("dark-mode");

      // Store dark mode preference
      if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("dark-mode", "enabled");
      } else {
        localStorage.setItem("dark-mode", "disabled");
      }
    });
  }
}
