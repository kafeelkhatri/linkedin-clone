import firebase from "firebase/compat/app";

import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDxNjsVAxyhY6lQH9k7COEXk-X0YQCq3i4",
  authDomain: "linkedin-clone-3250e.firebaseapp.com",
  projectId: "linkedin-clone-3250e",
  storageBucket: "linkedin-clone-3250e.appspot.com",
  messagingSenderId: "108209211253",
  appId: "1:108209211253:web:2cdb09c35f40b97361f53c",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;
