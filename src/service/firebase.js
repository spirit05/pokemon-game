import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyD7DlH5sNxwuj2MlUjS9ZTMjMJ4PSPf3oc",
    authDomain: "pokemon-game-3922e.firebaseapp.com",
    databaseURL: "https://pokemon-game-3922e-default-rtdb.firebaseio.com",
    projectId: "pokemon-game-3922e",
    storageBucket: "pokemon-game-3922e.appspot.com",
    messagingSenderId: "168092574528",
    appId: "1:168092574528:web:5d626e7994197e6048d0a5"
  };
  
  firebase.initializeApp(firebaseConfig);

export const fire = firebase;
export const database = fire.database();  