import firebase from 'firebase/app'
import 'firebase/database'

// Get a Firestore instance
export const db = firebase
  .initializeApp({ databaseURL: 'https://umedev-2edfe.firebaseio.com/' })
  .database()
