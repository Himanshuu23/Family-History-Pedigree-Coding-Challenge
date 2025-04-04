// src/firebase/config.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// import dotenv from "dotenv";
// import path from "path";

// dotenv.config({ path: path.resolve(__dirname, "../.env") });

const firebaseConfig = {
  apiKey: "AIzaSyARIkQpqPPZ0lUZxF5051syKSEtJWI1pY8",
  authDomain: "family-history-pedigree-bac57.firebaseapp.com",
  projectId: "family-history-pedigree-bac57",
  storageBucket: "family-history-pedigree-bac57.firebasestorage.app",
  messagingSenderId: "950396824286",
  appId: "1:950396824286:web:4863d6af2fa2ea54a4304f",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
