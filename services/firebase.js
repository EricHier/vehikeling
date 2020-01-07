import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

import { config } from './firebase-api'

try {
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
    firebase.firestore().enablePersistence();
  }
} catch (e) {
  e.print()
}

export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();
export default firebase
