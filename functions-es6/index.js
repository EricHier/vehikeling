import * as functions from "firebase-functions"
import {run, runForUser} from "./notification";
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

export let notificationsWorker = functions.pubsub
  .schedule('0 14 * * *')
  .timeZone('Europe/Berlin')
  .onRun(async context => {
    run();
  });
