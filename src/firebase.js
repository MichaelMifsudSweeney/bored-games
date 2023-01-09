// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseKey = process.env.REACT_APP_FIREBASE_API_KEY;
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
console.log(firebaseKey)
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: firebaseKey,
  authDomain: "auth-tutorial-fc672.firebaseapp.com",
  projectId: "auth-tutorial-fc672",
  storageBucket: "auth-tutorial-fc672.appspot.com",
  messagingSenderId: "404351917450",
  appId: "1:404351917450:web:4d6e9462b8045ff5d0fc73"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);