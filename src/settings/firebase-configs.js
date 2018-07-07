/**
 * Firebase configuration
 */

import firebase from 'firebase';

export const firebaseConfig = {
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

export default firebase;
