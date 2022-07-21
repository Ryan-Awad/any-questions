import {getAuth} from 'firebase/auth';

const getJWT = (callback) => { 
  getAuth().onAuthStateChanged(user => {
    if (user) {
      user.getIdToken(/*forceRefresh*/ true)
      .then(token => callback(token));
    } else {
      callback(null);
    }
  })
}

export default getJWT;