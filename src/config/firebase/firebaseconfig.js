import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyD9wUv_5uKWK0y67cLbSZM1nYk0klJYCZU",
  authDomain: "login-23880.firebaseapp.com",
  projectId: "login-23880",
  storageBucket: "login-23880.firebasestorage.app",
  messagingSenderId: "341084132478",
  appId: "1:341084132478:web:eef1a6e5735f0a42e5f42f",
  measurementId: "G-GFDVGCM7QP"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);