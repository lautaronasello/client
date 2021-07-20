import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase from 'firebase/app';

var firebaseConfig = {
  apiKey: 'AIzaSyCs2kYNcZNLEAjGqrnpRVug8SUokZFm6-g',
  authDomain: 'mern-notes-lautaronasello.firebaseapp.com',
  projectId: 'mern-notes-lautaronasello',
  storageBucket: 'mern-notes-lautaronasello.appspot.com',
  messagingSenderId: '253074759177',
  appId: '1:253074759177:web:146f310a74fccf6bdb22d8',
  measurementId: 'G-V6WQG4RJBT',
  databaseURL: 'https://mern-notes-lautaronasello-default-rtdb.firebaseio.com/',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();
var fs = firebase;
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

export { fs, db };
