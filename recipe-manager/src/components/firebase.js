// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBUp7z6zoDdQdYtSgofj8o-EW91vwRF46w",
  authDomain: "recipe-manager-30527.firebaseapp.com",
  projectId: "recipe-manager-30527",
  storageBucket: "recipe-manager-30527.firebasestorage.app",
  messagingSenderId: "351287519477",
  appId: "1:351287519477:web:0ef601ba569ad2a9557dbc",
  measurementId: "G-71JZ5BQV2F",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export default app;
