//firebase
import * as firebase from 'firebase';
import 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyBkle7HgQNyoDtCWDSkXYetHxGqTHJP3dc",
  authDomain: "soreseikai-514f7.firebaseapp.com",
  databaseURL: "https://soreseikai-514f7.firebaseio.com",
  projectId: "soreseikai-514f7",
  storageBucket: "soreseikai-514f7.appspot.com",
  messagingSenderId: "282136720392",
  appId: "1:282136720392:web:66203bf27dbd9ab23f8dbd",
  measurementId: "G-7K4CGM5PZ8"
};
if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export const db = firebase.firestore();

export function CreateRoom(){
  let roomNum = ""+Math.floor( Math.random() * 10 )+Math.floor( Math.random() * 10 )+Math.floor( Math.random() * 10 )+Math.floor( Math.random() * 10 ) ;
  db.collection("rooms").doc(roomNum).set({
    isWaiting:true,
  })
  return roomNum
}

export async function SearchRoom(roomNum){
  return await db.collection("rooms").doc(roomNum).get()
}

export function DeleteRoom(roomNum){
  db.collection("rooms").doc(roomNum).delete();
}