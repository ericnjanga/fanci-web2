/**
 * Firebase service
 */
import firebase from 'firebase';
  // Initialize Firebase
const config = {
  apiKey: "AIzaSyBNlXmXyc2YhapePfINQDw-Mjh3ibAXk4w",
  authDomain: "therock-fanclub.firebaseapp.com",
  databaseURL: "https://therock-fanclub.firebaseio.com",
  projectId: "therock-fanclub",
  storageBucket: "therock-fanclub.appspot.com",
  messagingSenderId: "587064587996"
};

firebase.initializeApp(config); 

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;