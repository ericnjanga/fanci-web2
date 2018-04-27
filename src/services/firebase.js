/**
 * Firebase service
 */
import firebase from 'firebase';
  // Initialize Firebase
const config = {
  apiKey: "AIzaSyCxntwOBuRnLUn0W1I-CoK5JhzfPdy7x1E",
  authDomain: "fanci-1.firebaseapp.com",
  databaseURL: "https://fanci-1.firebaseio.com",
  projectId: "fanci-1",
  storageBucket: "fanci-1.appspot.com",
  messagingSenderId: "25676979886"
};

firebase.initializeApp(config); 

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;