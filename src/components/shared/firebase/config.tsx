import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAYJHYaa5fi1T7_959CMvHELLyUJT3nGAM",
  authDomain: "crypto-hallway-387021.firebaseapp.com",
  projectId: "crypto-hallway-387021",
  storageBucket: "crypto-hallway-387021.appspot.com",
  messagingSenderId: "903819601976",
  appId: "1:903819601976:web:141a09cf1025d3dbd99ecd",
  measurementId: "G-S4QHPW17KM",
};

const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app);
