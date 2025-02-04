document.addEventListener("DOMContentLoaded", () => {
  const forgotPasswordForm = document.getElementById("forgotPasswordForm")

  forgotPasswordForm.addEventListener("submit", (event) => {
    event.preventDefault()

    const email = document.getElementById("email").value

    // Here you would typically send the reset password request to your server
    console.log("Reset password request for:", email)

    // For demonstration purposes, we'll just log a message
    alert("Password reset email would be sent to: " + email)
  })
})

