import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
} from 'firebase/auth';
import React from 'react';
import {Alert} from 'react-native';
import {auth} from './connection';

export async function createNewUser(
  email: string,
  password: string,
  callback: React.Dispatch<React.SetStateAction<User | undefined>>,
) {
  await createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const user = userCredential.user;
      if (user.email) {
        callback(user);
        Alert.alert('Email cadastrado: ', user.email);
      }
    })
    .catch(error => {
      console.log('deu erro');
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
}

export async function loginUser(
  email: string,
  password: string,
  callback: React.Dispatch<React.SetStateAction<User | undefined>>,
) {
  await signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const user = userCredential.user;
      return true;
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      return false;
    });
  return false;
}
