import firebase from "firebase";

const firebaseConfig = {
   apiKey: "AIzaSyChpzer2ly18Nb1Ce3V6gP88qfs1usYPfI",
  authDomain: "to-gift-1ccd4.firebaseapp.com",
  projectId: "to-gift-1ccd4",
  storageBucket: "to-gift-1ccd4.appspot.com",
  messagingSenderId: "1081869834641",
  appId: "1:1081869834641:web:cb91abc398841ab18a2230"

};
// // Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.database().ref("/list");

export default db;
