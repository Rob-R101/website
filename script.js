// Load Navbar & Footer
document.addEventListener("DOMContentLoaded", function () {

  // Load Footer
  const footerContainer = document.getElementById("footer-container");

  if (footerContainer) {
    console.log("Footer container found!");

    fetch("footer.html")
      .then(response => response.text())
      .then(data => {
        console.log("Inserting footer...");
        footerContainer.innerHTML = data;
      })
      .catch(error => console.error("Error loading footer:", error));
  } else {
    console.error("Error: #footer-container not found in HTML.");
  }
  // Load Navbar
  fetch("navbar.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById("navbar-container").innerHTML = data;
    })
    .catch(error => console.error("Error loading navbar:", error));

  // Dark Mode Toggle
  setTimeout(() => {
    const darkModeToggle = document.getElementById("dark-mode-toggle");

    if (localStorage.getItem("dark-mode") === "enabled") {
      document.body.classList.add("dark-mode");
    }

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
