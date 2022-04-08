import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database'

const firebaseConfig = {
  apiKey: "AIzaSyClUDteD36JCKIKfh-QEjWIUX76yHjMZ9I",
  authDomain: "react-c82e4.firebaseapp.com",
  databaseURL: "https://react-c82e4-default-rtdb.firebaseio.com",
  projectId: "react-c82e4",
  storageBucket: "react-c82e4.appspot.com",
  messagingSenderId: "427088032471",
  appId: "1:427088032471:web:881fdef26f8c3791b0f692",
  measurementId: "G-7ED9NVHJ68"
};

firebase.initializeApp(firebaseConfig);

const auth =firebase.auth();
const db = firebase.database();

export {firebase, auth, db}