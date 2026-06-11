import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || ""
};

let app;
let db: any;
let analytics: any = null;

try {
  if (!firebaseConfig.apiKey) {
    console.error("Firebase API key is missing. Please configure VITE_FIREBASE_API_KEY in your hosting dashboard.");
  }
  // Initialize Firebase (reuse existing app if initialized)
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  // Initialize Firestore
  db = getFirestore(app);
} catch (error) {
  console.error("Failed to initialize Firebase app or Firestore:", error);
  // Export a mock Firestore object to prevent the React app from crashing on boot
  db = new Proxy({}, {
    get: () => {
      return () => {
        console.error("Firestore operation called but Firebase failed to initialize.");
        return {};
      };
    }
  });
}

// Initialize Analytics safely (checking isSupported prevents crashes if blocked by adblockers)
if (app && typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported && firebaseConfig.measurementId) {
      analytics = getAnalytics(app);
    }
  }).catch((err) => {
    console.warn("Analytics not supported or blocked:", err);
  });
}

export { app, db, analytics };

