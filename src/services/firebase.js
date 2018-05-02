/**
 * Firebase service
 */
import firebase from 'firebase';

// Config file
const config = {
  apiKey: "AIzaSyCxntwOBuRnLUn0W1I-CoK5JhzfPdy7x1E",
  authDomain: "fanci-1.firebaseapp.com",
  databaseURL: "https://fanci-1.firebaseio.com",
  projectId: "fanci-1",
  storageBucket: "fanci-1.appspot.com",
  messagingSenderId: "25676979886"
};

// Initialize Firebase
firebase.initializeApp(config); 

// Get a references ...
export const provider = new firebase.auth.GoogleAuthProvider(); // provider
export const database = firebase.database(); // database 
export const auth     = firebase.auth(); // auth 
export const storage  = firebase.storage(); //storage service (which is used to create references in your storage bucket)


export default firebase;