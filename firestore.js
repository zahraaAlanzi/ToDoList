
import firebase from "firebase/app";
import "firebase/firestore"
import { getAuth } from "firebase/auth";
const firebaseConfig = import('./src/firebaseconfg.json')
const db = firebase.firestore();

const app = initializeApp(firebaseConfig);
export const DB= getDataBase(app);
export const auth =getAuth(app);