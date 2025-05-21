import { auth } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";

const registerForm = document.querySelector(".register-form");
const provider = new GoogleAuthProvider();
const messageBox = document.getElementById("auth-message");

//  Display error messages
function showMessage(message, isError = true) {
  if (!isError) return;
  messageBox.textContent = message;
  messageBox.classList.remove("error");
  messageBox.classList.add("error");
  messageBox.style.display = "block";
}

//Validate email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// REGISTER FORM
registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("EmailInputSign").value;
  const password = document.getElementById("passwordInputSign").value;

  if (!isValidEmail(email)) {
    showMessage("Please enter a valid email.");
    return;
  }
  if (password.length < 8) {
    showMessage("Password must be at least 8 characters long.");
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      console.log("User registered:", cred.user);
      registerForm.reset();

      document
        .querySelectorAll(".register-form .form-input")
        .forEach((input) => (input.value = ""));

      document.getElementById("register-form").classList.add("hidden");
      document.getElementById("login-form").classList.remove("hidden");
      document.getElementById("form-title").textContent = "LOGIN";
    })
    .catch((error) => {
      console.error("Registration Error:", error.message);
      if (error.code === "auth/email-already-in-use") {
        showMessage("This email is already registered. Please log in.");
      } else {
        showMessage("Registration failed. Please try again.");
      }
    });
});

// LOGIN FORM
const login = document.getElementById("login-form");

login.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("emailInputLog").value;
  const password = document.getElementById("passwordInputLog").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      console.log("User logged in:", cred.user);
    })
    .catch((err) => {
      console.error("Login Error:", err.code);

      if (
        err.code === "auth/wrong-password" ||
        err.code === "auth/user-not-found" ||
        err.code === "auth/invalid-login-credentials"
      ) {
        showMessage("Invalid email or password. Please try again.");
      } else if (err.code === "auth/invalid-email") {
        showMessage("Please enter a valid email.");
      } else {
        showMessage("Login failed. Please try again.");
      }
    });
});

// GOOGLE SIGNUP
const googleSignupButton = document.getElementById("google-signup");

googleSignupButton.addEventListener("click", () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      const isNewUser = result._tokenResponse?.isNewUser;

      if (!isNewUser) {
        console.log("Existing Google account used for sign up:", user);
        showMessage("This account already exists. Please proceed to login.");
      }

      document.getElementById("register-form").classList.add("hidden");
      document.getElementById("login-form").classList.remove("hidden");
      document.getElementById("form-title").textContent = "LOGIN";
    })
    .catch((error) => {
      console.error("Google Sign-in Error:", error.code);

      if (error.code === "auth/cancelled-popup-request") {
        showMessage("Sign-in was cancelled. Please try again.");
      } else {
        showMessage("Google Sign-in failed. Please try again.");
      }
    });
});

// GOOGLE LOGIN
const googleLoginButton = document.getElementById("google-login");

googleLoginButton.addEventListener("click", () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log("Google login:", user);
    })
    .catch((error) => {
      console.error("Google Login Error:", error.code);

      if (error.code === "auth/cancelled-popup-request") {
        showMessage("Login was cancelled. Please try again.");
      } else {
        showMessage("Google login failed. Please try again.");
      }
    });
});
