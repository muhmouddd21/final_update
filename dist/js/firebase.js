// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBKwseko7JItznt37s6Ed8MX46qD0Nu8Sk",
  authDomain: "jsproj-group.firebaseapp.com",
  projectId: "jsproj-group",
  storageBucket: "jsproj-group.appspot.com",
  messagingSenderId: "857452922932",
  appId: "1:857452922932:web:c192ef221e6417ce33e261",
  measurementId: "G-4K4WZWMGX8",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
