// import * as firebase from 'firebase';
import firebase from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyBqyCoftbfMpZ9DQ3cczTSnpeeCfsobL1w",
  authDomain: "twitter-clone-4d19f.firebaseapp.com",
  databaseURL: "https://twitter-clone-4d19f.firebaseio.com",
  projectId: "twitter-clone-4d19f",
  storageBucket: "twitter-clone-4d19f.appspot.com",
  messagingSenderId: "710501474023",
  appId: "1:710501474023:web:7f3ffde8ec24793ae34c42"
};

export default firebase.initializeApp(firebaseConfig);