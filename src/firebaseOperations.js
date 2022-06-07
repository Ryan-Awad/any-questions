const firebase = require('firebase-admin');
const serviceAccount = require('../auth/serviceAccount.json');

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount)
});

const db = firebase.firestore();

getID = () => {
    const idLength = 20;
    const id = Math.round(Math.random() * 10**idLength);
    // check if ID exists
    return id.toString();
}

writeData = (collection, data, callback) => {
    const dataID = getID();
    db.collection(collection).doc(dataID).create(data);
    callback();
}

readData = (collection, callback) => {
    db.collection(collection).get().then(data => {
        callback(data.docs.map(doc => doc.data()));
    });
}

