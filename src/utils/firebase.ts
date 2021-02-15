import firebase from "firebase/app";
import firebaseConfig from "../../firebase.config.json";

// Firebase usage goes here.
import "firebase/database";
import "firebase/auth";

if (typeof window !== "undefined" && firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
