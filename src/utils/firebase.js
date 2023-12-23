// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import 'firebase/firestore'
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAs35ZzSW16dcY1p-jOyyuYIq-oGYmao6g",
  authDomain: "giphy-91e54.firebaseapp.com",
  projectId: "giphy-91e54",
  storageBucket: "giphy-91e54.appspot.com",
  messagingSenderId: "191319375421",
  appId: "1:191319375421:web:cff26aa599d3f7c40af454"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)

export { app,auth,db}