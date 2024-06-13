// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "todos-a1b1f.firebaseapp.com",
  projectId: "todos-a1b1f",
  storageBucket: "todos-a1b1f.appspot.com",
  messagingSenderId: "983024509274",
  appId: "1:983024509274:web:af5180c3ff6e344b0f1363",
  measurementId: "G-61HV5E45Y9",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, app, analytics, db, storage };
