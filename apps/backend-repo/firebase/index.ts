import admin from "firebase-admin";
const serviceAccount = require("./serviceAccountKey");

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

const db = admin.firestore();
const auth = admin.auth();

export { admin, db, auth };
