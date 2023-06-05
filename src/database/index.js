const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

const serviceAccount = require("./credentials.json");

initializeApp({
  credential: cert(serviceAccount)
    // credential: applicationDefault(),
    // databaseURL: "https://taskl-default-rtdb.firebaseio.com/"
});

const db = getFirestore();

module.exports = {db};