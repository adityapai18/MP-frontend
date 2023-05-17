// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import {getAuth} from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyASgR9rtuHwaXh8TVUHW4zuQOHwUHodBSs",
  authDomain: "my-doctor-c2935.firebaseapp.com",
  projectId: "my-doctor-c2935",
  storageBucket: "my-doctor-c2935.appspot.com",
  messagingSenderId: "755199503420",
  appId: "1:755199503420:web:8e9ecc46629f82590e6739",
  measurementId: "G-9RWN9T6FYH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth};
