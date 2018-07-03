/**
 * Firebase service
 */
import firebase from 'firebase';

// Config files
const config = {
  dev: {
    apiKey: 'AIzaSyCHclSgWSmBM1c0kz03rxccV988EwYQtcY',
    authDomain: 'fanci-dev.firebaseapp.com',
    databaseURL: 'https://fanci-dev.firebaseio.com',
    projectId: 'fanci-dev',
    storageBucket: 'fanci-dev.appspot.com',
    messagingSenderId: '25676979886',
  },
  prod: {
    apiKey: 'AIzaSyBVfEauSfBODM_0swF97ZgtVxDFY-Xe_38',
    authDomain: 'fanci-prod.firebaseapp.com',
    databaseURL: 'https://fanci-prod.firebaseio.com',
    projectId: 'fanci-prod',
    storageBucket: 'fanci-prod.appspot.com',
    messagingSenderId: '25676979886',
  },
};

// Initialize Firebase
firebase.initializeApp(config.dev);

// Get a references ...
export const provider = new firebase.auth.GoogleAuthProvider(); // provider
export const database = firebase.database(); // database 
export const auth     = firebase.auth(); // auth 
export const storage  = firebase.storage(); //storage service (which is used to create references in your storage bucket)

export default firebase;