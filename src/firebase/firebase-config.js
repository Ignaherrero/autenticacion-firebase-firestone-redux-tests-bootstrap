import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfigDevelopment = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MEASUREMENTID,
};

const firebaseConfigTest = {
  apiKey: process.env.TEST_APIKEY,
  authDomain: process.env.TEST_AUTHDOMAIN,
  projectId: process.env.TEST_PROJECTID,
  storageBucket: process.env.TEST_STORAGEBUCKET,
  messagingSenderId: process.env.TEST_MESSAGINGSENDERID,
  appId: process.env.TEST_APPID,
  measurementId: process.env.TEST_MEASUREMENTID,
};

if (process.env.NODE_ENV === "test") {
  firebase.initializeApp(firebaseConfigTest);
} else {
  firebase.initializeApp(firebaseConfigDevelopment);
}

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { db, googleAuthProvider, firebase };
