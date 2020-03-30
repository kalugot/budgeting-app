import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBAjwBSSEDrzdX-qkJ3Qo60cqeV0XABoYU",
  authDomain: "rsk-budgeting-app.firebaseapp.com",
  databaseURL: "https://rsk-budgeting-app.firebaseio.com",
  projectId: "rsk-budgeting-app",
  storageBucket: "rsk-budgeting-app.appspot.com",
  messagingSenderId: "780941459511",
  appId: "1:780941459511:web:a6c8ecb19f122e12fa3fb2",
  measurementId: "G-97LE7E4HLG"
};

const fire = firebase.initializeApp(firebaseConfig);

export default fire;