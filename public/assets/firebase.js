import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

// Firebase web config is public by design. Security comes from Firebase Auth + Firestore rules, not from hiding this.
// To use a new Firebase project, replace the values below with the ones from Project settings -> Your apps.
const firebaseConfig = {
  apiKey: "AIzaSyA8jtjUzrCqZasd_s9OBtEFzLauEnBp9g8",
  authDomain: "anivoflix-landing.firebaseapp.com",
  projectId: "anivoflix-landing",
  storageBucket: "anivoflix-landing.firebasestorage.app",
  messagingSenderId: "37571635173",
  appId: "1:37571635173:web:1d47791f9abf86cd72710c"
};

export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
