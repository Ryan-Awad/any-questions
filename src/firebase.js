const firebaseAdmin = require('firebase-admin');
const serviceAccount = require('../auth/serviceAccount.json');

firebaseAdmin.initializeApp({ // initializing the app for the firebase admin SDK
  credential: firebaseAdmin.credential.cert(serviceAccount)
});

const db = firebaseAdmin.firestore();

module.exports.getID = (collection, callback) => {
  const idLength = 16;
  const id = Math.round(Math.random() * 10**idLength);

  this.readData(collection, data => {
    const ids = data.map(x => x.id);
    if (ids.includes(id)) {
      getID(collection, callback); // recurse to try generating another ID
    } else {
      callback(id.toString());
    }
  });
}

module.exports.writeData = (collection, data, callback) => {
  this.getID(collection, dataID => {
    data['id'] = dataID;
    db.collection(collection).doc(dataID).create(data);
    callback(dataID);
  });
}

module.exports.editData = (collection, dataID, idKeyName, userID, valuesToEdit, callback) => { // idKeyName is the key name in the specific collection that holds the id of the user you are verifying
  this.verifyUser(collection, dataID, idKeyName, userID, permGranted => {
    if (permGranted) {
      db.collection(collection).doc(dataID).update(valuesToEdit).then(() => {callback(true)});
    } else {
      callback(false);
    }
  });
}

module.exports.deleteData = (collection, dataID, idKeyName, userID, callback) => { // see comment above on the meaning of idKeyName
  this.verifyUser(collection, dataID, idKeyName, userID, permGranted => {
    if (permGranted) {
      db.collection(collection).doc(dataID).delete().then(() => callback(true));
    } else {
      callback(false);
    }
  });
}

module.exports.readData = (collection, callback) => {
  db.collection(collection).get().then(data => {
    callback(data.docs.map(doc => doc.data()));
  });
}

module.exports.verifyUser = (collection, dataID, idKeyName, userID, callback) => { // see comment above on the meaning of idKeyName
  db.collection(collection).doc(dataID).get().then(data => {
    callback(data.data()[idKeyName] === userID);
  });
}

