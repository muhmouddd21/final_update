const showLogin = document.getElementById("show-login");
const showRegister = document.getElementById("show-register");
const registerForm = document.getElementById("register-form");
const loginForm = document.getElementById("login-form");
const formTitle = document.getElementById("form-title");

// Reset forms on page load
document.addEventListener("DOMContentLoaded", () => {
    registerForm.reset();
    loginForm.reset();

    // Clear all inputs and reset labels
    document.querySelectorAll(".form-input").forEach((input) => {
        input.value = "";
        // Trigger the input event to update labels
        input.dispatchEvent(new Event("input"));
    });
});

showLogin.addEventListener("click", () => {
    registerForm.classList.add("hidden");
    loginForm.classList.remove("hidden");
    formTitle.textContent = "LOGIN";
});

showRegister.addEventListener("click", () => {
    loginForm.classList.add("hidden");
    registerForm.classList.remove("hidden");
    formTitle.textContent = "REGISTER";
});