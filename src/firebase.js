// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1cZYkXazWfnWxr_CJbDntTqhLR_Gyg5E",
  authDomain: "u-2-write-70aaf.firebaseapp.com",
  databaseURL: "https://u-2-write-70aaf-default-rtdb.firebaseio.com",
  projectId: "u-2-write-70aaf",
  storageBucket: "u-2-write-70aaf.appspot.com",
  messagingSenderId: "34619118985",
  appId: "1:34619118985:web:7bad8d21acd92541993d58"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export default firebase;