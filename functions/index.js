const functions = require('firebase-functions');
require("./backup.js");

exports.scheduledFirestoreExport = functions.pubsub
  .schedule('0 2 */1 * *')
  .timeZone('Europe/Berlin')
  .onRun(async context => {
    try {
      await backup();
    } catch (err) {
      console.error('error running db backup cron', err)
    }
  });
