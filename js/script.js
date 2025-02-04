document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Here you would typically send the login data to your server
    console.log("Login attempt:", { email, password });

    // For demonstration purposes, we'll just log a message
    alert("Login functionality would be implemented here.");
  });
});
