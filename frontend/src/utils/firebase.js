import { getAuth } from "firebase/auth";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "alarm-scheduler-a604e.firebaseapp.com",
  projectId: "alarm-scheduler-a604e",
  storageBucket: "alarm-scheduler-a604e.firebasestorage.app",
  messagingSenderId: "506672960991",
  appId: "1:506672960991:web:5a3c59f16b1cd0abf7606a",
  measurementId: "G-X2955QP57F"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// const analytics = getAnalytics(app);