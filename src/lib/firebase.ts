import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCsE2j9UlXLqnA1mRof85CBa94xYj52q6U",
  authDomain: "sixth-hall-1zp2g.firebaseapp.com",
  projectId: "sixth-hall-1zp2g",
  storageBucket: "sixth-hall-1zp2g.firebasestorage.app",
  messagingSenderId: "1060090447298",
  appId: "1:1060090447298:web:498501c79005f26b1b025b"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app, "ai-studio-mealgroceryplann-2316272d-d0c9-4086-9e6e-0250f243da19");


