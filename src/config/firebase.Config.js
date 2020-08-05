import firebase from 'firebase/app';
import 'firebase/firestore'
import  'firebase/auth';



// Your web app's Firebase configuration
let firebaseConfig = {
    apiKey: "AIzaSyDhnC9eDaQoM4OwlSOUtApIWbsWqLPz9FA",
    authDomain: "inventory-feaa9.firebaseapp.com",
    databaseURL: "https://inventory-feaa9.firebaseio.com",
    projectId: "inventory-feaa9",       
    appId: "1:634207407722:web:845776aa57c71ca5bb0413",
    measurementId: "G-BNXS27FLH5"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;