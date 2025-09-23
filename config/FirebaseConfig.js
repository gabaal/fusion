// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-fusion-5d76c.firebaseapp.com",
  projectId: "ai-fusion-5d76c",
  storageBucket: "ai-fusion-5d76c.firebasestorage.app",
  messagingSenderId: "18239282742",
  appId: "1:18239282742:web:91fb149ec872f8c6718297"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, 'default');