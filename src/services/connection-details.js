/**
 * Firebase service
 */
import firebase from 'firebase';

export const appEnv = 'prod';

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
firebase.initializeApp(config[appEnv]);

// Get a references ...
export const provider = new firebase.auth.GoogleAuthProvider(); // provider
export const database = firebase.database(); // database
export const auth     = firebase.auth(); // auth
export const storage  = firebase.storage(); //storage service (which is used to create references in your storage bucket)
export const googleMapAPIkey = 'AIzaSyACIFpmGqxK8mmy65nY9eKrufxdpea3muo';

// Locations for dev purposes
export const devGeoLocations = [
  { //master user
    lat : 43.651356500000006,
    lng : -79.5638379,
  },
  {
    lat : 43.621033,
    lng : -79.515202,
  },
  {
    lat : 43.592261,
    lng : -79.651439,
  },
  {
    lat : 43.71802,
    lng : -79.602849,
  },
  {
    lat : 43.642566,
    lng : -79.387056,
  }, 
];

export default firebase;
