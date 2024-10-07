// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBD8rsh0SqTwH_vUsqwT3114P1lHV0P6s8",
  authDomain: "solo-34912.firebaseapp.com",
  projectId: "solo-34912",
  storageBucket: "solo-34912.appspot.com",
  messagingSenderId: "975552486835",
  appId: "1:975552486835:web:ec4b235a199f56c93ebfc6",
  measurementId: "G-JMHZ9KFX1T",
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
const analytics = getAnalytics(FIREBASE_APP);
