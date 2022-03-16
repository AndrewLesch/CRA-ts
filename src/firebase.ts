import { initializeApp } from 'firebase/app';
import {
  browserSessionPersistence,
  getAuth,
  GoogleAuthProvider,
  setPersistence,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import { AccountDto, RecordDto } from './model';

// Initialize Firebase
const app = initializeApp({
  apiKey: 'AIzaSyAEdsQUgaFk8MnB13EXBhTBK_FexUlxrdk',
  authDomain: 'money-tracker-a4561.firebaseapp.com',
  projectId: 'money-tracker-a4561',
  storageBucket: 'money-tracker-a4561.appspot.com',
  messagingSenderId: '1067020311180',
  appId: '1:1067020311180:web:5e2cbf97cfe3440f6ab9a9',
  measurementId: 'G-RW6BWY0KX1',
});

export const auth = getAuth(app);
export const database = getDatabase(app);
const provider = new GoogleAuthProvider();

setPersistence(auth, browserSessionPersistence);

export const SignInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then(() => {})
    .catch((error) => {
      console.log(error);
    });
};

export const SignOut = () => {
  signOut(auth).then(() => {});
};
