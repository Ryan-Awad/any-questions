import {initializeApp} from 'firebase/app';
import {getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile} from 'firebase/auth';
import * as firebaseConfig from '../auth/firebaseConfig.json';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firebaseErrors = {
  'auth/email-already-in-use': 'This e-mail is already in use.',
  'auth/weak-password': 'Your password must be at least 6 characters long.',
  'auth/invalid-email': 'Please enter a valid E-Mail.'
}

const signUp = (username, email, password) => {
  if (!username || !email || !password) {
    alert('Please make sure to fill out all fields.');
  } else {
    createUserWithEmailAndPassword(auth, email, password)
    .then(userInfo => {
      const {user} = userInfo;
      updateProfile(user, {
        displayName: username
      })
      sendEmailVerification(user)
      .then(() => {
        alert(`Email verification has been sent to ${email}.`);
        window.location.href = '/verify-email';
      })
      .catch(error => alert(firebaseErrors[error.code] ? firebaseErrors[error.code] : 'An error has occured.'));
    })
    .catch(error => alert(firebaseErrors[error.code] ? firebaseErrors[error.code] : 'An error has occured.'));
  }
};

export default signUp;