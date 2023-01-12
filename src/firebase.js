import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDQg5I-gIBnbyWFnjCrjlXGoQP9Ub0kX08",
  authDomain: "railtrail-d3a4c.firebaseapp.com",
  databaseURL: "https://railtrail-d3a4c-default-rtdb.firebaseio.com",
  projectId: "railtrail-d3a4c",
  storageBucket: "railtrail-d3a4c.appspot.com",
  messagingSenderId: "456049021574",
  appId: "1:456049021574:web:2e01b43187b20a9de7f707",
  measurementId: "G-PNE5TW16Q6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);