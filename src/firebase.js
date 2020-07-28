import firebase from "firebase";

const firebaseConfig = {};

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAXH9ELrQB3X1gjBBV2CaaEdle3d-6M4pU",
  authDomain: "messenger-317.firebaseapp.com",
  databaseURL: "https://messenger-317.firebaseio.com",
  projectId: "messenger-317",
  storageBucket: "messenger-317.appspot.com",
  messagingSenderId: "194089382318",
  appId: "1:194089382318:web:560ddafb66dfd2914d583f",
  measurementId: "G-1BQ3D324JY",
});

const db = firebaseApp.firestore();

export default db;
