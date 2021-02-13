import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyAUaxwXoSDS6h7Td81M5Pv4Mv3m6s1ljDw',
  authDomain: 'retrospective-d4e43.firebaseapp.com',
  projectId: 'retrospective-d4e43',
  storageBucket: 'retrospective-d4e43.appspot.com',
  messagingSenderId: '400050792851',
  appId: '1:400050792851:web:2126014c09f39cb57e2066',
  measurementId: 'G-KTWVTJP0HZ',
};

const app = firebase.initializeApp(config);
const db = app.firestore();

export const fieldValue = firebase.firestore.FieldValue;

export default db;
