import firebase from "firebase";

const config = {
  apiKey: "AIzaSyCylhICJDdE85iwyMtI9PdG5yaMPW29MXk",
  authDomain: "restaurant-finder-f6e4d.firebaseapp.com",
  databaseURL: "https://restaurant-finder-f6e4d.firebaseio.com",
  projectId: "restaurant-finder-f6e4d",
  storageBucket: "restaurant-finder-f6e4d.appspot.com",
  messagingSenderId: "1098062858225",
  appId: "1:1098062858225:web:1ff714f619f0b44ae2e650",
  measurementId: "G-1ZHWES7RX1"
};

firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;