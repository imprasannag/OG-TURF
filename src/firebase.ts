import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAlGgH_uGPOK4gOP0j1rlXMkRhoBtvHtSM",
  authDomain: "og-turf.firebaseapp.com",
  projectId: "og-turf",
  storageBucket: "og-turf.firebasestorage.app",
  messagingSenderId: "223032946190",
  appId: "1:223032946190:web:26262203ce6762054cd65f",
  measurementId: "G-T7PW5H8SE5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore (Database)
export const db = getFirestore(app);

// Initialize Analytics (Safe for SSR/Vite)
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
