document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", async function (event) {
      event.preventDefault(); // Prevent form default submission

      const formData = {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        subject: document.getElementById("subject").value.trim(),
        message: document.getElementById("message").value.trim(),
      };

      if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        alert("Please fill in all fields before submitting.");
        return;
      }

      try {
        const response = await fetch("/.netlify/functions/send_email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const result = await response.text();
        alert(result); // Show success or error message
      } catch (error) {
        console.error("Error sending message:", error);
        alert("There was an error sending your message. Please try again later.");
      }
    });
  } else {
    console.error("Contact form not found.");
  }
});
