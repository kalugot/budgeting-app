import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCNkI7hr5NkVD1_TYWWVboAPZ-dqxzaLb8",
  authDomain: "budgeting-app-test-mode.firebaseapp.com",
  databaseURL: "https://budgeting-app-test-mode.firebaseio.com",
  projectId: "budgeting-app-test-mode",
  storageBucket: "budgeting-app-test-mode.appspot.com",
  messagingSenderId: "29138106351",
  appId: "1:29138106351:web:7bbf14970d22a91236281a",
  measurementId: "G-3590V7GXKQ"
};

const fire = firebase.initializeApp(firebaseConfig);

export default fire;
