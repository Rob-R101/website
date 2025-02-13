document.addEventListener("DOMContentLoaded", function () {
  const darkModeToggle = document.getElementById("dark-mode-toggle");

  // Check localStorage for dark mode setting
  if (localStorage.getItem("dark-mode") === "enabled") {
    document.body.classList.add("bg-dark", "text-light");
  }

  darkModeToggle.addEventListener("click", function () {
    document.body.classList.toggle("bg-dark");
    document.body.classList.toggle("text-light");

    if (document.body.classList.contains("bg-dark")) {
      localStorage.setItem("dark-mode", "enabled");
    } else {
      localStorage.setItem("dark-mode", "disabled");
    }
  });
});
