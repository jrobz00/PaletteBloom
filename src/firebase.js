// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics"; // For Analytics
import { getAuth } from "firebase/auth"; // For Authentication
import { getFirestore } from "firebase/firestore"; // For Firestore Database
import { getStorage } from "firebase/storage"; // For File Storage

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBuQ2jlfpj7wqdrNB-VWZMrqtOt2SC4Kx0",
  authDomain: "huntmint-56203.firebaseapp.com",
  projectId: "huntmint-56203",
  storageBucket: "huntmint-56203.appspot.com", // Fixed URL for storage
  messagingSenderId: "1003002665283",
  appId: "1:1003002665283:web:2d0a3fa09b619b965eb7f6",
  measurementId: "G-ZGZHGGBEXS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Services
export const auth = getAuth(app); // Authentication Service
export const db = getFirestore(app); // Firestore Database
export const storage = getStorage(app); // File Storage
export default app; // Export the Firebase App instance
