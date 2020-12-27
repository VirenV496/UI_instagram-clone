
  import firebase from "firebase";

  const firebaseApp =  firebase.initializeApp({

    apiKey: "AIzaSyD3sMLOJ_x3BRX3X4IzgvQHF87CXJcvDNI",
    authDomain: "instagram-clone-b7068.firebaseapp.com",
    databaseURL: "https://instagram-clone-b7068-default-rtdb.firebaseio.com",
    projectId: "instagram-clone-b7068",
    storageBucket: "instagram-clone-b7068.appspot.com",
    messagingSenderId: "929745770511",
    appId: "1:929745770511:web:5658b15c3e8c575fb72b7a"



  });

  const db =firebaseApp.firestore();
  const auth= firebase.auth();
  const storage = firebase.storage();

  export {db, auth , storage};