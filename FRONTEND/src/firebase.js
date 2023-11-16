// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey,
  authDomain: "realtimate-66ee8.firebaseapp.com",
  projectId: "realtimate-66ee8",
  storageBucket: "realtimate-66ee8.appspot.com",
  messagingSenderId: "26843437378",
  appId: "1:26843437378:web:4e9cca1c18c639d8e8d0db",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
