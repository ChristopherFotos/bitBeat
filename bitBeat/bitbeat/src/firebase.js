import firebase from 'firebase'
import "firebase/firestore"

var firebaseConfig = {
    apiKey: "AIzaSyA1hcBBf0n3mPCSdTEoHdbptPe9dwmUN-g",
    authDomain: "bitbeat-11ad2.firebaseapp.com",
    projectId: "bitbeat-11ad2",
    storageBucket: "bitbeat-11ad2.appspot.com",
    messagingSenderId: "702992864567",
    appId: "1:702992864567:web:5399265ca35d3dd045b6b2",
    measurementId: "G-7VXP9PE1LC"
  };

  firebase.initializeApp(firebaseConfig);

export default firebase