import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBM-SC34hIiPeTg-zrerJfwH_qcl3vJKD4",
  authDomain: "notesapp-193e6.firebaseapp.com",
  projectId: "notesapp-193e6",
  storageBucket: "notesapp-193e6.appspot.com",
  messagingSenderId: "349427471065",
  appId: "1:349427471065:web:cb978780fbf1227eece4c8",
  measurementId: "G-3S2HYX6ST2"
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };