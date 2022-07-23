import {getAuth} from 'firebase/auth';

const logout = () => {
  getAuth().signOut();
}

export default logout;