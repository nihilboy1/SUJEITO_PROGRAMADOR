import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
  apiKey: 'AIzaSyCLZqL0ctjl2Xcl4EqgqHUgcWTGsQDKqo4',
  authDomain: 'cursodefirebase-506bd.firebaseapp.com',
  projectId: 'cursodefirebase-506bd',
  storageBucket: 'cursodefirebase-506bd.appspot.com',
  messagingSenderId: '930196421810',
  appId: '1:930196421810:web:b91b614971b75809301dab',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
