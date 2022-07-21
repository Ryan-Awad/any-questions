import {getAuth} from 'firebase/auth';

const isEmailVerified = (callback) => {
  getAuth().onAuthStateChanged(user => {
    if (user) {
      callback(user.emailVerified)
    } else {
      callback(false);
    }
  });
}

export default isEmailVerified;