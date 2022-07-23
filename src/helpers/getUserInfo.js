import { getAuth } from "firebase/auth";

const getUserInfo = (callback) => {
  getAuth().onAuthStateChanged(user => callback(user));
}

export default getUserInfo;