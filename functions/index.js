// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
exports.addMessage = functions.https.onRequest((req, res) => {
    // Grab the text parameter.
    const message = req.query.text;
    // Push the new message into the Realtime Database using the Firebase Admin SDK.
    admin.database().ref('/messages').push({message: message}).then(snapshot => {
      // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
      return res.status(200).json({text: "ok"});
    });
});

exports.listMessages = functions.https.onRequest((req, res) => {
  let query = admin.database().ref('/messages');
  const MAX = 10;
  const lastMessageKey = req.query.lastMessageKey;

  query = query.orderByKey().limitToFirst(MAX);
  if (lastMessageKey) {
    query = query.startAt(lastMessageKey);
  }
  query.once('value').then(snapshot => {
    let messages = [];

    snapshot.forEach(childSnapshot => {
      messages.push({key: childSnapshot.key, message: childSnapshot.val().message});
    });

    if (lastMessageKey) {
      messages.shift();
    }

    return res.status(200).json(messages);
  }).catch(error => {
    console.log('Error getting messages', error.message);
    res.sendStatus(500);
  });
});