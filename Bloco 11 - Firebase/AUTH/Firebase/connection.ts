// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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

export const auth = getAuth(app);
