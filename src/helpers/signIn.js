import {initializeApp} from 'firebase/app';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import * as firebaseConfig from '../auth/firebaseConfig.json';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firebaseErrors = {
  'auth/wrong-password': 'Invalid email or password.',
  'auth/user-not-found': 'Invalid email or password.',
  'auth/invalid-email': 'Please enter a valid E-Mail.',
  'auth/internal-error': 'Please make sure to fill out all fields'
}

const signIn = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
  .then(userInfo => window.location.href = '/')
  .catch(error => {
    alert(firebaseErrors[error.code] ? firebaseErrors[error.code] : 'An error has occured.');
  });
}

export default signIn;