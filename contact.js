document.getElementById("contact-form").addEventListener("submit", async function (event) {
  event.preventDefault();

  const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value,
  };

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
    alert("There was an error sending your message. Please try again.");
  }
});
