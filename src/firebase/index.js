import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firebase-firestore';
import 'firebase/firebase-auth';
import 'firebase/firebase-functions';

var firebaseConfig = {
    apiKey: "AIzaSyCgzihCXh5gpuFJRfwUoPtssZFogYb7rBM",
    authDomain: "testfirestore-25bc6.firebaseapp.com",
    databaseURL: "https://testfirestore-25bc6.firebaseio.com",
    projectId: "testfirestore-25bc6",
    storageBucket: "testfirestore-25bc6.appspot.com",
    messagingSenderId: "13576346726",
    appId: "1:13576346726:web:df3cda051d1c5835"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage();
  const firestore = firebase.firestore();
  const auth = firebase.auth();
  const functions = firebase.functions();

  const provider = new firebase.auth.GoogleAuthProvider();


  export {
     functions, provider, auth, storage, firestore, firebase as default
  }