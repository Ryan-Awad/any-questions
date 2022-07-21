import {getAuth} from 'firebase/auth';

const isSignedIn = (callback) => {
  getAuth().onAuthStateChanged(user => {
    callback(Boolean(user));
  });
}

export default isSignedIn;