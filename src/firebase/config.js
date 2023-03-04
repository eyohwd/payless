// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_API_KEY,
  authDomain: "lekho-shop.firebaseapp.com",
  projectId: "lekho-shop",
  storageBucket: "lekho-shop.appspot.com",
  messagingSenderId: "554512782479",
  appId: "1:554512782479:web:8b5d25d47ce044fef34cfa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;