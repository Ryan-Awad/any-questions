import {getAuth} from 'firebase/auth';

const getJwt = (callback) => { 
  getAuth().onAuthStateChanged(user => {
    if (user) {
      user.getIdToken(/*forceRefresh*/ true)
      .then(token => callback(token));
    } else {
      callback(null);
    }
  })
}

export default getJwt;