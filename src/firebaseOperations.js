const firebase = require('firebase-admin');
const serviceAccount = require('../auth/serviceAccount.json');

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount)
});

const db = firebase.firestore();

module.exports.getID = (collection, callback) => {
  const idLength = 20;
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
    callback();
  });
}

module.exports.readData = (collection, callback) => {
  db.collection(collection).get().then(data => {
    callback(data.docs.map(doc => doc.data()));
  });
}