import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD69IUYDTYqyaUETbdiwwIwaeN864ek5_I",
  authDomain: "docudeck.firebaseapp.com",
  databaseURL: "https://docudeck-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "docudeck",
  storageBucket: "docudeck.appspot.com",
  messagingSenderId: "698098259326",
  appId: "1:698098259326:web:8de4b0446fff3af6b4cf2f"
};

const app = initializeApp(firebaseConfig);
// console.log("from firebase.js", process.env.REACT_APP_API_KEY)


export const auth = getAuth(app);