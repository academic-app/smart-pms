// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/analytics";
import "firebase/database";

// web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDQSL_YD4ndOnhBDm-UWao9XkkAnXVG7Ww",
    authDomain: "smart-pms-1797e.firebaseapp.com",
    databaseURL: "https://smart-pms-1797e.firebaseio.com",
    projectId: "smart-pms-1797e",
    storageBucket: "smart-pms-1797e.appspot.com",
    messagingSenderId: "97961959988",
    appId: "1:97961959988:web:6d87fd4bcc221bf50f2061",
    measurementId: "G-2KTZ0JQCHX"
};
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const base = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
let currentUserId = null;
firebase.auth().onAuthStateChanged((user)=>{
    if(user){
        currentUserId = user.uid;
    }
})
firebase.analytics();
export {app, base, googleAuthProvider, currentUserId};