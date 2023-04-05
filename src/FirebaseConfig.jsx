import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDswsKs3EbYQXqnC4-Ms0XwwQDYPhNk6iw",
    authDomain: "streamore-4f6cd.firebaseapp.com",
    databaseURL: "https://streamore-4f6cd-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "streamore-4f6cd",
    storageBucket: "streamore-4f6cd.appspot.com",
    messagingSenderId: "616250674543",
    appId: "1:616250674543:web:90de0569f560920e292c9a",
    measurementId: "G-SBKWRZ0GTF"
  }; 
const FirebaseApp = initializeApp(firebaseConfig)
export default FirebaseApp;