import {getAuth, sendEmailVerification} from 'firebase/auth';

const resendEmailVerification = (callback) => {
  getAuth().onAuthStateChanged(user => {
    sendEmailVerification(user)
    .then(() => {
      callback();
    })
    .catch(error => {
      if (error.code === 'auth/too-many-requests') {
        alert('Wait a bit before resending another E-mail verification');
      } else {
        alert('Something went wrong.');
        console.log(error);
      }
    });
  });
}

export default resendEmailVerification;