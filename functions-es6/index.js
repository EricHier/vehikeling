import * as functions from "firebase-functions"
import {runForUser} from "./notification";
import {backup} from "./backup";

export let scheduledFirestoreExport = functions.pubsub
  .schedule('0 2 * * *')
  .timeZone('Europe/Berlin')
  .onRun(async context => {
    try {
      await backup();
    } catch (err) {
      console.error('error running db backup cron', err)
    }
  });

/*exports.notifications = functions-es6.pubsub
  .schedule('0 10 * * *')
  .timeZone('Europe/Berlin')
  .onRun(async context => {
    await runForUser();
  });*/

export let notificationsTest = functions.https.onRequest(async (req, res) => {
    await res.send( await runForUser({id: "wvdf5RlAYQhys5JC0A6mEQU897J2", notification_hu: true, notification_oil: false}));
});
