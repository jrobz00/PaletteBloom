// Import the functions you need from the Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getFunctions } from "firebase/functions";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBuQ2jlfpj7wqdrNB-VWZMrqtOt2SC4Kx0",
  authDomain: "huntmint-56203.firebaseapp.com",
  projectId: "huntmint-56203",
  storageBucket: "huntmint-56203.appspot.com",
  messagingSenderId: "1003002665283",
  appId: "1:1003002665283:web:2d0a3fa09b619b965eb7f6",
  measurementId: "G-ZGZHGGBEXS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics
const analytics = getAnalytics(app);

// Initialize Firebase Services
export const auth = getAuth(app); // Firebase Authentication Service
export const db = getFirestore(app); // Firestore Database Service
export const storage = getStorage(app); // Firebase Storage Service
export const functions = getFunctions(app); // Firebase Cloud Functions Service

// Export the Firebase App instance for use in the app
export default app;
